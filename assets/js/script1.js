
// -------------------------------------
// Init variables, fill lists ----------
// -------------------------------------

// get today
var today = moment()
var todayStr = today.format("dddd, MMMM Do - YYYY [time is] h:ma ");

// print it in the header
$("#currentDay").text(todayStr);

//init task list
var tasks = JSON.parse(localStorage.getItem('WorkdaySchedulerTasks')) || [];

// make an array of moment objects from 6am to 22pm
var startTime = moment().hour(6).minute(0);
var endTime = moment().hour(22).minute(0);

var hrs = [];

while(startTime <= endTime){
    hrs.push(startTime);
    //console.log(startTime.format("h:a"));
    startTime = startTime.clone().add(1, 'hour');
}


// -------------------------------------
// Declare functions -------------------
// -------------------------------------

// ------- Build the scedule ----------
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
// ------- End Build the scedule ----------


// put task text in scedule
var renderTasks = function(tasks){
    // loop over tasks list
    for(task of tasks){
        var timestamp = task.timestamp;
        var text = task.text;

        // find the task row with the right index for timestamp in the dom (done on hours for now)
        for(i = 0; i<hrs.length; i++){

            if(hrs[i].hours() === moment(timestamp).hours()){
                var rowEl = $(".row[data-index ='" + i +"']");
                rowEl.find("textarea").text(text);
            }
        }

        
    }
}

// Save tasks
var saveTasks = function(index){
    
    // get timestamp for the task
   

    // loop over row elements in container
    $("#schedule").children().each(function(){
        var ii = $(this).attr("data-index");
        
        
        if(ii === index){ 

            var text = $(this).find(".col .textArea").val(); 
        
            var taskObj = {
                "text": text,
                "timestamp": hrs[index]
            };
            
            // check if timestamp is allready stored (done on hours for now...)
            existsflag = false;
            for(i = 0; i < tasks.length; i++){
                
                if(moment(tasks[i].timestamp).hours() === hrs[index].hours()){
                    tasks[i] = taskObj;
                    console.log("alredy exisats, overwriting")
                    existsflag = true;
                }
            }

            if(!existsflag){
                tasks.push(taskObj);
                console.log("task does not exist");
            }

            localStorage.setItem('WorkdaySchedulerTasks', JSON.stringify(tasks));
        };
   });
   
}


// check what time it is and color the tasks accordingĺy
function checkClock(){
    now = moment();
    
    // loop over row elements in container
    $("#schedule").children().each(function(){
        // dig out timestamp from array
        var i = $(this).attr("data-index");
        timeItem = hrs[i];
        
        // clear past, present, future, classes and reset
        var textAreaBg = $(this).find(".text-bg");
        textAreaBg.removeClass("past present future");
        
        if(now.hour() === timeItem.hour()){
             textAreaBg.addClass("present");
        } else if(now > timeItem){
            textAreaBg.addClass("past");
        } else if(now < timeItem){
            textAreaBg.addClass("future");
        };         
    });
};




// event handler save
$(".container").on("click"," .saveBtn", function(event){
    rowItem = $(this).closest(".row").attr("data-index")
    //console.log("saved", rowItem);
    saveTasks(rowItem);
});


// ------------
// main section
// ------------

buildSchedule(hrs);
renderTasks(tasks);

// run check clock every 1 min
setInterval(checkClock(),60000)
