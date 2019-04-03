var elements = [];
var hasBeenOver = []
var hasLeft = new Set();
var counter = 0;
var buffer = 20;
function emptyList(){
    elements.length = 0;
}
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
        //console.log("x:"+x);
        //console.log("y:"+y);
        hasBeenOver[counter] = null;
        elements.forEach(function(id){
            ele = document.getElementById(id);
            let eleStyle = window.getComputedStyle(ele);
            let widthStr = eleStyle.width.toString();
            //console.log(widthStr);
            let width = parseInt(widthStr.substring(0,widthStr.length - 2)) + buffer; 
            let heightStr = eleStyle.height.toString();
            let height = parseInt(heightStr.substring(0,heightStr.length-2)) + buffer;
            let topStr = eleStyle.top.toString();
            let top = parseInt(topStr.substring(0,topStr.length-2)) - buffer;
            let leftStr = eleStyle.left.toString();
            let left = parseInt(leftStr.substring(0,leftStr.length-2)) - buffer;
            //console.log("left: "+left+"top:"+top+"height: "+height+"width: "+width);
            let inside = x > left && y > top && y < top+height && x < left + width;
            //console.log(inside);
            
            if(inside)
            {
                if(hasBeenOver.includes(id))
                {
                    ele.classList.add("hover");
                    console.log("yeet");
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

// Global Variables & Constants
const predictionTimer = 200;    // Interval of time in ms that the function is run
const numStoredPoints = 10;     // Amount of previous points the program takes into account
var locHistory = [];            // Array that holds previous locations
var index = 0;                  // Index for locHistory
var cx, cy, vx, vy = 0;         // Cursor varaibles (update to class if necessary)
var CursorDrawn = false;

// Takes array of points and returns the average.
function averagePoints(points)
{
    average = [0,0];
    for (i = 0; i < points.length; i++)
    {
        average[0] += points[i][0];
        average[1] += points[i][1];
    }
    newx = average[0] / points.length;
    newy = average[1] / points.length;
    return [newx, newy];
}

// Takes array of points, their average, and returns the standard deviation of X and Y.
function standardDeviation(points, avg)
{
    temp = [0,0];

    for (i = 0; i < points.length; i++)
    {
        temp[0] += (points[i][0] - avg[0]) ** 2;
        temp[1] += (points[i][1] - avg[1]) ** 2;
    }

    sX = Math.sqrt(temp[0] / points.length);
    sY = Math.sqrt(temp[1] / points.length);

    return [sX, sY];
}

// Draws an indicator showing where the user is looking
function drawCursor()
{
    var eyeCursor = document.createElement("div");
    eyeCursor.style.borderRadius = "100%";
    eyeCursor.height = "50px";
    eyeCursor.width = "50px";
    eyeCursor.border = "solid 10px #fff";
    eyeCursor.position = "absolute";
    eyeCursor.zIndex = "9999";
    eyeCursor.id = "eyeCursor";
    eyeCursor.style.left = 0;
    eyeCursor.style.top = 0;

    //eyeCursor.setAttribute("cx", 0);
    //eyeCursor.setAttribute("cy", 0);

    document.body.appendChild(eyeCursor);
    console.log("CURSOR DRAWN!");
}

// Updates the eye cursor's coordinates
function updateCursor(points)
{
    if (!CursorDrawn){          // Adds the cursor Element to the webpage
        drawCursor();
        CursorDrawn = true;
    }

    var acc = 50;               // Acceleration of the cursor
    var maxVel = 500;           // Max speed at which the cursor can move
    //vy = (points[0] - cy);
    //vx = (points[1] - cx);

    (points[0] > cy) ? (vy += 10): (vy -= acc);      // If looking higher than cursor, increase y vel, else decrease y vel
    (points[1] > cx) ? (vx += 10): (vx -= acc);      // If looking righter than cursor, increase x vel, else decrease x vel

    if (vy > maxVel) vy = maxVel;
    if (vx > maxVel) vx = maxVel;

    cy += vy;
    cx += vx;

    //document.getElementById("eyeCursor").style.left = (cy - 25) + "px";
    //document.getElementById("eyeCursor").style.top = (cx - 25) + "px";

    var eyeCursor = document.getElementById("eyeCursor");

    eyeCursor.style.top = (points[0] - 25) + "px";
    eyeCursor.style.left = (points[1] - 25) + "px";
    
    //eyeCursor.setAttribute();
}

// Provide a better prediction of where the user is looking & draw cursor
function betterPrediction()
{
    var prediction = webgazer.getCurrentPrediction();
    if (prediction) 
    {
        let x = prediction.x;                       // Webgazer x prediction
        let y = prediction.y;                       // Webgazer y prediction
        locHistory[index] = [x,y];                  // Store coordinates in a list
        
        newCoords = averagePoints(locHistory)       // Take the average of all the points
        

        circleSize = standardDeviation(locHistory, newCoords);      // Find standard deviation of points and adjust cursor size to fit
        console.log("X "+x+" Y "+y);
        console.log("Avg coords: "+newCoords);
        console.log("SD: "+circleSize);

        updateCursor(newCoords);                    // Adjust cursor to match new data

        index = (index + 1) % numStoredPoints;      // Increment index (loops back to 0)
    }
}

//window.onload = function() {
//  drawCursor();
//};
window.setInterval(isOverListener, 200);
window.setInterval(betterPrediction, 200);