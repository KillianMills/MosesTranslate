var demoTxtChanged = false;

// Ajax stuff

var xhr = null;
var startTime = 0;

function translateText(){
	translate();
}

function translate()
{
	// get source, result and translation menu
    var sourceText = document.getElementById("source").value;
	var resultText = document.getElementById("result").value;
	var translateOption = document.getElementById("translateMenu").value;
	var translateButton = document.getElementById("translateButton").value;

    document.getElementById("result").value = "";
    sorceText = sourceText.trim();
	
	 alert(sourceText);

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

function handleNewText()
{
    if (xhr == null)
        return; // strange

    if (xhr.responseText != null && xhr.responseText.trim() == "ERROR") {
      alert('An error occurred. Sorry.');
      document.getElementById("subTrans").disabled = false;
      //document.getElementById("wait").style.display = "none";
      return;
    }

    moreText = (xhr.readyState == 3 || xhr.readyState == 4) &&
              !(navigator.userAgent && navigator.userAgent.indexOf("MSIE") >= 0);

    if (moreText)
    {
        document.getElementById("resultText").value = xhr.responseText;
    }

    if (xhr.readyState == 4)
    {
        document.getElementById("resultText").value = xhr.responseText;
        document.getElementById("translateButton").disabled = false;
        //document.getElementById("wait").style.display = "none";
        trTime = Date.now() - startTime;
        if (startTime != 0 && trTime > 0) {
           var displayTime = trTime / 1000;
           displayTime = displayTime.toFixed(1);
           document.getElementById("trTime").innerHTML = displayTime + " s";
           startTime = 0;
        }
    } 
}

function newHttp()
{
    if (window.XMLHttpRequest)
    {
        return new XMLHttpRequest();
    }
    else if (window.ActiveXObject)
    {
        return new ActiveXObject("Microsoft.XMLHTTP");
    }
    else
    {
        return null;
    }
}