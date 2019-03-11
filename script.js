var opacity = 0.1;

function gotoPage(url, dir)
{
    //url = "/Eye-Tracking-OS" + url; //for testing on github
    var client = new XMLHttpRequest();
    client.open('GET', url);
    
    var oldColor = window.getComputedStyle(document.getElementById("border-" + dir), null).getPropertyValue("background-color");
    document.getElementById("border-" + dir).classList.add("transition");
    document.getElementById("content").className = "transition-" + dir;
    
    client.onload = function() 
    {
        var page = client.responseText;
        var content = page.substring(page.indexOf('<div id="content">') + 18, page.indexOf('</div> <!-- end of content -->'));
        var title = page.substring(page.indexOf('<title>') + 7, page.indexOf('</title>'));
        document.body.style.backgroundColor = oldColor;
        
        setTimeout(function () 
        {
            document.getElementById("content").innerHTML = content;
            window.history.pushState({}, title, url);
            document.title = title;
            document.getElementById("content").classList.add("in");
            document.body.style.backgroundColor = "var(--background)";
            
            setTimeout(function () 
            {
                document.getElementById("content").className = " ";
            }, 805);
        }, 550);
    }
    client.send();
}

function getUrlParam(parameter, defaultvalue)
{
    var urlparameter = defaultvalue;
    if(window.location.href.indexOf(parameter) > -1)
    {
        urlparameter = getUrlVars()[parameter];
    }
    return urlparameter;
}

function increaseBrightness()
{
    if(opacity >= 0.1)
    {
        opacity = opacity - 0.1;
        document.getElementById("brightness").style.opacity = opacity;
    }
}

function decreaseBrightness()
{
    if(opacity < 0.7)
    {
        opacity = opacity + 0.1;
        document.getElementById("brightness").style.opacity = opacity;
    }
}

function playPause()
{
    var vid = document.getElementById("video");
    if((vid.currentTime < 0.1) || vid.paused || vid.ended || (vid.readyState < 3))
    {
        vid.play();
    }
    else
    {
        vid.pause();
    }
}