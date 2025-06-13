if (dispositivo() === "smartphone" && orientacao() === "retrato")
{
    var all = document.getElementById("barraInferior").children.length
    for (var k=0; k<=all-1; k++)
    {
        if (document.getElementById("barraInferior").children[k].className !== "btn-group dropup")
            document.getElementById("barraInferior").children[k].children[1].style.display = "none";
        else
        {
            document.getElementById("barraInferior").children[k].children[0].children[1].style.display = "none";
            document.getElementById("barraInferior").children[k].children[0].style.marginTop = "10px"
        }            
    }        
}

if ( mobile === true && (dispositivo() === "tablet" || orientacao() === "paisagem") )
{
    document.getElementById("barraInferior").classList.add("navBottomTablet")
}


/* Botão Home */
if (!isOnline)
{
    if (!mobile)
        for (var k=0; k<=document.getElementsByClassName("barraDesktop")[0].children.length-1; k++)
            if (document.getElementsByClassName("barraDesktop")[0].children[k].href !== "")
            {
                if (document.documentElement.lang === "pt-BR" || document.documentElement.lang === "pt-br")
                    document.getElementsByClassName("barraDesktop")[0].children[k].href = "../../index.html"
                    else 
                        document.getElementsByClassName("barraDesktop")[0].children[k].href = "../index.html"
            }

/*     if (mobile)
    {
        for (var k=0; k<=document.getElementsByClassName("navBottom")[0].children.length-1; k++)
        {
            if (document.getElementsByClassName("navBottom")[0].children[k].href !== "")
            {
                if (document.documentElement.lang === "pt-BR" || document.documentElement.lang === "pt-br")
                    document.getElementsByClassName("navBottom")[0].children[k].href = "../../index.html"
                    else
                        document.getElementsByClassName("navBottom")[0].children[k].href = "../index.html"
            }

            if (document.getElementsByClassName("navBottom")[0].children[k].id === "navDesktop")
            {
                document.getElementsByClassName("navBottom")[0].children[k].style.display = "none"
            }
        }
    } */
}