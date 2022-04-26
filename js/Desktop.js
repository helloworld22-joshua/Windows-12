// Boot
doc = $(document);

setTimeout(() => {  // Wait at least 3sec
    doc.ready(() => {   // Wait until document is ready
        let x = $("#boot");
    
        x.css("animation", "fadeOut 1s");
        setTimeout(() => {x.remove()}, 1000);
    });
}, 3000);

checkTaskbar(); // Moves Sidebar up for devices with small width

// Login
function showLogin() {
    let x = $("#login .lock-screen");

    x.css("animation", "fadeOut .5s");  // Hide lock screen, show login
    setTimeout(() => {
        x.hide();

        $("#login .box").css({
            "animation": "fadeIn .5s",
            "display": "flex"
        });
    }, 500);    
}

function hideLogin() {
    let x = $("#login");

    x.css("animation", "fadeOut 1s");
    setTimeout(() => {x.hide()}, 1000);
}

function showPassword(e) {
    let x = $("#" + e);

    x.attr("type") === "password" ? x.attr("type", "text") : x.attr("type", "password");    // Changes type to password or text
}

// Desktop
$(".app input").on("dblclick", (e) => {
    openApp($(e.target).parent().attr("name"), $(e.target).parent().attr("type"));
});

$(".app input").on("touchstart", () => {
    let dragging = 0;

    $(".app input").on("touchmove", () => {
        dragging = 1;
    });

    $(".app input").on("touchend", (e) => {
        if (dragging || deleting) return;
        openApp($(e.target).parent().attr("name"), $(e.target).parent().attr("type"));
    });
});

deskGrid = new Muuri(".desktop-grid", {dragEnabled: true});

deleting = 0;   // For Phones

function deleteApp() {
    deleting = 1;

    $(".app input").css({
        "animation": "wiggle .75s infinite ease-in-out",
        "background-color": "#ff000080"
    });

    $("body").mousedown((e) => {
        let x = $(e.target),
            y;

        if (x.parent().hasClass("app")) {
            y = x.parent().parent().hasClass("desktop-grid") ? deskGrid : startGrid;    // Choose grid
            y.remove(y.getItems(x.parent().index()), {removeElements: true});   // Notlösung; Findet den Array-Index der App
            return;
        }

        $("body").off();

        deleting = 0;

        $(".app input").css({
            "animation": "none",
            "background-color": ""
        });
    });
}

select = $("#desktop .desktop-select");

$("#desktop").mousedown((e) => { 
    if (e.target.id !== "desktop" && e.target.classList[0] !== "desktop-grid") return;

    let pos1 = e.pageX,
        pos2 = e.pageY,
        pos3, pos4;

    select.css({
        "display": "block",
        "top": pos2 + "px",
        "left": pos1 + "px"
    });

    $("#desktop").mousemove((e) => {
        pos3 = e.pageX - pos1;
        pos4 = e.pageY - pos2;

        select.css({
            "width": pos3 + "px",
            "height": pos4 + "px"
        });
    });
});

$("#desktop").mouseup(() => {
    select.css({
        "display": "none",
        "width": "0",
        "height": "0"
    });

    $("#desktop").off("mousemove");
});

// App
function openApp(fileName, fileExtension) {
    if (!fileName || !fileExtension) {
        let errorMessage;

        if (!fileName && !fileExtension) {
            errorMessage = "kein Dateiname und keine Dateiendung";
        } else if (!fileName) {
            errorMessage = "kein Dateiname";
        } else {
            errorMessage = "keine Dateiendung";
        }

        annotationOk("Programm konnte nicht geöffnet werden, da " + errorMessage + " vorhanden ist.");
        return;
    }

    switch (fileExtension) {
        case "exe":
            openExe(fileName);
            break;
        case "jpg":
            openJpg(fileName);
            break;
        default:
            annotationOk('Programm konnte nicht geöffnet werden, da die Dateiendung nicht bekannt ist.');
    }
}

function openExe(e) {
    let x = `<div class="${e} draggable">
                <input type="button" value="✕" onclick="closeApp(event)" />
                <input type="button" value="▢" onclick="fullscreenApp(event)" />
                <input type="button" value="−" onclick="minimizeApp(event)" />
                <iframe src="${e}.html" title="${e}" frameborder="0"></iframe>
             </div>`,
        y = `<input class="§${e}" type="image" src="../media/apps/${e}.webp" onclick="minimizeApp(event)" alt="${e}" draggable="false" />`;

    $("#window").append(x);
    $("#taskbar").append(y);

    $("#" + e).css("animation", "fadeIn .5s");
    $("#§" + e).css("animation", "moveUp .5s");

    checkTaskbar();
}

