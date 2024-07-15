async function downloadMedia(data) {
    const status = data.status;
    if (status == 'error') {
        let errorMsg;
        const text = data.text;

        if (text.includes("something went wrong and i couldn't get anything for you. try again, but if issue persists")) {
            errorMsg = "문제가 발생하여 아무것도 가져올 수 없었습니다. 다시 시도해보세요.";
        } else if (text.includes("it seems like this service is not supported yet or your link is invalid. have you pasted the right link")) {
            errorMsg = "이 서비스는 아직 지원되지 않거나, 입력한 링크가 잘못된 것 같아요. 올바른 링크를 입력했는지 확인해주세요.";
        } else if (text.includes("is supported, but something is wrong with your link. maybe you didn't copy it fully")) {
            errorMsg = "지원되는 링크이지만, 링크에 문제가 있는 것 같습니다. 전체를 제대로 복사했는지 확인해주세요.";
        } else if (text.includes("i can't guess what you want to download! please give me a link")) {
            errorMsg = "다운로드하고 싶은 것이 무엇인지 알 수 없어요! 링크를 입력해주세요.";
        } else if (text.includes("if you're reading this, then there's something wrong with the page renderer. please")) {
            errorMsg = "이 메시지를 보고 있다면, 페이지 렌더러에 문제가 있는 것입니다.";
        } else if (text.includes("you're making too many requests. try again in")) {
            errorMsg = "너무 많은 요청을 하고 있습니다. 잠시 후에 다시 시도해주세요!";
        } else if (text.includes("i couldn't find anything about this link. check if it works and try again! some content may be region restricted")) {
            errorMsg = "이 링크에 대해 아무것도 찾을 수 없었습니다. 작동하는지 확인하고 다시 시도해보세요! 일부 콘텐츠는 지역 제한이 있을 수 있습니다.";
        } else if (text.includes("i can't process videos longer than")) {
            errorMsg = "지정된 시간보다 긴 비디오는 처리할 수 없으므로, 더 짧은 비디오를 선택해주세요.";
        } else if (text.includes("something went wrong when i tried getting info about your link. are you sure it works")) {
            errorMsg = "링크에 대한 정보를 가져오려고 할 때 문제가 발생했습니다. 정말로 작동하는지 확인하고 다시 시도해보세요.";
        } else if (text.includes("there's no internet or cobalt api is temporarily unavailable. check your connection and try again")) {
            errorMsg = "인터넷 연결이 없거나 API가 일시적으로 사용 불가능합니다. 연결을 확인하고 다시 시도해보세요.";
        } else if (text.includes("i couldn't connect to the service api. maybe it's down, or cobalt got blocked")) {
            errorMsg = "서비스 API에 연결할 수 없었습니다. 서비스가 다운되었거나 차단되었을 수 있습니다. 다시 시도해보세요.";
        } else if (text.includes("i don't see anything i could download by your link. try a different one")) {
            errorMsg = "해당 링크로 다운로드할 수 있는 것을 찾을 수 없습니다. 다른 링크를 시도해보세요!";
        } else if (text.includes("this is a live video, i am yet to learn how to look into future. wait for the stream to finish and try again")) {
            errorMsg = "현재 라이브 스트리밍 중인 영상입니다. 방송이 끝나고 다시 시도해주세요.";
        } else {
            errorMsg = "알 수 없는 오류가 발생했습니다. 다시 시도해주세요.";
        }
        return {
            status: 'error',
            text: errorMsg,
        };
    } else if (status == 'redirect') {
        window.open(data.url, '_blank');
        return {
            status: 'redirect',
            url: data.url,
        };
    } else if (status == 'stream') {
        // open download url
        const a = document.createElement('a');
        a.href = data.url;
        a.download = data.filename;
        a.click();
        return {
            status: 'stream',
            url: data.url,
        };
    }

}

export default downloadMedia;