// Tab
function openTab(e, evt) {
    $("#tab-content").children().hide();
    $("#tab").children().removeClass("active");
    $("#" + e).show();
    $(evt.currentTarget).addClass("active");
}

// Color
const root = {p:window.parent.$(":root"), s:$(":root").siblings(), r:$(":root")};

function changeBackground(e) {
    let x = e.target.value;

    for (let i in root)
        root[i].css({
            "--background": x + "80",
            "--background-active":  x + "c0"
        });
}

function changeBackground2(e) {
    let x = e.target.value;

    for (let i in root)
        root[i].css({
            "--background2": x + "80",
            "--background2-active":  x + "c0"
        });
}

function changeColor(e) {
    let x = e.target.value;

    for (let i in root)
        root[i].css("--color", x);
}

function changeBorder(e) {
    let x = e.target.value;

    for (let i in root)
        root[i].css("--border", "1px solid " + x + "2E");
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
let home = window.parent.$("#home");

function changeWall(e) {
    home.css("background-image", "url(" + e + ")");
}

function addImage(e) {
    let url = URL.createObjectURL(e.target.files[0]);
    let name = e.target.files[0].name;

    $("#design .wallpapers").prepend(`<img onclick="changeWall(this.src)" src="${url}" alt="${name}" />`);
    home.css("background-image", "url(" + url + ")");
}

/*// Reset
function resetSettings() {
    changeBackground("fff");
    changeBackground2("fff");
    changeColor("000");
    changeBorder("fff");
    setCursor(1);
}*/