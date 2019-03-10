function gotoPage(url, dir)
{
    url = "/Eye-Tracking-OS" + url; //for testing on github
    var client = new XMLHttpRequest();
    client.open('GET', url);
    
    document.getElementById("border-" + dir).classList.add("transition");
    document.getElementById("content").className = "transition-" + dir;
    
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
            document.getElementById("content").classList.add("in");
            
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