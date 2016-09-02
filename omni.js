var canvas;
var context;

var logo =
{
    style: 'colored',
    transparent: 1.0
};

var effect;

var background =
{
    style: 'none',
    transparent: 1.0,
    color: '#000000'
};

imgList = new Array();
window.onload = initFunction();

function initFunction()
{
    canvas = document.getElementById("omniImage");
    context = canvas.getContext("2d");

    for(var i = 0; i < 10; i++)
    {
        imgList[i] = new Image;
    }
    imgList[0].src = "omni_clr.png";
    imgList[1].src = "omni_wht.png";
    imgList[2].src = "omni_blc.png";
    imgList[3].src = "shad_sft.png";
    imgList[4].src = "shad_flt.png";
    imgList[5].src = "shad_lit.png";
    imgList[6].src = "shad_clr.png";
    imgList[7].src = "back_btf.png";
    imgList[8].src = "back_hrt.png";
    imgList[9].src = "back_wav.png";
    setInterval(refreshPage, 200);

    $('.materialButton').hover(
        function(){
            $(this).animate({
                opacity: 1
            }, 500);
        },
        function(){
            $(this).animate({
                opacity: 0.6
            }, 500);
        }
    );
}

function refreshPage()
{
    screenWidth = window.innerWidth;
    screenHeight = window.innerHeight;
    canvas.width = canvas.height =
        screenWidth > screenHeight ? 
        screenHeight - 60 : screenWidth - 60;
    canvas.style.marginTop = screenHeight - canvas.height - 50 + 'px';
    refreshForm();
    drawCanvas(context, canvas.width, canvas.height);
}

function refreshForm()
{
    logo.style = 
        document.getElementById("setLogoStyle").value;
    logo.transparent = 
        document.getElementById("setLogoTransparent").value;
    effect =
        document.getElementById("setEffect").value;
    background.style = 
        document.getElementById("setBgStyle").value;
    background.transparent = 
        document.getElementById("setBgTransparent").value;
    background.color = 
        document.getElementById("setBackground").value;
}

function toggleForm()
{
    $('#panel').toggle('slow');
}

function drawCanvas(__context, __width, __height)
{
    var bgImg = 0;
    var shImg = 0;
    var omImg = 0;
    __context.globalAlpha = 1.0;
    __context.fillStyle = background.color;
    __context.fillRect(0, 0, __width, __height);
    __context.globalAlpha = background.transparent;
    switch(background.style)
    {
        case 'butterfly':   bgImg = imgList[7]; break;
        case 'heart':       bgImg = imgList[8]; break;
        case 'waves':       bgImg = imgList[9]; break;
        case 'none': default: break;
    }
    if(bgImg)
        __context.drawImage(bgImg, 0, 0, __width, __height);
    __context.globalAlpha = 1.0;
    switch(effect)
    {
        case 'shadow':  shImg = imgList[3]; break;
        case 'flat':    shImg = imgList[4]; break;
        case 'light':   shImg = imgList[5]; break;
        case 'rainbow': shImg = imgList[6]; break;
        case 'none': default: break;
    }
    if(shImg)
        __context.drawImage(shImg, 0, 0, __width, __height);
    __context.globalAlpha = logo.transparent;
    switch(logo.style)
    {
        case 'colored': omImg = imgList[0]; break;
        case 'white':   omImg = imgList[1]; break;
        case 'black': default: omImg = imgList[2]; break;
    }
    if(omImg)
        __context.drawImage(omImg, 0, 0, __width, __height);
}

function exportCanvas()
{
    var cvs = document.createElement('canvas');
    var ctx = cvs.getContext('2d');
    cvs.width = cvs.height = 1024;
    drawCanvas(ctx, 1024, 1024);

    var image = cvs.toDataURL('png');
    image = image.replace('image/png', 'image/octet-stream');
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = image;
    var today = new Date();
    save_link.download = 'omnimedia'
        + today.getDate() + today.getHours()
        + today.getMinutes() + '.png';
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
}