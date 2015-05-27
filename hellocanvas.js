var CNVS = $("#mcanvas");
var FACTOR = 4; /*pembagi*/
var fCanvas = new fabric.Canvas("mcanvas");

var img_ss = null;
var img_frame = null;

$(".save").click(function(){
    var file = new Blob([$('.jsteks').text()],{type:'text/plain'});
    var loc = URL.createObjectURL(file);
    var a = document.createElement('a');
    document.body.appendChild(a);
    a.href = loc;
    a.download = "prop.plk";
    a.click();
});


function handleFRAME(evt) {
    var mfile = evt.target.files[0];

    var reader = new FileReader();
    reader.onload = function (event) {

        var iPic = new Image();
        iPic.src = event.target.result;


        iPic.onload = function () {
            if (img_frame != null) {
                fCanvas.remove(img_frame);
            }


            img_frame = new fabric.Image(iPic);


            img_frame.setWidth(img_frame.getWidth() / FACTOR);
            img_frame.setHeight(img_frame.getHeight() / FACTOR);

            img_frame.set('hasControls', false);
            fCanvas.add(img_frame);
        };
    };
    reader.readAsDataURL(mfile);

}

/*

hendel SS
*/
function handleSS(evt) {
    var mfile = evt.target.files[0];

    var reader = new FileReader();
    reader.onload = function (event) {

        var iPic = new Image();
        iPic.src = event.target.result;

        iPic.onload = function () {
            if (img_ss != null) {
                fCanvas.remove(img_ss);
            }

            img_ss = new fabric.Image(iPic);
            ss_x = img_ss.getWidth();
            ss_y = img_ss.getHeight();
            updateJSON();
            img_ss.setWidth(img_ss.getWidth() / FACTOR);
            img_ss.setHeight(img_ss.getHeight() / FACTOR);

            img_ss.set('hasControls', false);
            fCanvas.add(img_ss);
        };
    };
    reader.readAsDataURL(mfile);

}

var ssframe = "Redmi 1S";
var ss_x = 720;
var ss_y = 1280;
var background = 1024;
var overlay = overlay;
var frame = "null";
var frame_x = 100;
var frame_y = 100;
var bg_width = 1100;
var bg_height = 200;
var overlay_img = "null";
var overlay_x = 0;
var overlay_y = 0;
var pos_ss_x = 395;
var pos_ss_y = 359;

function getOverlay() {
    var overlay = [];
    overlay.push({
        "overlay_img": "null",
        "overlay_x": 0,
        "overlay_y": 0
    });
    return overlay;
}

function updateJSON() {

    var ssframedata = {
        "pos_ss_x": pos_ss_x,
        "pos_ss_y": pos_ss_y,
        "frame": frame,
        "frame_x": frame_x,
        "frame_y": frame_y,
        "overlay": getOverlay(),
        "background": background,
        "bg_width": bg_width,
        "bg_height": bg_height
    };
    var data = {
        "ssframe": ssframe,
        "ss_x": ss_x,
        "ss_y": ss_y,
        "ssframedata": ssframedata
    };
    var txt = JSON.stringify(data, null, '\t');
    $('.jsteks').text(txt);
}

function updateData() {
    if (img_ss != null) {
        var px = img_ss.getLeft();
        var py = img_ss.getTop();
        $('.posx').text(px);
        $('.posy').text(py);
        pos_ss_x = px * FACTOR;
        pos_ss_y = py * FACTOR;
    }
    
    if(img_frame!=null){
    
        var px_frame = img_frame.getLeft();
        var py_frame = img_frame.getTop();
        frame_x = px_frame*FACTOR;
        frame_y = py_frame*FACTOR;
    }
    updateJSON();

}

fCanvas.on({
    'object:moving': updateData

});


function initScale() {
    bg_width = $(".canvw").val();
    bg_height = $(".canvh").val();
    fCanvas.setWidth($(".canvw").val() / FACTOR);
    fCanvas.setHeight($(".canvh").val() / FACTOR);
    fCanvas.calcOffset();
    updateJSON();
}

initScale();

$(".canvw").change(function () {
    var value = $(this).val();
    fCanvas.setWidth(value / FACTOR);
    fCanvas.calcOffset();
    bg_width = value;
    updateJSON();

});
$(".canvh").change(function () {
    var value = $(this).val();
    fCanvas.setHeight(value / FACTOR);
    fCanvas.calcOffset();
    bg_height = value;
    updateJSON();

});

$("#img_ss").change(function (event) {
    var mfile = event.target.files[0];
    frame = mfile.name;
    updateJSON();
    handleFRAME(event);
    
});

$("#img_frame").change(function (e) {
    handleSS(e);
});