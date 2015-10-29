(function() {
    document.getElementById("formatButton").addEventListener("click", format, false);
    document.getElementById("selectAllButton").addEventListener("click", selectAll, false);
    function format() {
        var input = document.getElementById("json-input").value;
        try {
            input = JSON.parse(input);
            input = JSON.stringify(input, null, 4);
            document.getElementById("json-input").value = input;
            notify(true);
        } catch (error) {
            notify(false, error);
        }
    }
    function selectAll() {
        document.getElementById("json-input").select();
    	document.execCommand("Copy");
    	notify("msg", "Copied!");
    }
    function notify(status, msg) {
        if (status == "msg") {
    		document.getElementById("notification-area").innerHTML = msg;
    	} else if (status) {
            document.getElementById("notification-area").innerHTML = "JSON formatted and validated!";
            $("#notification-area").fadeTo("fast", 1);
            setTimeout(function () {
                $("#notification-area").fadeTo("slow", 0);
            }, 4500);
        } else if (!status) {
            document.getElementById("notification-area").innerHTML = "<b>" + msg + "</b>";
            $("#notification-area").fadeTo("fast", 1);
            setTimeout(function () {
                $("#notification-area").fadeTo("slow", 0);
                $("#errorOut").fadeTo("slow", 0);
            }, 10000);
        }
    }
})();