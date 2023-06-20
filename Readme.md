## 免费openai key 分享

免费、免科学上网可用于编程的openai接口key如何获取？

###  1. 关注我的微信公众号：code思维
为了避免恶意盗刷，请关注微信公众号【code思维】
回复关键词：`key`  获取授权链接 
 ![](/img/wx.png)


 ![](/img/key.png)


近期已经调整到每天可以请求100次了，一般开发测试使用是够了的，如果不够请加群联系我

### 2. 编程如何使用

请求：

```bash
curl --location 'https://proxy.aidashi.wiki/v1/chat/completions' \
--header 'Authorization: Bearer wx-oDlmE5qAF-NsFKcTs76SdWJLxTEQ_c10448859208af6de3ccd295374c10ed' \
--header 'Content-Type: application/json' \
--data '{
    "messages": [
        {
            "role": "user",
            "content": "你是谁"
        }
    ],
    "temperature": 1,
    "max_tokens": 256,
    "top_p": 1,
    "frequency_penalty": 0,
    "presence_penalty": 0,
    "model": "gpt-3.5-turbo"
}'
```

`Authorization: Bearer`  后面的key就是公众号给的共享key

`api.openai.com` 替换为`proxy.aidashi.wiki` 

响应：

```json
{
    "id": "chatcmpl-7L0hZ1vfVOKEHX3rKTc8Rskq6X2eL",
    "object": "chat.completion",
    "created": 1685241941,
    "model": "gpt-3.5-turbo-0301",
    "usage": {
        "prompt_tokens": 12,
        "completion_tokens": 39,
        "total_tokens": 51
    },
    "choices": [
        {
            "message": {
                "role": "assistant",
                "content": "我是一个AI语言模型，名叫OpenAI GPT-3。我能够自动生成语言，并尽力回答您的问题。"
            },
            "finish_reason": "stop",
            "index": 0
        }
    ]
}
```

可用于任何编程语言

## 3. vs  code 插件 Genie AI
建议阅读我之前写的教程：
借助ChatGPT提高编程效率指南：https://mp.weixin.qq.com/s/DBi6EqrKnDCf5oe1IL5H5A

配置参考：

```json
 {"genieai.openai.apiBaseUrl": "https://proxy.aidashi.wiki",
  "genieai.enableConversationHistory": true,
  "genieai.promptPrefix.addTests": "Implement tests for the following code, 添加中文注释.",
  "genieai.promptPrefix.findProblems": "Find problems with the following code, Add Chinese annotations.",
  "genieai.promptPrefix.optimize": "Optimize the following code to make it more efficient, concise and understandable，Explain in Chinese",
  "genieai.promptPrefix.explain": "Explain the following code,Explain in Chinese.",
  "genieai.promptPrefix.addComments": "Add Chinese annotations to the code, don't explain too much",
  "genieai.promptPrefix.completeCode": "Complete the following code，Add Chinese comments to the code.",
  "genieai.promptPrefix.customPrompt1": "Translate this text into Chinese if it is not Chinese, or translate into English if it is Chinese.",
  "genieai.promptPrefix.customPrompt1-enabled": true
}
```



## 4. 反馈交流

微信交流群：

 ![](/img/q.png)

