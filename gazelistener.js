var elements = [];
var hasBeenOver = [];
var hasLeft = new Set();
var counter = 0;
var buffer = 20;
function addElement(id){
    elements.push(id);
    
}
console.log(elements);
function isOverListener()
{
    var prediction = webgazer.getCurrentPrediction();
    if (prediction) 
    {
        console.log("hello");
        let x = prediction.x;
        let y = prediction.y;
        console.log("x:"+x);
        console.log("y:"+y);
        hasBeenOver[counter] = null;
        elements.forEach(function(id){
            ele = document.getElementById(id);
            let eleStyle = window.getComputedStyle(ele);
            let widthStr = eleStyle.width.toString();
            console.log(widthStr);
            let width = parseInt(widthStr.substring(0,widthStr.length - 2)) + buffer; 
            let heightStr = eleStyle.height.toString();
            let height = parseInt(heightStr.substring(0,heightStr.length-2)) + buffer;
            let topStr = eleStyle.top.toString();
            let top = parseInt(topStr.substring(0,topStr.length-2)) - buffer;
            let leftStr = eleStyle.left.toString();
            let left = parseInt(leftStr.substring(0,leftStr.length-2)) - buffer;
            console.log("left: "+left+"top:"+top+"height: "+height+"width: "+width);
            let inside = x > left && y > top && y < top+height && x < left + width;
            //console.log(inside);
            
            if(inside)
            {
                if(hasBeenOver.includes(id))
                {
                    ele.classList.add("hover");
                }
                else
                {
                    hasBeenOver[counter] = id;
                }
            }
            else
            {
                if(hasLeft.has(id))
                {
                    hasLeft.delete(id)
                    ele.classList.remove("hover");
                }
                else
                {
                    hasLeft.add(id);
                }
            }
        });
        counter= counter + 1 % 10;      
    }
}


var numStoredPoints = 10;       // Amount of previous points the program takes into account
var locHistory = [];            // Array that hold previous locations
var index = 0;                  // Index for locHistory
var predictionTimer = 200       // Interval of time in ms that the function is run

// Takes array of points and returns the average.
function averagePoints(points)
{
    average = [0,0]
    for (i = 0; i < points.length; i++)
    {
        average[0] += points[i][0];
        average[1] += points[i][1];
    }
    newx = average[0] / points.length;
    newy = average[1] / points.length;
    return [newx, newy];
}

// Draws an indicator showing where the user is looking
function drawCursor()
{
    var eyeCursor = document.createElement("div");
    eyeCursor.style.borderRadius = "100%";
    eyeCursor.height = "50px";
    eyeCursor.width = "50px";
    eyeCursor.border = "solid 2px #fff";
    eyeCursor.position = "absolute";
    eyeCursor.zIndex = "9999";
    eyeCursor.id = "eyeCursor";
    eyeCursor.style.left = 0;
    eyeCursor.style.top = 0;

    document.body.appendChild(eyeCursor);
}

// Updates the eye cursor's coordinates
function updateCursor(points)
{
    document.getElementById("eyeCursor").style.left = (points[0] - 25) + "px";
    document.getElementById("eyeCursor").style.top = (points[1] - 25) + "px";
}

// Provides a better prediction of where the user is looking
function betterPrediction()
{
    var prediction = webgazer.getCurrentPrediction();
    if (prediction) 
    {
        let x = prediction.x;
        let y = prediction.y;
        locHistory[index] = [x,y];                  // Store coordinates in a list
        
        newCoords = averagePoints(locHistory)       // Take the average of all the points

        updateCursor(newCoords);

        index = (index + 1) % numStoredPoints;      // Increment index (loops back to 0)
    }
}

window.onload(drawCursor);
window.setInterval(betterPrediction, predictionTimer);
window.setInterval(isOverListener, 200);