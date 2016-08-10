function setIframeHeight(iframe) {console.log(1)
    if (iframe) {
        var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
        if (iframeWin.document.body) {
            iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
        }
    }
};
function getIframe(){
  return document.getElementById('mainFrame');
}

window.onload = function () {
    setIframeHeight(document.getElementById('mainFrame'));
};

