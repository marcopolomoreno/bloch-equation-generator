var isMobile = 
{
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};
var isIpad =
{
    ipad: function() {
        if( !!(navigator.userAgent.match(/(iPad)/) || 
            (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) )
                return true
        //return navigator.userAgent.match(/iPad/i);
        //return true; //Fazer na versão app ipad
    },
}

var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

var isOnline = true

if (!isOnline)
{
    document.querySelector(':root').style.setProperty('--acao', 'pan-x pan-y');
    document.getElementsByTagName('script')[0].remove()
    document.getElementsByTagName('script')[0].remove()
}

if( !isOnline && !isMobile.any() && !isIpad.ipad() )
{
    if (document.getElementsByTagName("header")[0] !== undefined)
        document.getElementsByTagName("nav")[0].remove()
}

//Adição de script mobile