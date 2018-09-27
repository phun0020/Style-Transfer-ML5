let style;
let inputImg;

function setup() {
    
}

// events
$('img.style-img').click((el) => {
    $('img.style-img').removeClass('selected-img');
    let target = $(el)[0].target;
    target.classList.add('selected-img');

    let path = target.src;
    let styleName = getLastSegment(path);
    style = ml5.styleTransfer(`model/${styleName}`, modelLoaded);
    
    let description = $(target)[0].attributes[3].value;
    $('#credit').html(description);
    //$('#status').html("đợi xíu...");
});

$('img.input-img').click((el) => {
    $('img.input-img').removeClass('selected-img');
    inputImg = $(el)[0].target;
    inputImg.classList.add('selected-img');
    if(style != undefined) modelLoaded();
});

// helper
function getLastSegment(path) {
    let parts= path.split('/');
    return parts.pop().split('.').slice(0, -1).join('.'); 
}

function modelLoaded() {
    if(style != undefined && inputImg != undefined) {
        const outputImg = $('#outputImg')[0];
        outputImg.src = "images/loading.gif";
        style.transfer(inputImg)
        .then(img => outputImg.src = img.src)
        .catch(error => console.log(error));
    }
}