function translate()
{
	// get source, result and translation menu
    var sourceText = document.getElementById("source").value;
	var resultText = document.getElementById("result").value;
	var translateOption = document.getElementById("translateMenu").value;
	var translateButton = document.getElementById("translateButton").value;

    document.getElementById("result").value = "";
    sorceText = sourceText.trim();

    if (sorceText.length == 0){
        return;
	}
	
    xhr = newHttp();
    if (xhr == null)
    {
        alert("Your browser is not Ajax-compatible, try Firefox");
        return;
    }

    var params = "sorceText=" + escape(sourceText) + "&translateMenu=" + translateMenu;

    document.getElementById("translateButton").disabled = true;
    //document.getElementById("wait").style.display = "";

    xhr.open("POST", "DemoWatt/webtranslate.cgi", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-Length", params.length);  

    xhr.onreadystatechange = handleNewText;

    startTime = Date.now();

    xhr.send(params);
}