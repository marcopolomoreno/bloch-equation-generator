function verTelaCheia()
{
      if ( document.webkitIsFullScreen === false || document.msFullscreenElement === false 
            || document.mozFullScreen === false || document.fullScreenElement === false)
                  document.getElementsByClassName("inner")[0].style.marginTop = "10px"
      
      if ( document.webkitIsFullScreen === true || document.msFullscreenElement === true 
            || document.mozFullScreen === true || document.fullScreenElement === true )
                  document.getElementsByClassName("inner")[0].style.marginTop = "70px"
}