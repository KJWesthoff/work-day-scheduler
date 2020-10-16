
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

// Build rows in the container

function buildSchedule(hrs){
    // clear the schedule
    $("#schedule").empty();


    // loop over times
    for(var i = 0; i < hrs.length; i++){
        
        // row
        var rowItem = $("<div>");
        rowItem.attr("class", "row");
        rowItem.attr("data-index", i);
        console.log(rowItem);    
        //columns
        var timeCol = $("<dir>");
        timeCol.attr("class", "col-1");
        timeCol.text(hrs[i].format("h:a"));

        var taskCol = $("<dir>");
        taskCol.attr("class","col");

        var actionCol = $("<dir>");
        actionCol.attr("class","col-1");

        rowItem = rowItem.append(timeCol);
        rowItem = rowItem.append(taskCol);
        rowItem = rowItem.append(actionCol);
        
        $("#schedule").append(rowItem);
    }

};


// main section
buildSchedule(hrs)