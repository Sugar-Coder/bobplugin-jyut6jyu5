function supportLanguages() {
    return ['auto', 'zh-Hans', 'zh-Hant', 'en'];
}

function buildResult(data) {
    return {
        from: 'zh-Hans',
        to: 'en',
        toParagraphs: [data],
    };
}

function translate(query, completion) {
    let text = query.text;

    $http.request({
        method: "POST",
        url: "https://www.iamwawa.cn/home/yuepin/ajax",
        header: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: {
            text: text,
            type: 0,
            tone_type: 1,
            letter_blank: 1,
            letter_type: 0,
            surname_priority: 0
        },
        handler: function (resp) {
            // $log.info(resp.data);
            // Bob 1.8.0+
            if (resp.data.status !== 1) {
                query.onCompletion({'error': { type: 'serverError', message: resp.data.info, addition: JSON.stringify(resp) }});
            } else {
                query.onCompletion({'result': buildResult(resp.data.data)});
            }
        }
    });   
}
