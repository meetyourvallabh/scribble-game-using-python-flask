var canvas;
var ctx;
var strokeStyle = "red";
var lineWidth = 10;
var recordedMouseClickArray = new Array();

var recordPoints = false;

var clickX = new Array();
var clickY = new Array();
var clickDrag = new Array();

window.addEventListener("load", () => {

    canvas = document.querySelector("#canvas");
    ctx = canvas.getContext("2d");


    //resizing
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    //variables
    let painting = false;


    //functions
    function startPosition(e) {
        painting = true;
        recordPoints = true;
        ctx.beginPath();
        draw(e);
    }

    function finishedPainting() {
        painting = false;
        updateMouseClickArray();
        recordPoints = false;

        ctx.beginPath();
    }

    function draw(e) {
        if (!painting) return;
        ctx.lineWidth = lineWidth;
        ctx.lineCap = "round";
        ctx.strokeStyle = strokeStyle;

        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        addClick(e.clientX, e.clientY, true);
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);

    }

    function stopRecording() {
        recordPoints = false;
    }



    function addClick(x, y, dragging) {
        if (recordPoints = true) {
            clickX.push(x);
            clickY.push(y);
            clickDrag.push(dragging);
        }
    }

    function updateMouseClickArray() {
        if (recordPoints) {
            recordedMouseClickArray.push([clickX, clickY, clickDrag]);
            clickX = [];
            clickY = [];
            clickDrag = [];
        }

    }





    //eventlistners
    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('touchstart', startPosition);

    canvas.addEventListener('mouseup', finishedPainting);
    canvas.addEventListener('mouseleave', finishedPainting);
    canvas.addEventListener('mouseleave', stopRecording);
    canvas.addEventListener('touchend', finishedPainting);

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('touchmove', draw);



});

function redraw() {
    //context.clearRect(0, 0, context.canvas.width, context.canvas.height); // Clears the canvas
    ctx.strokeStyle = strokeStyle;
    ctx.lineJoin = "round";
    ctx.lineWidth = lineWidth;

    for (var j = 0; j < recordedMouseClickArray.length; j++) {
        ctx.beginPath();
        xArray = recordedMouseClickArray[j][0];
        yArray = recordedMouseClickArray[j][1];
        dragArray = recordedMouseClickArray[j][2];

        for (var i = 0; i < xArray.length; i++) {
            ctx.beginPath();
            if (dragArray[i] && i) {
                ctx.moveTo(xArray[i - 1], yArray[i - 1]);
            } else {
                ctx.moveTo(xArray[i] - 1, yArray[i]);
            }
            ctx.lineTo(xArray[i], yArray[i]);
            ctx.closePath();
            ctx.stroke();
        }


    }

}

window.addEventListener('resize', () => {


    //Updating
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    redraw();
    //canvas.height = document.documentElement.clientHeight * 0.5;
    //canvas.width = document.documentElement.clientWidth * 0.5;

});