function openJpg(e) {
    let x = `<div class="${e} draggable">
                <input type="button" value="✕" onclick="closeApp(event)" />
                <input type="button" value="▢" onclick="fullscreenApp(event)" />
                <input type="button" value="−" onclick="minimizeApp(event)" />
                <img src="../media/user/${e}.jpg" alt="Image" />
             </div>`,
        y = `<input class="§${e}" type="image" src="../media/user/${e}.jpg" onclick="minimizeApp(event)" alt="${e}" draggable="false" />`;

    $("#window").append(x);
    $("#taskbar").append(y);

    $("." + e).css("animation", "fadeIn .5s");
    $(".§" + e).css("animation", "moveUp .5s");

    checkTaskbar();
}

function closeApp(e) {
    let x = $(e.target).parent(),
        y = $(".§" + x[0].classList[0]);

    x.hide("fast", () => {x.remove()});
    y.css("animation", "moveDown .25s");
    setTimeout(() => {y.remove()}, 250);

    checkTaskbar();
}

function fullscreenApp(e) {
    let x = $(e.target).parent();

    x.css("position") == "static" ?   // Changes CSS when fullscreen
        x.css({
            "position": "absolute",
            "width": "700px",
            "height": "500px",
            "border-radius": "var(--border-radius)"
        }).children().eq(1).attr("value", "▢")
    :
        x.css({
            "position": "static",
            "width": "100%",
            "height": "100%",
            "border-radius": "0"
        }).children().eq(1).attr("value", "⧉");
}

function minimizeApp(e) {
    let x = $(e.target).parent(),
        y = $(e.target).attr("class");

    if (x.attr("id") == "taskbar") {
        x = $("." + y.substring(1, y.Length));
    }

    x.css("display") == "none" ? x.show("fast") : x.hide("fast");
}

// Start
function showStart() {
    let x = $("#start");

    x.css("bottom") != "60px" ?
        x.css("bottom", "60px")
    :
        x.css("bottom", "calc(min(680px, calc(100% - 120px)) * -1.01)");
}

function showHint(str) {
    let x = $("#start .search-suggest"),
        y = $("#start .search-bar");

    if (!str.length) {
        x.empty();
        y.css("border-radius", "var(--border-radius)")
    } else {
        x.append("<p>" + str + "</p>");   // Noch nicht fertig
        y.css("border-radius", "var(--border-radius) var(--border-radius) 0 0")
    }
}

startGrid = new Muuri(".start-grid", {dragEnabled: true});

dropUpCon = $(".drop-up-content");

function showDropup() {
    dropUpCon.css("display") == "none" ? dropUpCon.show() : dropUpCon.hide();
}

window.onclick = (e) => {
    if (!e.target.matches(".drop-up-button"))   // If anything except this button is pressed
        dropUpCon.hide();
}

function restartPC() {
    location.reload();
}

function shutdownPC() {
    window.close();
}

function lockPC() {
    $("#login .box").hide();
    $("#login .lock-screen").show();
    $("#login").show().css("animation", "fadeIn .5s");
}

// Taskbar
function checkTaskbar() {
    let x = $("#sidebar");

    doc.width() < ($("#taskbar").children().length * 50) + 10 + (x.width() * 2) ?   // Calculates lenght of apps on taskbar
        x.css({ // Move sidebar up if true
            "bottom": "60px",
            "right": "5px",
            "background": "var(--background)",
            "backdrop-filter": "var(--backdrop-filter)",
            "border": "var(--border)",
            "box-shadow": "var(--box-shadow)",
        })
    :
        x.css({
            "bottom": "0",
            "right": "0",
            "background": "none",
            "backdrop-filter": "unset",
            "border": "none",
            "box-shadow": "none",
        });
}

window.onresize = () => {
    checkTaskbar();
};

function fullscreenWindow() {
    let x = document,
        y = document.documentElement;

    x.fullscreenElement ?
        x.exitFullscreen ? x.exitFullscreen() : x.webkitExitFullscreen()
    :
        y.requestFullscreen ? y.requestFullscreen() : y.webkitRequestFullscreen();
}

