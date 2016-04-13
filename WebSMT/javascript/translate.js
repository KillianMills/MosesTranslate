function translate()
{
    var srcText = document.getElementById("enSrcText").value;
    var transDir = document.getElementById("transdir").value;

    document.getElementById("trgText").value = "";

    srcText = srcText.trim();

    if (srcText.length == 0)
        return;

    xhr = newHttp();
    if (xhr == null)
    {
        alert("Your browser is not Ajax-compatible, try Firefox");
        return;
    }

    var params = "srcText=" + escape(srcText) + "&transDir=" + transDir;

    document.getElementById("subTrans").disabled = true;
    document.getElementById("wait").style.display = "";

    xhr.open("POST", "DemoWatt/webtranslate.cgi", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-Length", params.length);  

    xhr.onreadystatechange = handleNewText;

    startTime = Date.now();

    xhr.send(params);
}