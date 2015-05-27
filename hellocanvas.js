var CNVS = $("#mcanvas");
var FACTOR = 5; /*pembagi*/
var fCanvas = new fabric.Canvas("mcanvas");

var img_ss = null;
var img_frame = null;
var img_bf = null;
var is_w = null;
var is_h = null;
var if_w = null;
var if_h = null;

var img_ov_1=null,img_ov_2=null,img_ov_3=null;

$(".save").click(function() {
    var file = new Blob([$('.jsteks').text()], {
        type: 'text/plain'
    });
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
    reader.onload = function(event) {

        var iPic = new Image();
        iPic.src = event.target.result;


        iPic.onload = function() {
            if (img_frame != null) {
                fCanvas.remove(img_frame);
            }
// canvas.sendBackwards(myObject)
// canvas.sendToBack(myObject)
// canvas.bringForward(myObject)
// canvas.bringToFront(myObject)
    
            img_frame = new fabric.Image(iPic);
            if_w = img_frame.getWidth();
            if_h = img_frame.getHeight();

            img_frame.setWidth(if_w / FACTOR);
            img_frame.setHeight(if_h / FACTOR);

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
    reader.onload = function(event) {

        var iPic = new Image();
        iPic.src = event.target.result;

        iPic.onload = function() {
            if (img_ss != null) {
                fCanvas.remove(img_ss);
            }

            img_ss = new fabric.Image(iPic);
            ss_x = img_ss.getWidth();
            ss_y = img_ss.getHeight();
            is_w = ss_x;
            is_h = ss_y;
            updateJSON();
            img_ss.setWidth(is_w / FACTOR);
            img_ss.setHeight(is_h / FACTOR);

            img_ss.set('hasControls', false);
            fCanvas.add(img_ss);
        };
    };
    reader.readAsDataURL(mfile);

}

var ssframe = "Redmi 1S";
var ss_x = 720;
var ss_y = 1280;
var background = "null";
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
        pos_ss_x = Math.round(px * FACTOR);
        pos_ss_y = Math.round(py * FACTOR);
        img_ss.moveTo(2);
    }

    if (img_frame != null) {

        var px_frame = img_frame.getLeft();
        var py_frame = img_frame.getTop();
        frame_x = Math.round(px_frame * FACTOR);
        frame_y = Math.round(py_frame * FACTOR);
        img_frame.moveTo(3);
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

$(".canvw").change(function() {
    var value = $(this).val();
    fCanvas.setWidth(value / FACTOR);
    fCanvas.calcOffset();
    bg_width = value;
    updateJSON();

});
$(".canvh").change(function() {
    var value = $(this).val();
    fCanvas.setHeight(value / FACTOR);
    fCanvas.calcOffset();
    bg_height = value;
    updateJSON();

});

$(".scale").change(function() {
    var value = $(this).val();
    FACTOR = value;
    if (img_frame != null) {
        img_frame.setWidth(if_w / FACTOR);
        img_frame.setHeight(if_h / FACTOR);
    }
    if (img_ss != null) {
        img_ss.setWidth(is_w / FACTOR);
        img_ss.setHeight(is_h / FACTOR);
    }
    if(img_bg!=null){
        img_bg.setWidth(bg_width /FACTOR);
        img_bg.setHeight(bg_height/FACTOR);
    }
    $(".canvh").trigger('change');
    $(".canvw").trigger('change');


});

$("#img_bg").change(function(e){
    var mfile = e.target.files[0];
    background = mfile.name;
    updateJSON();
    var reader = new FileReader();
    reader.onload = function(event) {
        var iPic = new Image();
        iPic.src = event.target.result;
        iPic.onload = function() {
            if (img_bg != null) {
                fCanvas.remove(img_bg);
            }    
            img_bg = new fabric.Image(iPic);
            bg_width = img_bg.getWidth();
            bg_height = img_bg.getHeight();

            img_bg.setWidth(bg_width / FACTOR);
            img_bg.setHeight(bg_height / FACTOR);

            img_bg.set('hasControls', false);
            img_bg.set('selectable',false)
            fCanvas.add(img_bg);
            img_bg.moveTo(0);
           
        };
    };
    reader.readAsDataURL(mfile);
});

$("#img_ss").change(function(event) {
    var mfile = event.target.files[0];
    frame = mfile.name;
    updateJSON();
    handleFRAME(event);

});

$("#img_frame").change(function(e) {
    handleSS(e);
});

$(".savepreview").click(function(){
    new fabric.downloadFabric(fCanvas,'plak_preview.jpeg');
});

