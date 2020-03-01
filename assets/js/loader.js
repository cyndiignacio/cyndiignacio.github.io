document.onreadystatechange = function () {
    var state = document.readyState
    if (state == 'complete') {
        setTimeout(function(){
            document.getElementById('interactive');
            var loadElement = document.getElementById('load');
            FadeOut(loadElement, 100);
        },1000);
    }
}

function FadeOut(element, opacity) {
    if(opacity == null)
        opacity = 100;

    SetOpacity(element, opacity);
    if(opacity > 0)
    {
        setTimeout(function() {
            FadeOut(element, opacity-10);
        }, 250);
    }else{
        element.style.display="none";
    }
}

function SetOpacity(element, value) {
    element.style.opacity = value / 100;
    element.style.filter = "alpha(opacity=" + value + ")";
}

//Then call it like this:
FadeOut("div_id");
