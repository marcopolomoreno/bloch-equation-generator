var tagFig = document.getElementsByTagName("figure");

var tagMenu = document.getElementById("menu").getElementsByTagName("a");

/* if (!isOnline)
{
    if(document.getElementsByTagName("title")[0].innerHTML === "SimuFísica")
    {
        document.getElementsByClassName("symbol")[0].getElementsByTagName("a")[0].href = "index.html";
        document.getElementById("menu").getElementsByTagName("a")[0].href = "index.html";

        if (document.documentElement.lang === "pt-BR")
        {
            document.getElementsByClassName("idiomas")[0].children[0].children[0].children[0].href = "index.html";
            document.getElementsByClassName("idiomas")[0].children[0].children[0].children[1].href = "en/index.html";
            document.getElementsByClassName("idiomas")[0].children[0].children[0].children[2].href = "es/index.html";
        }

        if (document.documentElement.lang === "en")
        {
            document.getElementsByClassName("idiomas")[0].children[0].children[0].children[0].href = "../index.html";
            document.getElementsByClassName("idiomas")[0].children[0].children[0].children[1].href = "index.html";
            document.getElementsByClassName("idiomas")[0].children[0].children[0].children[2].href = "../es/index.html";
        }

        if (document.documentElement.lang === "es")
        {
            document.getElementsByClassName("idiomas")[0].children[0].children[0].children[0].href = "../index.html";
            document.getElementsByClassName("idiomas")[0].children[0].children[0].children[1].href = "../en/index.html";
            document.getElementsByClassName("idiomas")[0].children[0].children[0].children[2].href = "index.html";
        }        
    }
    else
    {
        document.getElementsByClassName("symbol")[0].getElementsByTagName("a")[0].href = "../index.html";
        document.getElementById("menu").getElementsByTagName("a")[0].href = "../index.html";
    }

    for (k=0; k<=tagFig.length-1; k++)
        tagFig[k].getElementsByTagName("a")[0].href += "index2.html";

    for (k=1; k<=tagMenu.length-1; k++)
    {
        if (tagMenu[k].innerHTML !== "Sobre" && tagMenu[k].innerHTML !== "About" && tagMenu[k].innerHTML !== "Acerca de SimuFísica")
            tagMenu[k].href += "/index.html";
        
        if (tagMenu[k].innerHTML === "Sobre" || tagMenu[k].innerHTML === "About" || tagMenu[k].innerHTML === "Acerca de SimuFísica")
        {
            if (isOnline)
                tagMenu[k].href += "/sobre22.html";
            if (!isOnline)
                tagMenu[k].href += "/index2.html";
        }
            
    }       

    tagMenu[tagMenu.length-1].href += "/index2.html";
}

if( !isOnline )
{
    if (document.getElementById("sitemap") !== null)
        document.getElementById("sitemap").remove();
}

if( isMobile.any() || isIpad.ipad() )
{
    if (document.getElementById("ferramentas") !== null)
        document.getElementById("ferramentas").remove();
} */


if( !isOnline && ( isMobile.any() || isIpad.ipad() ) )
{
    if (document.getElementById("icones") !== null)
        document.getElementById("icones").remove();

    /* if (document.getElementById("sobre") !== null)
        document.getElementById("sobre").remove(); */

    if (document.getElementById("about") !== null)
        document.getElementById("about").remove();

    if (document.getElementById("acerca-de-simufisica") !== null)
        document.getElementById("acerca-de-simufisica").remove();
        
    if (document.getElementById("downloads") !== null)
        document.getElementById("downloads").remove();

    if (document.getElementById("descarga") !== null)
        document.getElementById("descarga").remove();

    if (document.getElementById("material") !== null)
        document.getElementById("material").remove();

    if (document.getElementById("blog") !== null)
        document.getElementById("blog").remove();
}