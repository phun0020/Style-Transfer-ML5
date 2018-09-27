let style;
let inputImg;
let outputImg;

function setup() {
    
}

// events
$('img.style-img').click((el) => {
    let path = $(el)[0].target.src;
    let styleName = getLastSegment(path);
    style = ml5.styleTransfer(`model/${styleName}`, modelLoaded);
});

$('img.input-img').click((el) => {
    inputImg = $(el)[0].target;
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