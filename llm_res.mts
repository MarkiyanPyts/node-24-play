const askAQuestion = async (question: string) => {
    const queryObject = {
        model: "gpt-5",
            input: [
                {
                    "role": "developer",
                    "content": [
                        {
                            "type": "input_text",
                            "text": "You are history expert, answer well"
                        }
                    ]
                },
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "input_text",
                            "text": question || ""
                        }
                    ]
                },
            ],
                text: {
            "format": {
                "type": "text"
            },
            "verbosity": "medium"
        },
        reasoning: {
            "effort": "medium",
                "summary": "auto"
        },
        tools: [],
            store: true
    }

    const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(queryObject)
    })

    const result = await response.json();

    const output = result.output;

    return output.map((item) => {
        // console.log(item?.content?.length ? item?.content?.[item?.content.length - 1]?.text : "");
        return item?.content?.length ? item?.content?.[item?.content.length - 1]?.text : ""
    }).join('');
}

export {
    askAQuestion
}