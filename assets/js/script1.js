
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
    var timeCol = $("<dir>");
    timeCol.attr("class", "col-1 hour no-padding");
    timeCol.text(hrs[index].format("h:a"));
    $.data(timeCol,"timeStamp",hrs[index]);
    

    var taskCol = $("<dir>");
    taskCol.attr("class","col no-padding");
    

    var actionCol = $("<dir>");
    actionCol.attr("class","col-1 saveBtn no-padding");

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


function checklClock(){
    now = moment().format("h:a");
    // check what time it is and color the tasks accordingĺy
    $(".container").children().each(function(){
        var timeItem = $(this).find("dir .hour");
        



        
    });


};



// main section
buildSchedule(hrs);
checklClock();