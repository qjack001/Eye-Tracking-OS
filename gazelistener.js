var elements = [];
var hasBeenOver = []
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

window.setInterval(isOverListener, 200);