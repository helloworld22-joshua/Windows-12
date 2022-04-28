let search = document.getElementById("search-bar"),
            website = document.getElementById("website");

/*website.addEventListener("load", () => {
    search.value = website.src;
})*/

search.addEventListener("keydown", (event) => {
    if (event.keyCode == 13) link();
});

function link() {
    website.src = search.value;
}