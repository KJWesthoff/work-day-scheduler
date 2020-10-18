
// get today
var today = moment()
var todayStr = today.format("dddd, MMMM Do - YYYY [time is] hh:mm ");

// print it in the header
$("#currentDay").text(todayStr);


// make an array of moment objects from 6am to 22pm
var startTime = moment().hour(6).minute(0);
var endTime = moment().hour(22).minute(0);

var hrs = [];

while(startTime <= endTime){
    hrs.push(startTime);
    //console.log(startTime.format("h:a"));
    startTime = startTime.clone().add(1, 'hour');
}

// Function to build row with time placeholder for tasks and a action (save)
function buildScheduleItem(index){
    

    // row
    var rowItem = $("<div>");
    rowItem.attr("class", "row no-padding");
    rowItem.attr("data-index", index);
    //console.log(rowItem);    
    
    //columns
    //time thingy on the left
    var timeCol = $("<dir>");
    timeCol.attr("class", "col-1 hour no-padding");
    timeCol.text(hrs[index].format("h:a"));
    $.data(timeCol,"timeStamp",hrs[index]);
    

    // text area in the middle
    // background
    var taskCol = $("<dir>");
    taskCol.attr("class","col no-padding text-bg");
    
    //foreground
    var textArea = $("<textarea>");
    textArea.attr("class", "textArea");

    taskCol.append(textArea);

    //savebutton
    var actionCol = $("<dir>");
    actionCol.attr("class","col-1 saveBtn no-padding");
    
    var saveIcon = $("<i>");
    saveIcon.addClass("fas fa-save");
    actionCol.append(saveIcon);


    rowItem = rowItem.append(timeCol);
    rowItem = rowItem.append(taskCol);
    rowItem = rowItem.append(actionCol);

    return rowItem;
};



function buildSchedule(hrs){
    // clear the schedule
    $("#schedule").empty();

    // loop over times
    for(var i = 0; i < hrs.length; i++){
        
        row = buildScheduleItem(i);   
        $("#schedule").append(row);
    }
};


function checkClock(){
    now = moment();
    // check what time it is and color the tasks accordingĺy
    // loop over row elements in container
    
    $(".container").children().each(function(){
        // dig out timestamp from array
        var i = $(this).attr("data-index");
        timeItem = hrs[i];
        
        // clear past, present, future, classes and reset
        var textAreaBg = $(this).find(".text-bg");
        textAreaBg.removeClass("past present future");
        
        //console.log(now.format("h:a"),timeItem.format("h:a"));

        if(now.hour() === timeItem.hour()){
             textAreaBg.addClass("present");
        } else if(now > timeItem){
            textAreaBg.addClass("past");
        } else if(now < timeItem){
            textAreaBg.addClass("future");
        };         
    });
};


var saveTasks = function(){
     // loop over row elements in container
    var tasks = [];

    $(".container").children().each(function(){
        var i = $(this).attr("data-index");
        var text = $(this).find(".textarea").text(); 

        var task = {
            "text": text,
            "index": i
        };
        tasks.push(task);
    });

    localStorage.setItem("tasks",tasks);
}


$(".container").on("click",".saveBtn i", function(event){
    console.log(this)
    
    console.log("lll");
    
    
});


// main section
buildSchedule(hrs);

// run check clock every 1 min
setInterval(checkClock(),1000*60*1)

checkClock();