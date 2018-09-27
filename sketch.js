let style;
let inputImg;
let outputImg;

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
        style.transfer(inputImg, (err, img) => {
            if(err) {
                console.log(error);
            } else {
                $('#outputImg')[0].src = img.src;
            }
        });
    }
}