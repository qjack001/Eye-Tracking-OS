window.onload = function() {
    console.log("hello")
    //start the webgazer tracker
    webgazer.setRegression('ridge') /* currently must set regression and tracker */
        .setTracker('clmtrackr')
        .setGazeListener(function(data, clock) {
             //console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
          //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
        })
        .begin()
        .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

}

var myMap = new Map();
function addToMap(string, func)
{
    myMap.set(string,func);
    console.log(myMap);
}

function horror()
{
    emptyList();
    addElement("top-horror");
    addToMap("top-horror",function(){
        gotoPage('/settings.html?=horror','top');
    });
    addElement("bottom-horror");
    addToMap("bottom-horror",function(){
        gotoPage('/apps.html','bottom');
    });
    addElement("right-horror")
    addToMap("right-horror",function(){
        gotoPage('/scifi.html','right');
    });
    addElement("left-horror")
    addToMap("left-horror",function(){
        gotoPage('/drama.html','left');
    });

    addElement("dracula")
    addToMap('dracula',function(){
        playMovie('/video.html?=horror','dracula');
    });

    addElement("carrie");
    addToMap("carrie",function(){
        playMovie('/video.html?=horror','carrie');
    });

    addElement("lambs");
    addToMap("lambs",function(){
        playMovie('/video.html?=horror','lambs');
    });

    addElement("hereditary");
    addToMap("hereditary",function(){
        playMovie('/video.html?=horror','hereditary');
    });

    addElement("shining");
    addToMap("shining",function(){
        playMovie('/video.html?=horror','shining');
    });

}

function drama()
{
    emptyList();
    addElement("top-drama");
    addToMap("top-drama",function(){
        gotoPage('/settings.html?=drama','top'); 
    });

    addElement("bottom-drama");
    addToMap("bottom-drama",function(){
        gotoPage('/apps.html','bottom');
    });

    addElement("right-drama");
    addToMap("right-drama",function(){
        gotoPage('/horror.html','right');
    });

    addElement("left-drama");
    addToMap("left-drama",function(){
        gotoPage('/scifi.html','left');
    });

    addElement("apocolypse");
    addToMap("apocolypse",function(){
        playMovie('/video.html?=drama','apocolypse');
    });

    addElement("angry");
    addToMap("angry",function(){
        playMovie('/video.html?=drama','angry');
    });

    addElement("vertigo");
    addToMap("vertigo",function(){
        playMovie('/video.html?=drama','vertigo');
    });

    addElement("django");
    addToMap("django",function(){
        playMovie('/video.html?=drama','django');
    }); 

    addElement("leon")
    addToMap("leon",function(){
        playMovie('/video.html?=drama','leon');
    }); 
}

function scifi()
{
    emptyList();
    addElement("top-scifi");
    addToMap("top-scifi",function(){
        gotoPage('/settings.html?=scifi','top');
    });

    addElement("bottom-scifi");
    addToMap("bottom-scifi",function(){
        gotoPage('/apps.html','bottom');
    });

    addElement("right-scifi")
    addToMap("right-scifi",function(){
        gotoPage('/drama.html','right');
    });

    addElement("left-scifi");
    addToMap("left-scifi",function(){
        gotoPage('/horror.html','left');
    });

    addElement("wow");
    addToMap("wow",function(){
        playMovie('/video.html?=scifi','wow');
    });

    addElement("metro");
    addToMap("metro",function(){
        playMovie('/video.html?=scifi','metro');
    });

    addElement("matrix");
    addToMap("matrix",function(){
        playMovie('/video.html?=scifi','matrix');
    }); 

    addElement("island");
    addToMap("island",function(){
        playMovie('/video.html?=scifi','island');
    }); 

    addElement("rpo");
    addToMap("rpo",function(){
        playMovie('/video.html?=scifi','rpo');
    });

}

function settingsload()
{
    emptyList();
    addElement("bottom-settings");
    addToMap("bottom-settings", function(){
        if(window.location.href.indexOf('?=') < 0)
        {
            gotoPage('/drama.html','bottom');
        }
        else
        {
            gotoPage('/' + window.location.href.substring(window.location.href.indexOf('?=') + 2) + '.html','bottom');
        }
    });

    addElement("down-bright");
    addToMap("down-bright", function(){
        decreaseBrightness();
    });

    addElement("up-bright");
    addToMap("up-bright", function(){
        increaseBrightness();
    });

}

function video()
{
    emptyList();

    addElement("top-video");
    addToMap("top-video",function(){
        gotoPage('/settings.html?=video','top');
    });

    addElement("bottom-video");
    addToMap("bottom-video",function(){
        if(window.location.href.indexOf('?=') < 0)
        {
            gotoPage('/drama.html','bottom');
        }
        else
        {
            gotoPage('/' + window.location.href.substring(window.location.href.indexOf('?=') + 2) + '.html','bottom');
        }
    });

    addElement("right-video");
    addToMap("right-video",function(){
        skipForward();
    });

    addElement("left-video");
    addToMap("left-video",function(){
        skipBack();
    });
    addElement("play-icon");
    addToMap("play-icon",function(){
        playPause();
    });
}

function tutorial(){
    emptyList();
    var btn = document.getElementById("eyebutton");
    btn.onclick = function(){
        var mydiv = document.getElementById("eyebutton")   ;
        mydiv.style.backgroundImage = "url('assets/ClickedEyeButton.png')";
        setTimeout(function(){
            mydiv.style.backgroundImage = "url('assets/EyeButton.png')";
        }, 600);
    }

    addElement("eyebutton");
    addToMap("eyebutton",function(){
        var mydiv = document.getElementById("eyebutton")   ;
        mydiv.style.backgroundImage = "url('assets/ClickedEyeButton.png')";
        setTimeout(function(){
            mydiv.style.backgroundImage = "url('assets/EyeButton.png')";
        }, 600);
    });

    addElement("tutorial-top");
    addToMap("tutorial-top", function(){
        gotoPage('/settings.html?=horror');
    })

    addElement("tutorial-bottom");
    addToMap("tutorial-bottom", function(){
        gotoPage('/apps.html', 'bottom');
    })


    

}

document.onkeypress = function(e) {
    if(e.key == ' ')
    {
        let hovered = document.getElementsByClassName("hover")[0];
        func = myMap.get(hovered.id.toString());
        func();
            

        
        
    }
}