$(document).on("fullscreenchange", () => {
    let x = $("#sidebar .fullscreen img");

    document.fullscreenElement ?
        x.attr("src", "../media/system/fullscreenOff.webp")
    :
        x.attr("src", "../media/system/fullscreenOn.webp");
});

function siteOnline(online) {
    let conSid = $("#sidebar .connection img"),
        conLog = $("#login .connection img");

    if (online) {
        conLog.attr("src", "../media/system/online.webp");
        conSid.attr("src", "../media/system/online.webp");
    } else {
        conLog.attr("src", "../media/system/offline.webp");
        conSid.attr("src", "../media/system/offline.webp");
    }
}

$(window).on("load", () => {
    siteOnline(navigator.onLine);   // Check if connected
});

$(window).on("online", () => {
    siteOnline(1);
});

$(window).on("offline", () => {
    siteOnline(0);
});

function tellTime() {
    let x = new Date(); // Current date
    const weekdays = ["Sunday",  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          months = ["Dezember",  "Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November"];

    let time = x.getHours() + ":" + (x.getMinutes() < 10 ? "0" + x.getMinutes() : x.getMinutes()),
        date = (x.getDate() < 10 ? "0" + x.getDate() : x.getDate()) + "." + (x.getMonth() < 10 ? "0" + (x.getMonth() + 1) : x.getMonth() + 1) + "." + x.getFullYear(),
        weekday = weekdays[x.getDay()], // Position of array is day
        month = months[x.getMonth()];

    $("#login .clock h1").html(time);
    $("#login .clock h4").html(weekday + ", " + x.getDate() + ". " + month);
    $("#sidebar .clock label").html(time + "<br />" + date);
    setTimeout(tellTime, 60000);    // Refresh every minute
}

function minimizeAll() {
    let x = $("#window");

    x.children(":visible").length ? x.children().hide("fast") : x.children().show("fast");  // If anything is visible, hide all
}

// Annotation
anno = $("#annotation");
annoBtn = $("#annotation .box .button");
annoTxt = $("#annotation .box .text");

function annotation(e) {
    annoTxt.append("<p>" + e + "</p>");
    anno.css("display", "flex").css("animation", "fadeIn .5s");
}

function annotationOk(text) {
    annoBtn.append(`<input type="button" onclick="annotationCancel()" value="Ok" />`);
    annotation(text);
}

function annotationYesNo(text, action) {
    annoBtn.append(`<input type="button" onclick="annoDo(${action})" value="Fortfahren"><input type="button" onclick="annotationCancel()" value="Abbrechen" />`);
    annotation(text);
}

function annotationYesHelpNo(text, action, action1) {
    annoBtn.append(`<input type="button" onclick="annoDo(${action})" value="Fortfahren"><input type="button" onclick="annoDo(${action1})" value="Hilfe"><input type="button" onclick="annotationCancel()" value="Abbrechen" />`);
    annotation(text);
}

function annoDo(e) {
    anno.css("animation", "fadeOut .5s");
    setTimeout(() => {
        anno.hide();
        annoTxt.empty();
        annoBtn.empty();
    }, 500);
    e;  // Execute function "e"
}

function annotationCancel() {
    anno.css("animation", "fadeOut .5s");
    setTimeout(() => {
        anno.hide();
        annoTxt.empty();
        annoBtn.empty();
    }, 500);
}

// General
(function (document) {
    "use strict";
    
    var draggable = $(".draggable"),
        draggableCount = draggable.length,
        i;

    function startDrag(evt) {
        
        evt.preventDefault();

        var diffX = evt.clientX - this.offsetLeft,
            diffY = evt.clientY - this.offsetTop,
            that = this;

        function moveAlong(evt) {
            that.style.left = (evt.clientX - diffX) + "px";
            that.style.top = (evt.clientY - diffY) + "px";
        }

        function stopDrag() {
            doc.off("mousemove", moveAlong);
            doc.off("mouseup", stopDrag);
        }
        
        doc.on("mouseup", stopDrag);
        doc.on("mousemove", moveAlong);
    }

    for (i = 0; i < draggableCount; i += 1) {
        draggable[i].addEventListener("mousedown", startDrag);
    }
}(document));