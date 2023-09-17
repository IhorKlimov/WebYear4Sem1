let selectedColor = false;

function onHover(element) {
    element.style.backgroundColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    element.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function onOut(element) {
    if (selectedColor) {
        usePickedColor(element);
        return;
    }
    element.style.backgroundColor = "";
    element.style.color = "";
}

function usePickedColor(element) {
    element.style.backgroundColor = document.getElementById("colorpicker").value;
    element.style.color = "black";
    selectedColor = true;
}

function changeDiagonalColor(element) {
    document.getElementById("1").style.backgroundColor = document.getElementById("colorpicker").value;
    document.getElementById("8").style.backgroundColor = document.getElementById("colorpicker").value;
    document.getElementById("15").style.backgroundColor = document.getElementById("colorpicker").value;
    document.getElementById("22").style.backgroundColor = document.getElementById("colorpicker").value;
    document.getElementById("29").style.backgroundColor = document.getElementById("colorpicker").value;
    document.getElementById("36").style.backgroundColor = document.getElementById("colorpicker").value;
    document.getElementById("row2").style.color = "black";
    selectedColor = true;
}