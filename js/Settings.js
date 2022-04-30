// Local storage
$(document).ready(() => {
    if (localStorage.getItem("background")) {
        changeBackground(localStorage.getItem("background"));
    }

    if (localStorage.getItem("background2")) {
        changeBackground2(localStorage.getItem("background2"));
    }

    if (localStorage.getItem("color")) {
        changeColor(localStorage.getItem("color"));
    }

    if (localStorage.getItem("border")) {
        changeBorder(localStorage.getItem("border"));
    }

    if (localStorage.getItem("wallpaper")) {
        changeWallpaper(localStorage.getItem("wallpaper"));
    }
});

function resetSettings() {
    localStorage.clear();
}

// Tab
function openTab(x, e) {
    $("#tab-content").children().hide();
    $("#tab").children().removeClass("active");
    $("#" + x).show();
    $(e.target).addClass("active");
}

// Color
const root = {p:window.parent.$(":root"), s:$(":root").siblings(), r:$(":root")};

function changeBackground(x) {
    for (let i in root)
        root[i].css({
            "--background": x + "80",
            "--background-active":  x + "c0"
        });

    localStorage.setItem("background", x);
}

function changeBackground2(x) {
    for (let i in root)
        root[i].css({
            "--background2": x + "80",
            "--background2-active":  x + "c0"
        });

    localStorage.setItem("background2", x);
}

function changeColor(x) {
    for (let i in root)
        root[i].css("--color", x);

    localStorage.setItem("color", x);
}

function changeBorder(x) {
    for (let i in root)
        root[i].css("--border", "1px solid " + x + "2E");

    localStorage.setItem("border", x);
}

// Cursor
normalCursor = 0;
lightCursor = 1;

function setCursor(type) {
    if (type) {
        for (let i in root)
            root[i].css({
                "--cursor-pointer": "url(../media/system/cursor/light/pointer.cur), auto",
                "--cursor-beam": "url(../media/system/cursor/light/beam.cur), auto",
                "--cursor-link": "url(../media/system/cursor/light/link.cur), auto",
                "--cursor-move": "url(../media/system/cursor/light/move.cur), auto"
            });
    } else {
        for (let i in root)
            root[i].css({
                "--cursor-pointer": "url(../media/system/cursor/dark/pointer.cur), auto",
                "--cursor-beam": "url(../media/system/cursor/dark/beam.cur), auto",
                "--cursor-link": "url(../media/system/cursor/dark/link.cur), auto",
                "--cursor-move": "url(../media/system/cursor/dark/move.cur), auto"
            });
    }

    lightCursor = type;
}

function windowsCursor() {
    if (normalCursor) {
        lightCursor ? setCursor(1) : setCursor(0);
        normalCursor = 0;
    } else {
        for (let i in root)
            root[i].css({
                "--cursor-pointer": "auto",
                "--cursor-beam": "auto",
                "--cursor-link": "auto",
                "--cursor-move": "auto"
            });

        normalCursor = 1;
    }
}

function changeCursor() {
    if (lightCursor) {
        lightCursor = 0;

        if (normalCursor) return;

        setCursor(0);
    } else {
        lightCursor = 1;

        if (normalCursor) return;

        setCursor(1);
    }
}

// Wallpaper
home = window.parent.$("#home");

function changeWallpaper(e) {
    home.css("background-image", "url(" + e + ")");
    localStorage.setItem("wallpaper", e);
}

function addImage(e) {
    let url = URL.createObjectURL(e.target.files[0]);
    let name = e.target.files[0].name;

    $("#design .wallpapers").prepend(`<img onclick="changeWallpaper(this.src)" src="${url}" alt="${name}" />`);
    home.css("background-image", "url(" + url + ")");
}