var opacity = 0.1;
var caliShow = false;

document.addEventListener('keydown', function(event) 
{
    if(event.keyCode == 67) 
    {
        toggleCalibrator();
    }
});

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
    var icon = document.getElementById("play-icon");
    if((vid.currentTime < 0.1) || vid.paused || vid.ended || (vid.readyState < 3))
    {
        vid.play();
        icon.className = "";
        
    }
    else
    {
        vid.pause();
        icon.className = "show";
    }
}

function skipForward() 
{
    var vid = document.getElementById("video");
    vid.currentTime += 5;
} 

function skipBack() 
{
    var vid = document.getElementById("video");
    vid.currentTime -= 7;
} 

function playMovie(url, film)
{
    url = "/Eye-Tracking-OS" + url; //for testing on github
    var client = new XMLHttpRequest();
    client.open('GET', url);
    
    document.getElementById(film).style = "top: -50px; left: -50px; overflow: visible; transition: all 1s ease; z-index: 2000;";
    document.getElementById(film + "-img").style = "filter: brightness(0%); width: 100vw; height: 100vh; top: 0; left: 0; transition: width 1s ease, height 0.5s ease";
    
    client.onload = function() 
    {
        var page = client.responseText;
        var content = page.substring(page.indexOf('<div id="content">') + 18, page.indexOf('</div> <!-- end of content -->'));
        var title = page.substring(page.indexOf('<title>') + 7, page.indexOf('</title>'));
        
        setTimeout(function () 
        {
            document.getElementById("content").innerHTML = content;
            window.history.pushState({}, title, url);
            document.title = title;
        }, 1000);
    }
    client.send();
}

function toggleCalibrator()
{
    if(caliShow)
    {
        document.getElementById("calibrator").className = " ";
        document.getElementById("webgazerVideoFeed").className = " ";
        document.getElementById("webgazerFaceOverlay").className = " ";
        document.getElementById("webgazerFaceFeedbackBox").className = " ";
        webgazer.removeMouseEventListeners()
        caliShow = false;
    }
    else
    {
        document.getElementById("calibrator").className = "show";
        document.getElementById("webgazerVideoFeed").className = "show";
        document.getElementById("webgazerFaceOverlay").className = "show";
        document.getElementById("webgazerFaceFeedbackBox").className = "show";
        webgazer.addMouseEventListeners
        caliShow = true;
    }
}