function toggleFullScreen(elem)
{
    if ( (document.fullScreenElement !== undefined && document.fullScreenElement === null) 
      || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) 
      || (document.mozFullScreen !== undefined && !document.mozFullScreen) || 
      (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen) )
    {
      if (elem.requestFullScreen) {
        elem.requestFullScreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullScreen) {
        elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
      //document.getElementById("margem-superior").style.marginTop = "80px"
    } 
    else {
      if (document.cancelFullScreen) {
        document.cancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
      //document.getElementById("margem-superior").style.marginTop = "10px"
    }    
}

//********************************* */
function dispositivo()
{
    if ( window.innerHeight > 620 && window.innerWidth > 620 && mobile)
        return "tablet"
    
    if ( (window.innerHeight <= 620 || window.innerWidth <= 620) && mobile)
        return "smartphone"
}

function orientacao()
{
	  if (window.innerHeight > window.innerWidth)
        return "retrato"

    if (window.innerWidth > window.innerHeight)
        return "paisagem"
}

function alterarOrientacao(delay)
{
    if (orientacao() !== orient && Math.abs(window.innerHeight - window.innerWidth) > 100)
    {
        if (delay !== undefined)
        {
            setTimeout(function()
            {
                resetarTudo()
                
            }, delay)
        }
        else
        {
            resetarTudo()
        }
        
        orient = orientacao()
    }
}