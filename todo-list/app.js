function toggleStrikethrough() {
    var checkbox = document.getElementById("checkbox");
    var text = document.getElementById("text");

    if (checkbox.checked) {
        text.classList.add("strikethrough");
    } else {
        text.classList.remove("strikethrough");
    }
}