function initRunAjaxRequest(url, dictParams ,functionToCallOnSuccess) {
    var xhr = new XMLHttpRequest();
    var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open("POST", url , true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        console.log('responseText = ' + xhr.responseText.escapeSpecialChars());
        var jsonstring = xhr.responseText;
        jsonstring = jsonstring.escapeSpecialChars();
        var json_result = JSON.parse(jsonstring);
        functionToCallOnSuccess(json_result);
      }
    }
    var param_list = [];

    for(var key in dictParams){
      var value = dictParams[key];
      param_list.push(key + '=' + encodeURIComponent(dictParams[key]));
    }
    if(param_list!=undefined){
        if(param_list.length > 0) {
            var str_param_list = param_list.join('&');
            xhr.send(str_param_list);
        }
    }
    else {
        xhr.send();
    }

}


String.prototype.escapeSpecialChars = function() {
    return this.replace(/[\\]/g, '\\\\')
      .replace(/[\/]/g, '\\/')
      .replace(/[\b]/g, '\\b')
      .replace(/[\f]/g, '\\f')
      .replace(/[\n]/g, '\\n')
      .replace(/[\r]/g, '\\r')
      .replace(/[\t]/g, '\\t');
};
export default initRunAjaxRequest;