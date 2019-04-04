var elements = [];
var hasBeenOver = []
var hasLeft = new Set();
var counter = 0;
var buffer = 0;
var radius = [0,0];
const predictionTimer = 1;      // Interval of time in ms that the function is run
const numStoredPoints = 7;     // Amount of previous points the program takes into account
var locHistory = [];            // Array that holds previous locations
var index = 0;                  // Index for locHistory
var cx, cy, vx, vy = 0;         // Cursor varaibles (update to class if necessary)
var CursorDrawn = false;


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
        // let x = prediction.x;
        // let y = prediction.y;
        
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
            let left_side = cx - radius[0];
            let right_side = cx + radius[0];
            let bottom_side = cy - radius[1];
            let top_side = cy + radius[1];
             let inside = ((left < left_side && left_side < left + width) || (left < right_side && right_side < left + width)) && ((top < top_side && top_side < top + height) || (top < bottom_side && bottom_side < top + height));
            //let inside = x > left && y > top && y < top+height && x < left + width;
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

// Better Prediction
// Author Alexandre Pana

// Global Variables & Constants



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
    eyeCursor.style.height = "50px";
    eyeCursor.style.width = "50px";
    eyeCursor.style.boxShadow = "inset 0 0 10px 0 rgba(255, 255, 255, 0.8)";
    eyeCursor.style.position = "absolute";
    eyeCursor.style.zIndex = "9999";
    eyeCursor.id = "eyeCursor";
    eyeCursor.style.left = 0;
    eyeCursor.style.top = 0;

    document.body.appendChild(eyeCursor);
    console.log("CURSOR DRAWN!");
}

// Updates the eye cursor's coordinates
//var prevPosition = [0,0];
//var vx, vy = 0;
function updateCursor(point, circleSize)
{
    var minRadius = 100;
    var eyeCursor = document.getElementById("eyeCursor");

    if (!CursorDrawn){          // Adds the cursor Element to the webpage
        drawCursor();
        CursorDrawn = true;
    }

    // Radius Calculations
    radius[0] = 10 * Math.sqrt(circleSize[0]);
    radius[1] = 10 * Math.sqrt(circleSize[1]);

    //console.log("Radius: "+radius);

    if(radius[0] < minRadius){
        radius[0] = minRadius;
    }
    if(radius[1] < minRadius){
        radius[1] = minRadius;
    }

    eyeCursor.style.width = radius[0]+"px";
    eyeCursor.style.height = radius[1]+"px";

    cx = point[0] - radius[0];
    cy = point[1] - radius[1];

    /*
    var w = window.innerWidth;
    var h = window.innerHeight;

    console.log(cy);

    if (cx < 0){
        cx = 0;
    }
    else if (cx + radius[0] > w){
        cx = w
    }
    if (cy < 0){
        cy = 0;
    }
    else if (cy + radius[1] > h){
        cy = h
    }
    */

    eyeCursor.style.left = (cx) + "px";
    eyeCursor.style.top = (cy) + "px";

    
    // Position Calculations
    /*var acc = 10;
    (point[0] > prevPosition[0]) ? (vx += acc): (vx -= acc);         // If looking righter than cursor, increase x vel, else decrease x vel
    (point[1] > prevPosition[1]) ? (vy += acc): (vy -= acc);         // If looking higher than cursor, increase y vel, else decrease y vel


    eyeCursor.style.left = (prevPosition[0] + vx - radius[0]) + "px";
    eyeCursor.style.top = (prevPosition[1] + vy - radius[1]) + "px";
    
    prevPosition = point;*/
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
        //console.log("X "+x+" Y "+y);
        //console.log("Avg coords: "+newCoords);
        //console.log("SD: "+circleSize);

        updateCursor(newCoords, circleSize);                    // Adjust cursor to match new data

        index = (index + 1) % numStoredPoints;      // Increment index (loops back to 0)
    }
}

//window.onload = function() {
//  drawCursor();
//};
window.setInterval(isOverListener, 200);
window.setInterval(betterPrediction, predictionTimer);