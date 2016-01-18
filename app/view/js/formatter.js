(function() {
    document.getElementById("formatButton").addEventListener("click", format, false);
    document.getElementById("selectAllButton").addEventListener("click", selectAll, false);
    document.getElementById("sidebar-title").addEventListener("click", toggleSidebar, false);
    document.getElementById("gh-link").addEventListener("click", function() {
        window.open("https://github.com/jackdalton/json-formatter");
    }, false);
    document.getElementById("author-link").addEventListener("click", function() {
        window.open("https://github.com/jackdalton");
    }, false);
    var tabWidth;
    $(document).ready(function() {
        chrome.storage.sync.get({
            textWrap: "soft",
            tabWidth: "4"
        }, function(data) {
            $("#opt-text-wrap").val(data.textWrap);
            document.getElementById("json-input").wrap = data.textWrap;
            $("#opt-tab-width").val(data.tabWidth);
            tabWidth = cleanTabVar(data.tabWidth);
        });
    });
    $("#opt-text-wrap").change(function() {
        var val = $("#opt-text-wrap").val();
        chrome.storage.sync.set({
            textWrap: val
        }, function() {
            notify("msg", "Option saved!");
            document.getElementById("json-input").wrap = data.textWrap;
        });
    });
    $("#opt-tab-width").change(function() {
        var val = $("#opt-tab-width").val();
        chrome.storage.sync.set({
            tabWidth: val
        }, function() {
            notify("msg", "Option saved!");
            tabWidth = cleanTabVar(val);
        });
    });
    var sidebar_hidden = true;
    function toggleSidebar() {
        sidebar_hidden = !sidebar_hidden;
        if (sidebar_hidden) {
            $("#sidebar").animate({
                left: "-150px"
            }, 250);
        } else {
            $("#sidebar").animate({
                left: 0
            }, 250);
        }
    }
    function format() {
        var input = document.getElementById("json-input").value;
        try {
            input = JSON.parse(input);
            tabWidth = tabWidth || 4;
            input = JSON.stringify(input, null, tabWidth);
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
            $("#notification-area").fadeTo("fast", 1);
            document.getElementById("notification-area").innerHTML = msg;
            setTimeout(function () {
                $("#notification-area").fadeTo("slow", 0);
            }, 4500);
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
    function cleanTabVar(tv) {
        return tv == "2" || tv == "4" ? Number(tv) : tv == "tabchar" ? "\t" : tv;
    }
})();
