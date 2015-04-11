document.getElementById("formatButton").addEventListener("click", format, false);
document.getElementById("selectAllButton").addEventListener("click", selectAll, false);
function format() {
    var input = document.getElementById("json-input").value;
    try {
        input = JSON.parse(input);
        input = JSON.stringify(input, null, 4);
        document.getElementById("json-input").value = input;
        notifyCompletion("done");
    } catch (error) {
        notifyCompletion("failed");
        document.getElementById("errorOut").innerHTML = error;
    }
}
function selectAll() {
    document.getElementById("json-input").select();
}
function notifyCompletion(status) {
    if (status == "done") {
        document.getElementById("notification-area").innerHTML = "JSON formatted! <b>Your JSON is perfectly valid.</b>";
        $("#notification-area").fadeTo("fast", 1);
        setTimeout(function () {
            $("#notification-area").fadeTo("slow", 0);
        }, 4500);
    } else if (status == "failed") {
        document.getElementById("notification-area").innerHTML = "Something went wrong, see below for details. <b>Your JSON is invalid.</b>";
        $("#notification-area").fadeTo("fast", 1);
        setTimeout(function () {
            $("#notification-area").fadeTo("slow", 0);
            $("#errorOut").fadeTo("slow", 0);
        }, 10000);
    }
}
