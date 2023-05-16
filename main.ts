import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { json } from "https://deno.land/x/sift@0.6.0/mod.ts";
// 引入AWS DynamoDB和OpenAI API的依赖库
import { DynamoDB } from "https://aws-api.deno.dev/v0.3/services/dynamodb.ts";
import { ApiFactory } from "https://deno.land/x/aws_api@v0.7.0/client/mod.ts";

// 通过提供区域信息创建DynamoDB客户端实例。
const client = new ApiFactory().makeNew(DynamoDB);

// 定义OpenAI API的主机名
const OPENAI_API_HOST = "api.openai.com";

// 创建HTTP服务器并处理请求
serve(async (request) => {
  const url = new URL(request.url);

  // 如果请求路径是根路径，则返回Readme.md文件
  if (url.pathname === "/") {
    return fetch(new URL("./Readme.md", import.meta.url));
  }

  // 从请求头中获取Authorization字段，并解析出token
  const auth = request.headers.get("Authorization") as string;
  if(auth === null) return json({message: "no auth"}, {status: 403});
  const token = auth.split(" ")[1];

  // 如果token以"wx-"开头，则表示这是一个用户请求
  if (token.startsWith("wx-")) {
    const parts = token.split("_");

    // 在DynamoDB中查找该用户
    const { Item } = await client.getItem({
      TableName: "chat",
      Key: {
        username: { S: parts[0] },
      },
    });

    // 如果找不到该用户，则返回404状态码和错误消息
    if (!Item) {
      return json(
        {
          message: "couldn't find the user: " + parts[0],
        },
        { status: 404 },
      );
    }

    // 如果用户密钥不正确，则返回403状态码和错误消息
    if (Item.key.S != parts[1]) {
      return json(
        {
          message: "wrong key",
        },
        { status: 403 },
      );
    }

    // 如果密钥已过期，则返回403状态码和错误消息
    if (new Date(Item.expired.S).getTime() < new Date().getTime()) {
      return json(
        {
          message: "key expired",
        },
        { status: 403 },
      );
    }

    // 检查请求次数是否超限，如果超限，则返回403状态码和错误消息
    if (parseInt(Item.req_times.N) > 100) {
      return json(
        {
          message: "req_times exceeded",
        },
        { status: 403 },
      );
    }

    // 设置OpenAI API的身份验证令牌
    request.headers.set(
      "Authorization",
      "Bearer " + Deno.env.get("OPENAI_API_KEY"),
    );

    // 更新用户的请求次数
    await client.updateItem({
      TableName: "ai_chat",
      Key: {
        username: { S: parts[0] },
      },
      UpdateExpression: "set req_times = :e",
      ExpressionAttributeValues: {
        ":e": { N: (parseInt(Item.req_times.N) + 1).toString() },
      },
    });
  }

  // 将主机名设置为OpenAI API的主机名，并将请求转发给OpenAI API
  url.host = OPENAI_API_HOST;
  return await fetch(url, request);
});
