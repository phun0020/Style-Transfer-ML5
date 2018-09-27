const loadingGif = $('#loading');
const outputImg = $('#outputImg')[0];

let style;
let inputImg;

function setup() {
    loadingGif.hide();
}

// events
$('img.style-img').click((el) => {
    $('img.style-img').removeClass('selected-img');
    let target = $(el)[0].target;
    target.classList.add('selected-img');

    let path = target.src;
    let styleName = getLastSegment(path);
    if(inputImg != undefined) {
        loadingGif.show();
        outputImg.src = "";
    }
    style = ml5.styleTransfer(`model/${styleName}`, modelLoaded);
    
    let description = $(target)[0].attributes[3].value;
    $('#credit').html(description);
});

$('img.input-img').click((el) => {
    $('img.input-img').removeClass('selected-img');
    inputImg = $(el)[0].target;
    inputImg.classList.add('selected-img');
    if(style != undefined) modelLoaded();
});

// func
function modelLoaded() {
    if(style != undefined && inputImg != undefined) {
        style.transfer(inputImg)
        .then(img => {
            outputImg.src = img.src;
            loadingGif.hide();
        })
        .catch(error => console.log(error));
    }
}

// helper
function getLastSegment(path) {
    let parts= path.split('/');
    return parts.pop().split('.').slice(0, -1).join('.'); 
}