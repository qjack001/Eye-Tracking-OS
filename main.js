// window.onload = function() {
//     console.log("hello")
//     //start the webgazer tracker
//     webgazer.setRegression('ridge') /* currently must set regression and tracker */
//         .setTracker('clmtrackr')
//         .setGazeListener(function(data, clock) {
//              //console.log(data); /* data is an object containing an x and y key which are the x and y prediction coordinates (no bounds limiting) */
//           //   console.log(clock); /* elapsed time in milliseconds since webgazer.begin() was called */
//         })
//         .begin()
//         .showPredictionPoints(true); /* shows a square every 100 milliseconds where current prediction is */

// }

var myMap = new Map();
function addToMap(string, func)
{
    myMap.set(string,func);
}

document.onkeypress = function(e) {
    if(e.key == ' ')
    {
        let hovered = document.getElementsByClassName("hover")[0];
        func = myMap.get(hovered.id.toString());
        func();
            

        
        
    }
}