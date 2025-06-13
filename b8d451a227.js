function wTgd(cor, x, y)
{
    if (!mobile)
    {
        var ts = []
        //ts[0] = "w";     ts[1] = "w";     ts[2] = "w"
        //ts[3] = ".";     
        ts[4] = "s";     ts[5] = "i"
        ts[6] = "m";     ts[7] = "u";     ts[8] = "f"
        ts[9] = "i";     ts[10] = "s";    ts[11] = "i"
        ts[12] = "c";    ts[13] = "a";    ts[14] = "."
        ts[15] = "c";    ts[16] = "o";    ts[17] = "m"
        ctx.fillStyle = cor;
        ctx.font = "12px Arial";
        var gs = "";
        for (var k=4; k<=17; k++)
            gs = gs + ts[k]
        ctx.fillText(gs, x, y);
    }
}


function gerarCheckbox()
{
    document.getElementById('frequencias-rabi').innerHTML = ""
    document.getElementById('transicoes-permitidas').innerHTML = ""

    var divFR = document.getElementById("frequencias-rabi")
    var divTP = document.getElementById("transicoes-permitidas")

    for (var k=0; k<=Number(document.getElementById("rangeN").max)-1; k++)
    {
        for (var p=k+1; p<=Number(document.getElementById("rangeN").max)-1; p++)
        {
            if (p !== k)
            {
                var div2FR = document.createElement("div");
                div2FR.className = "form-check form-switch item"

                if (p > N-1)
                    div2FR.hidden = true
    
                divFR.appendChild(div2FR)
    
                var input = document.createElement("input")
                input.type = "checkbox"
                input.className = "form-check-input"
                input.id = "switchFR" + String(k+1) + String(p+1)
                input.checked = false
                input.onclick = function()
                {
                    //mostrar[this.id] = !mostrar[this.id]
                }
        
                var label = document.createElement("label")
                label.className = "form-check-label"
                label.htmlFor = input.id
                label.innerHTML = "|" + String(k+1) + "⟩ &#8594; |" + String(p+1) + "⟩"
        
                div2FR.appendChild(input)
                div2FR.appendChild(label)



                var div2TP = document.createElement("div");
                div2TP.className = "form-check form-switch item"
    
                divTP.appendChild(div2TP)

                if (p > N-1)
                    div2TP.hidden = true
    
                input = document.createElement("input")
                input.type = "checkbox"
                input.className = "form-check-input"
                input.id = "switchTP" + String(k+1) + String(p+1)
                input.checked = false
                input.onclick = function()
                {
                    //mostrar[this.id] = !mostrar[this.id]
                }
        
                label = document.createElement("label")
                label.className = "form-check-label"
                label.htmlFor = input.id
                label.innerHTML = "|" + String(k+1) + "⟩ &#8596; |" + String(p+1) + "⟩"
        
                div2TP.appendChild(input)
                div2TP.appendChild(label)
            }            
        }        
    }
}

gerarCheckbox()

function alterarCheckbox()
{   
    for (var k=0; k<=Nmax-1; k++)
    {
        for (var p=k+1; p<=Nmax-1; p++)
        {
            if (p <= N-1)
            {
                document.getElementById("switchFR" + String(k+1) + String(p+1)).parentElement.hidden = false
                document.getElementById("switchTP" + String(k+1) + String(p+1)).parentElement.hidden = false
            }
            else
            {
                document.getElementById("switchFR" + String(k+1) + String(p+1)).parentElement.hidden = true
                document.getElementById("switchTP" + String(k+1) + String(p+1)).parentElement.hidden = true
            }
        }
    }

    if (!mostrar.misturaOndas)
        gerarEquacoesBloch()
    else
        gerarEquacoesBlochMisturaOndas()
}



setTimeout(function()
{
    alterarCheckbox()
    document.getElementById("frequencias-rabi").parentElement.hidden = false
    document.getElementById("transicoes-permitidas").parentElement.hidden = false
}, 700)




var favoritou;

var fav = localStorage.geradorFuncoesBloch;
var appName = "geradorFuncoesBloch"

var ctx, Lx, Ly;

var pi = Math.PI, N;

var click = false;

var conteudo;

var eqBloch = ""
var eqBlochC = ""





var fonte = "12px Arial";





var compNiveis = 120,
    espNiveis = 7

var nivel = []

var Nmax = document.getElementById("rangeN").max

for (var k=0; k<=Nmax-1; k++)
{
    nivel[k] = {
        xi: 0,
        yi: 0,
        x: 0,
        y: 0,
        movel: false,
        cor: "rgba(26, 26, 26, 1.0)",
        label: String(k+1),
        decaimentos: 0,
        posXRelativa: 0,
        posYRelativa: 0,
        selecionado: false,
    }
}

var numSelecionados = 0



var mobile = false, ipad = false;



const urlParams = new URLSearchParams(window.location.search);

var mostrar = {
    ondaGirante: true,
    misturaOndas: false,
    FR12: true,
}



for (var k=0; k<=Nmax-1; k++)
{
    for (var p=k+1; p<=Nmax-1; p++)
    {
        eval("mostrar.FR" + String(k+1) + String(p+1) + " = false;");
        eval("mostrar.TP" + String(k+1) + String(p+1) + " = false;");
    }
}

mostrar.FR12 = true;
mostrar.FR23 = true;
mostrar.TP12 = true;
mostrar.TP23 = true;



var param = ["N", "tempoIntegracao", "passoTemporal", "larguraEspectro", "passoDessintonia"]

var config = [""]

var variavel = param



var escalaRender;

function adequarDispositivo()
{
    var telaX = window.innerWidth
    var telaY = window.innerHeight

    document.getElementById("parametros").style.gridTemplateColumns = "auto"

    orient = orientacao()

    if( isMobile.any() )
    {
        mobile = true
        
        if (isMobile.iOS())
            document.getElementById("navDesktop").style.display = "none"

        document.getElementById("barraInferior").style.overflowX = "visible"

        if (orientacao() === "retrato")
        {
            if (dispositivo() === "smartphone")
            {
                Lx = telaX - 30
                Ly = 0.55*telaY
                
                document.getElementById("parametros").style.height = String(telaY - Ly - 65) + "px"

                document.getElementById("parametros").style.gridTemplateColumns = "auto"
            }

            if (dispositivo() === "tablet")
            {
                Lx = telaX - 400
                Ly = telaY - 60
                offsetGrid = Math.floor(Lx) - 100

                document.getElementById("parametros").style.height = String(telaY - 65) + "px"
            }
        }

        if (orientacao() === "paisagem")
        {
            if (dispositivo() === "smartphone")
            {
                Lx = 0.65*telaX
                Ly = telaY - 60

                document.getElementById("parametros").style.height = String(telaY - 65) + "px"
            }

            if (dispositivo() === "tablet")
            {
                Lx = telaX - 400
                Ly = telaY - 60
                offsetGrid = Math.floor(Lx) - 100

                document.getElementById("parametros").style.height = String(telaY - 65) + "px"
            }
        }

        escalaRender = 2;
    }


    if( isIpad.ipad() )
    {
        mobile = true
        ipad = true

        document.getElementById("barraInferior").style.overflowX = "visible"

        document.getElementById("parametros").style.paddingBottom = "8px"

        document.getElementById("div-N").style.maxHeight = "60px"
        document.getElementById("checkbox").style.maxHeight = "60px"

        var children = document.getElementById("parametros").children.length

        if (orientacao() === "retrato")
        {
            Lx = telaX - 30

            if (Lx > 1200-70)
                Lx = 1200-100

            Ly = 0.6*telaY

            document.getElementById("parametros").style.margin = ""

            document.getElementById("parametros").style.height = String(telaY - Ly - 70) + "px"

            document.getElementById("parametros").style.gridTemplateColumns = "1fr 1fr"

            //document.getElementById("div-btn-gerar").style.gridColumn = "1 / span 2"

            document.getElementById("parametros").children[0].style.margin = ""
            document.getElementById("parametros").children[1].style.margin = ""

            for (var k=3; k<=children-1; k++)
            {
                document.getElementById("parametros").children[k].style.margin = "auto 10px"
            }

            //document.getElementById("div-btn-gerar").style.margin = "0 auto"
        }

        if (orientacao() === "paisagem")
        {
            Lx = telaX - 430

            if (Lx > 1200-70)
                Lx = 1200-100

            Ly = telaY - 100

            document.getElementById("parametros").style.margin = "auto"

            document.getElementById("parametros").style.height = String(telaY - 70) + "px"
            //document.getElementById("parametros").style.width = String(telaX - Lx - 50) + "px"

            document.getElementById("parametros").style.gridTemplateColumns = "auto"

            //document.getElementById("div-btn-gerar").style.gridColumn = ""            

            document.getElementById("parametros").children[0].style.margin = "2px 10px"

            for (var k=1; k<=children-1; k++)
            {
                document.getElementById("parametros").children[k].style.margin = "auto 10px"
            }

            //document.getElementById("div-btn-gerar").style.margin = "auto"
        }

        fonte = "14px Arial";

        escalaRender = 2;
    }

    if (!mobile)
    {
        document.getElementsByTagName("html")[0].style = "overflow: none"
        document.getElementsByTagName("body")[0].style = "overflow: none"

        document.getElementById("barraInferior").className = "barraDesktop"  
        
        document.getElementById("parametros").style.paddingBottom = "8px"

        document.getElementById("div-N").style.maxHeight = "60px"
        document.getElementById("checkbox").style.maxHeight = "60px"

        var children = document.getElementById("parametros").children.length

        if (orientacao() === "paisagem")
        {
            Lx = telaX - 430

            if (Lx > 1200-70)
                Lx = 1200-100

            Ly = telaY - 100

            document.getElementById("parametros").style.margin = "auto"

            document.getElementById("parametros").style.height = String(telaY - 90) + "px"
            //document.getElementById("parametros").style.width = String(telaX - Lx - 50) + "px"

            document.getElementById("parametros").style.gridTemplateColumns = "auto"

            //document.getElementById("div-btn-gerar").style.gridColumn = ""            

            document.getElementById("parametros").children[0].style.margin = "2px 10px"

            for (var k=1; k<=children-1; k++)
            {
                document.getElementById("parametros").children[k].style.margin = "auto 10px"
            }

            //document.getElementById("div-btn-gerar").style.margin = "auto"
        }
        
        if (orientacao() === "retrato")
        {
            Lx = telaX - 35

            if (Lx > 1200-70)
                Lx = 1200-100

            Ly = 0.6*telaY

            document.getElementById("parametros").style.margin = ""

            document.getElementById("parametros").style.height = String(telaY - Ly - 95) + "px"

            document.getElementById("parametros").style.gridTemplateColumns = "1fr 1fr"

            //document.getElementById("div-btn-gerar").style.gridColumn = "1 / span 2"

            //document.getElementById("parametros").children[0].style.margin = ""
            //document.getElementById("parametros").children[1].style.margin = ""

            /* for (var k=3; k<=children-1; k++)
            {
                document.getElementById("parametros").children[k].style.margin = "auto 10px"
            } */

            //document.getElementById("div-btn-gerar").style.margin = "0 auto"
        }
        
        fonte = "16px Arial";
        
        escalaRender = 2    
    }
}

addEventListener("resize", function(){mudarOrientacao()})

adequarDispositivo()



var rt = document.querySelector(':root')
    rt.style.setProperty('--Lx', Lx + 'px')
    rt.style.setProperty('--Ly', Ly + 'px')





for (var k=0; k<=5; k++)
{
    nivel[k].xi = 0.5*Lx - 0.7*compNiveis// + 0.5*(1-(-1)**k)*compNiveis
    nivel[k].yi = Ly - 0.16*Ly*(k+1)
}

for (var k=6; k<=17; k++)
{
    nivel[k].xi = 0.5*Lx + 1.8*(-1)**k*compNiveis - 0.6*compNiveis //- 0.5*compNiveis + 0.5*(1-(-1)**k)*compNiveis
    nivel[k].yi = Ly - 0.16*Ly*(Math.floor(k/2)-2)
}

for (var k=18; k<=Nmax-1; k++)
    {
        nivel[k].xi = 0.5*Lx + 3.6*(-1)**k*compNiveis - 0.6*compNiveis //- 0.5*compNiveis + 0.5*(1-(-1)**k)*compNiveis
        nivel[k].yi = Ly - 0.16*Ly*(Math.floor(k/2)-8)
    }


//posições iniciais dos níveis
for (var k=0; k<=Nmax-1; k++)
{
    nivel[k].x = nivel[k].xi
    nivel[k].y = nivel[k].yi
}



variaveis()

var N = Number(urlParams.get("N"))
var tempoIntegracao = Number(urlParams.get("tempoIntegracao"))
var larguraEspectro = Number(urlParams.get("larguraEspectro"))
var passoTemporal = Number(urlParams.get("passoTemporal"))
var passoDessintonia = Number(urlParams.get("passoDessintonia"))


for (var k=0; k<=Nmax-1; k++)
{
    if (urlParams.get("x" + Number(k+1)) !== null)
        nivel[k].x = Number(urlParams.get("x" + Number(k+1)))

    if (urlParams.get("y" + Number(k+1)) !== null)
        nivel[k].y = Number(urlParams.get("y" + Number(k+1)))
}







/* Salvar simulação no localStorage --------------------------------*/
var appGeradorFuncoesBloch = {
    nome: [],
    url: []
}

var simString = Object.keys({appGeradorFuncoesBloch})[0]
var armazenado = JSON.parse( localStorage.getItem(simString) );
var nomeSim = window[simString]
/* Salvar simulação no localStorage --------------------------------*/






function resetarTudo() {
    window.history.pushState({}, "", document.location.href.split("?")[0]);
    location.reload();
}




//******************************************** */
//******************************************** */
window.onload = function startSimulation()
{
	ctx = simulation.context;
    simulation.start();
}

var simulation = {
    canvas: document.createElement("canvas"),
    start: function()
    {
        this.canvas.width = Lx*escalaRender;
      	this.canvas.height = Ly*escalaRender;

        this.context = this.canvas.getContext("2d");
        document.getElementById('canvas').appendChild(this.canvas);
        this.interval = setInterval(updateSimulation, 1);
    },
    clear: function()
    {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
//******************************************** */
//******************************************** */




//diminuir código
function ondaGirante()
{
    if (!mostrar.ondaGirante)
    {
    	mostrar.ondaGirante = true
    }  
    else
    {
        mostrar.ondaGirante = false
    }
}

function misturaOndas()
{
    if (!mostrar.misturaOndas)
    {
    	mostrar.misturaOndas = true
        document.getElementById("checkbox").children[0].children[0].disabled = true

        if (N > 4)
        {
            setTimeout(function(){
                alterarCheckbox()
            }, 500)
        }

        document.getElementById("rangeN").max = 4

        if (N <= 4)
            document.getElementById("btnGerarEquacoesBloch").onclick = gerarEquacoesBlochMisturaOndas()

        document.getElementById("botoes").children[0].hidden = true
        document.getElementById("botoes").children[1].hidden = false
        document.getElementById("botoes").children[2].hidden = true
        document.getElementById("botoes").children[3].hidden = false
    }  
    else
    {
        mostrar.misturaOndas = false
        document.getElementById("checkbox").children[0].children[0].disabled = false

        document.getElementById("rangeN").max = Nmax

        document.getElementById("btnGerarEquacoesBloch").onclick = gerarEquacoesBloch()

        document.getElementById("botoes").children[0].hidden = false
        document.getElementById("botoes").children[1].hidden = true
        document.getElementById("botoes").children[2].hidden = false
        document.getElementById("botoes").children[3].hidden = true
    }
}


setTimeout(function(){
    if (mostrar.misturaOndas)
    {
        document.getElementById("btnGerarEquacoesBloch").onclick = gerarEquacoesBlochMisturaOndas()

        document.getElementById("botoes").children[0].hidden = true
        document.getElementById("botoes").children[1].hidden = false
        document.getElementById("botoes").children[2].hidden = true
        document.getElementById("botoes").children[3].hidden = false
    }        
}, 300)





function drawNiveis()
{
    var tamFonte;

    if (N <= 12)
    {
        compNiveis = Math.max(0.1*Lx, 80)
        espNiveis = 0.008*Ly
        tamFonte = Math.floor(0.018*Lx)
    }
    if (N > 12)
    {
        compNiveis = Math.max(0.1*Lx, 60)
        espNiveis = 0.007*Ly
        tamFonte = Math.floor(0.015*Lx)
    }

    ctx.font = tamFonte + "px Arial";

    for (var k=0; k<=N-1; k++)
    {
        if ( Math.min(selecao.inicioX, selecao.fimX) <= nivel[k].x + compNiveis && Math.max(selecao.inicioX, selecao.fimX) >= nivel[k].x && Math.min(selecao.inicioY, selecao.fimY) <= nivel[k].y + espNiveis && Math.max(selecao.inicioY, selecao.fimY) >= nivel[k].y )
        {
            nivel[k].cor = nivel[k].cor.replace(", 1.0", ', 0.3')
            nivel[k].selecionado = true
        }

        if ( !(Math.min(selecao.inicioX, selecao.fimX) <= nivel[k].x + compNiveis && Math.max(selecao.inicioX, selecao.fimX) >= nivel[k].x && Math.min(selecao.inicioY, selecao.fimY) <= nivel[k].y + espNiveis && Math.max(selecao.inicioY, selecao.fimY) >= nivel[k].y) && !moverSistema2 )
        {
            nivel[k].cor = nivel[k].cor.replace(", 0.3", ', 1.0')
            nivel[k].selecionado = false
        }

        ctx.fillStyle = nivel[k].cor

        ctx.beginPath()
        ctx.rect(nivel[k].x, nivel[k].y, compNiveis, espNiveis)
        ctx.fill()

        ctx.fillStyle = "#0052cc"

        ctx.beginPath()
        ctx.fillText("|" + String(k+1) + "⟩", nivel[k].x + 1.05*compNiveis, nivel[k].y + 8)
        ctx.stroke()
    }

    //console.log(xM + ", " + yM)
}

var centroNiveis;
function calcCentroNiveis()
{
    centroNiveis = {x: 0, y: 0}

    for (var i=0; i<=N-1; i++)
    {
        centroNiveis.x = centroNiveis.x + nivel[i].x + 0.5*compNiveis
        centroNiveis.y = centroNiveis.y + nivel[i].y + 0.5*espNiveis
    }

    centroNiveis.x = centroNiveis.x/N
    centroNiveis.y = centroNiveis.y/N
}

function centralizar()
{
    calcCentroNiveis()

    for (var i=0; i<=N-1; i++)
    {
        nivel[i].x = nivel[i].x + 0.5*Lx - centroNiveis.x
        nivel[i].y = nivel[i].y + 0.5*Ly - centroNiveis.y
    }
}

setTimeout(centralizar, 200)



function drawFrequenciasRabi()
{
    var shift = 0

    for (var k=0; k<=N-1; k++)
    {
        for (var p=k+1; p<=N-1; p++)
        {
            if (document.getElementById("switchFR" + String(k+1) + String(p+1)).checked)
            {
                shift = 10*(-1)**p - 10
                ctx.lineWidth = 2;

                if (nivel[k].y > nivel[p].y)
                    drawSeta(nivel[k].x + 0.5*compNiveis + shift, nivel[k].y-3, nivel[p].x + 0.5*compNiveis + shift, nivel[p].y+7, "red", "grossa", 17, 10)

                if (nivel[p].y > nivel[k].y)
                    drawSeta(nivel[p].x + 0.5*compNiveis + shift, nivel[p].y-3, nivel[k].x + 0.5*compNiveis + shift, nivel[k].y+7, "red", "grossa", 17, 10)
            }
        }
    }
}

function drawDecaimentos()
{
    var shift = 0

    for (var k=0; k<=N-1; k++)
    {
        for (var p=k+1; p<=N-1; p++)
        {
            if (document.getElementById("switchTP" + String(k+1) + String(p+1)).checked)
            {
                shift = 20*(-1)**(p+1)

                if (nivel[k].y > nivel[p].y)
                    drawSetaSinuosa(nivel[p].x + shift, nivel[p].y+7, nivel[k].x + shift, nivel[k].y-3);

                if (nivel[p].y > nivel[k].y)
                    drawSetaSinuosa(nivel[k].x + shift, nivel[k].y+7, nivel[p].x + shift, nivel[p].y-3)
            }
        }
    }
}



function drawSetaSinuosa(startX, startY, endX, endY)
{
    // Calcula o comprimento e a inclinação da seta
    var angulo = Math.atan2(endY - startY, endX - startX);
    var comprimento = Math.hypot(startX - endX, startY - endY);

    ctx.save();
    ctx.translate(startX + 0.5*compNiveis, startY);
    ctx.rotate(angulo);

    ctx.beginPath();
    for (var k=0; k<=comprimento; k=k+2)
    {
        var x = k
        var y = 7*Math.sin(0.2*x)
        ctx.lineTo(x, y);
    }

    ctx.strokeStyle = 'orange';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.strokeStyle = 'black';
  
    ctx.restore();
}



//Gera as equações de Bloch em html
function gerarEquacoesBloch()
{
    eqBloch = ""
    var simbolo, simboloFreq, simboloOmega

    if (!mostrar.ondaGirante)
    {
        simbolo = "ρ"
        simboloFreq = "ω"
        simboloOmega = "'"
    }
    
    if (mostrar.ondaGirante)
    {
        simbolo = "σ"
        simboloFreq = "δ"
        simboloOmega = ""
    }

    //populações
    for (var p=0; p<=N-1; p++)
    {
        eqBloch = eqBloch + "dρ<sub>" + String(p+1) + String(p+1) + "</sub>/dt = "

        var pop = ""

        for (var q=0; q<=N-1; q++)
        {
            if (q !== p && document.getElementById("switchFR" + String(Math.min(p+1,q+1)) + String(Math.max(p+1,q+1)) ).checked)
            {
                pop = pop + "&#x2212; iΩ" + simboloOmega + "<sub>" + String(q+1) + String(p+1) + "</sub>" + simbolo + "<sub>" + String(p+1) + String(q+1) + "</sub> + " + 
                                     "iΩ" + simboloOmega + "<sub>" + String(p+1) + String(q+1) + "</sub>" + simbolo + "<sub>" + String(q+1) + String(p+1) + "</sub> "
            }
        }

        //decaimentos
        for (var q=0; q<=N-1; q++)
        {
            if (q !== p && document.getElementById("switchTP" + String(Math.min(p+1,q+1)) + String(Math.max(p+1,q+1)) ).checked)
            {
                if (nivel[p].y > nivel[q].y)
                {
                    pop = pop + " + Γ<sub>" + String(q+1) + String(p+1) + "</sub>ρ<sub>" + String(q+1) + String(q+1) + "</sub>"
                }

                if (nivel[q].y > nivel[p].y)
                {
                    pop = pop + " &#x2212; Γ<sub>" + String(p+1) + String(q+1) + "</sub>ρ<sub>" + String(p+1) + String(p+1) + "</sub>"
                }
            }
                
        }

        eqBloch = eqBloch + pop

        if (pop === "")
            eqBloch = eqBloch + "0"

        eqBloch = eqBloch + "<br>"
    }

    //coerências
    for (var k=0; k<=N-1; k++)
    {
        for (var p=k; p<=N-1; p++)
        {
            if (k !== p)
            {
                /* if (!document.getElementById( "switchTP" + String(Math.min(k+1,p+1)) + String(Math.max(k+1,p+1)) ).checked)
                {
                    for (var q=0; q<=N-1; q++)
                    simboloFreq = "(δ<sub>" + String(k+1) + String(q) + "</sub> - δ<sub>" 
                                            + String(Math.max(k+1,p+1)) + String(Math.min(k+1,p+1)) + "</sub>)"
                } */

                eqBloch = eqBloch + "d" + simbolo + "<sub>"  + String(k+1) + String(p+1) + "</sub>/dt = " + 
                                    "(i" + simboloFreq + "<sub>" + String(p+1) + String(k+1) + "</sub>&#x2212; γ<sub>" + String(k+1) + String(p+1) + 
                                    "</sub>)" + simbolo + "<sub>" + String(k+1) + String(p+1) + "</sub>"                

                for (var q=0; q<=N-1; q++)
                {
                    if (q !== p && q !== k && document.getElementById( "switchFR" + String(Math.min(q+1,p+1)) + String(Math.max(q+1,p+1)) ).checked)
                    {
                        eqBloch = eqBloch + " &#x2212; iΩ" + simboloOmega + "<sub>" + String(q+1) + String(p+1) + "</sub>" + simbolo + "<sub>" + String(k+1) + String(q+1) + "</sub>"
                    }

                    if (q !== p && q !== k && document.getElementById( "switchFR" + String(Math.min(k+1,q+1)) + String(Math.max(k+1,q+1)) ).checked)
                    {
                        eqBloch = eqBloch + " + iΩ" + simboloOmega + "<sub>" + String(k+1) + String(q+1) + "</sub>" + simbolo + "<sub>" + String(q+1) + String(p+1) + "</sub>"
                    }
                }

                if ( document.getElementById( "switchFR" + String(Math.min(k+1,p+1)) + String(Math.max(k+1,p+1)) ).checked )
                {
                    eqBloch = eqBloch + " + iΩ<sub>" + String(k+1) + String(p+1) + "</sub>(" + "ρ<sub>" + String(p+1) + String(p+1) + "</sub> &#x2212; ρ<sub>" + String(k+1) + String(k+1) + "</sub>)"
                }
            }

            if (p !== N - 1)
                eqBloch = eqBloch + "<br>"
        }

    }

    document.getElementById("equacoesBloch").innerHTML = eqBloch
}




function permutacoes(arr, k) {
    const result = [];

    function permuteUtil(currPerm, remaining, k) {
        if (currPerm.length === k) {
            result.push(currPerm.join(''));
            return;
        }

        for (let i = 0; i < remaining.length; i++) {
            const newPerm = currPerm.concat(remaining[i]);
            const newRemaining = remaining.slice(0, i).concat(remaining.slice(i + 1));
            permuteUtil(newPerm, newRemaining, k);
        }
    }

    permuteUtil([], arr, k);
    return result;
}

// Test cases
//console.log(permutacoes([1, 2, 3, 4], 1)); // [ '1', '2', '3', '4' ]
//console.log(permutacoes([1, 2, 3, 4], 2)); // [ '12', '21', '13', '31', '14', '41', '23', '32', '24', '42', '34', '43' ]
//console.log(permutacoes([1, 2, 3, 4], 3)); // [ '123', '132', '213', '231', '312', '321', '124', '142', '214', '241', '412', '421', '134', '143', '314', '341', '413', '431', '234', '243', '324', '342', '423', '432' ]




function indiceParaPares(entrada, sinal, simbolo)
{
    saida = "";

    str = String(entrada)

    for (var k=0; k<=str.length-1; k++)
    {
        if (k!== str.length-1)
        {
            if (simbolo === "δ")
                saida = saida + "δ<sub>" + str[k] + str[k+1] + "</sub> " + sinal + " "

            if (simbolo === "delta")
                saida = saida + "delta" + str[k] + str[k+1] + " " + sinal + " "

            if (simbolo === "ω")
                saida = saida + "ω<sub>" + str[k] + str[k+1] + "</sub> " + sinal + " "

            if (simbolo === "omega")
                saida = saida + "omega" + str[k] + str[k+1] + " " + sinal + " "
        }
            
    }

    saida = saida.slice(0, -3)

    return saida;
}



//Função que remove dois elementos de um array
function removerElementos(arr, elem1, elem2)
{
    var index = arr.indexOf(elem1);

    if (index > -1)
        arr.splice(index, 1);

    index = arr.indexOf(elem2);

    if (index > -1)
        arr.splice(index, 1);

    return arr;
}




//Gera as equações de Bloch com mistura de ondas em html e em C
function gerarEquacoesBlochMisturaOndas()
{
    eqBloch = ""        //Equações de Bloch em html
    eqBlochC = ""       //Equações de Bloch em C

    //Expansão nas componentes de Fourier

    eqBloch = "<p>Componentes de Fourier:</p>"

    //populações
    for (var k=0; k<=N-1; k++)
    {
        eqBloch = eqBloch + "ρ<sub>" + String(k+1) + String(k+1) + "</sub> = ρ<sub>" + String(k+1) + String(k+1) + "</sub><sup>DC</sup>"

        var vetIndices = Array.from({length: N}, (_, i) => i + 1)

        //n=2  =>   três ômegas
        for (var n=2; n<=2; n++)
            for (var q=0; q<=permutacoes(removerElementos(vetIndices, k+1, p+1), n).length-1; q++)
            {
                eqBloch = eqBloch + 
                        " + ρ<sub>" + String(k+1) + String(k+1) + "</sub><sup>(" + String(k+1) + permutacoes(removerElementos(vetIndices, k+1, k+1), n)[q] + String(k+1) + ")</sup> " + 
                        "e <sup>i(" + indiceParaPares(String(k+1) + String(permutacoes(removerElementos(vetIndices, k+1, k+1), n)[q]) + String(k+1), "+", "δ") + ")t</sup>"
            }

        eqBloch = eqBloch + "<br>"
    }

    //coerências
    for (var k=0; k<=N-1; k++)
    {
        for (var p=k; p<=N-1; p++)
        {
            if (k !== p)
            {
                eqBloch = eqBloch + "ρ<sub>"  + String(k+1) + String(p+1) + "</sub> = " + 
                            "σ<sub>" + String(k+1) + String(p+1) + "</sub><sup>(" + String(k+1) + String(p+1) + ")</sup> " + 
                            "e <sup>iω<sub>" + String(k+1) + String(p+1) + "</sub>t</sup>"

                var vetIndices = Array.from({length: N}, (_, i) => i + 1)

                //n=2  => três ômegas
                for (var n=1; n<=3; n++)
                    for (var q=0; q<=permutacoes(removerElementos(vetIndices, k+1, p+1), n).length-1; q++)
                    {
                        eqBloch = eqBloch + 
                                " + σ<sub>" + String(k+1) + String(p+1) + "</sub><sup>(" + String(k+1) + permutacoes(removerElementos(vetIndices, k+1, p+1), n)[q] + String(p+1) + ")</sup> " + 
                                "e <sup>i(" + indiceParaPares(String(k+1) + String(permutacoes(removerElementos(vetIndices, k+1, p+1), n)[q]) + String(p+1), "+", "ω") + ")t</sup>"
                    }
            }

            if (p!==N-1)
            eqBloch = eqBloch + "<br>"
        }
    }

    eqBloch = eqBloch + "<br><br><p>Equações de Bloch: </p>"


    //Equações de Bloch ****************************

    var j = -1

    //populações
    for (var p=0; p<=N-1; p++)
    {
        var vetIndices = Array.from({length: N}, (_, i) => i + 1)

        var temp1 = ""      //Parte real
        var temp2 = ""      //Parte imaginária

        //n=2  => três ômegas
        for (var n=0; n<=2; n=n+2)
            for (var r=0; r<=permutacoes(removerElementos(vetIndices, p+1, p+1), n).length-1; r++)
            {
                var rotaPopulacao = String(p+1) + permutacoes(removerElementos(vetIndices, p+1, p+1), n)[r] + String(p+1)

                j++

                if (n === 0)
                {
                    eqBloch = eqBloch + "dρ<sub>" + String(p+1) + String(p+1) + "</sub><sup>("
                            + rotaPopulacao + ")</sup>/dt = "
                    
                    temp1 = "\t\t/*a" + String(p+1) + String(p+1) + "("
                            + rotaPopulacao + ")*/\n\t\tif (j==" + j + ") return"
                }
                else
                {
                    eqBloch = eqBloch + "dρ<sub>" + String(p+1) + String(p+1) + "</sub><sup>("
                            + rotaPopulacao + ")</sup>/dt = "
                            + "&#x2212; i(" + indiceParaPares(rotaPopulacao, "+", "δ") + ")"
                            + "ρ<sub>" + String(p+1) + String(p+1) + "</sub><sup>(" + rotaPopulacao + ")</sup>"

                    temp1 = "\t\t/*a" + String(p+1) + String(p+1) + "("
                            + rotaPopulacao + ")*/\n\t\tif (j==" + j + ") return "
                            + "(" + indiceParaPares(rotaPopulacao, "+", "delta") + ")*" + "b" + String(p+1) + String(p+1) + "_" + rotaPopulacao

                    j++

                    temp2 = "\t\t/*b" + String(p+1) + String(p+1) + "("
                            + rotaPopulacao + ")*/\n\t\tif (j==" + j + ") return "
                            + "-(" + indiceParaPares(rotaPopulacao, "+", "delta") + ")*" + "a" + String(p+1) + String(p+1) + "_" + rotaPopulacao
                }
                    

                var pop = "";

                for (var q=0; q<=N-1; q++)
                {
                    if (q !== p && document.getElementById("switchFR" + String(Math.min(p+1,q+1)) + String(Math.max(p+1,q+1)) ).checked)
                    {
                        if (n===0)
                        {
                            pop = pop + " + iΩ<sub>" + String(p+1) + String(q+1) + "</sub>σ<sub>" + String(q+1) + String(p+1) + "</sub>" 
                                + "<sup>(" + String(q+1) + String(p+1) + ")</sup>" + 
                                " &#x2212; iΩ<sub>" + String(q+1) + String(p+1) + "</sub>σ<sub>" + String(p+1) + String(q+1) + "</sub>"
                                + "<sup>(" + String(p+1) + String(q+1) + ")</sup>"

                            //Parte real
                            var elemento;

                            if (p < q)
                            {
                                elemento = String(p+1) + String(q+1)
                                
                                temp1 = temp1 + " + 2*A" + elemento + "*b" + elemento + "_" + elemento
                                              + " - 2*B" + elemento + "*a" + elemento + "_" + elemento
                            }

                            if (p > q)
                            {
                                elemento = String(q+1) + String(p+1)
                                
                                temp1 = temp1 + " - 2*A" + elemento + "*b" + elemento + "_" + elemento
                                              + " + 2*B" + elemento + "*a" + elemento + "_" + elemento
                            }
                        }
                        
                        else
                        for (var h=0; h<=2; h++)
                        {
                            var vetIndices2 = Array.from({length: N}, (_, i) => i + 1)

                            var caminhoInterno = permutacoes(removerElementos(vetIndices2, q+1, p+1), h)

                            for (var m=0; m<=caminhoInterno.length-1; m++)
                            {
                                if ( (String(p+1) + String(q+1) + caminhoInterno[m] + String(p+1)).includes(rotaPopulacao) )
                                {
                                    pop = pop + " + iΩ<sub>" + String(p+1) + String(q+1) + "</sub>σ<sub>" + String(q+1) + String(p+1) + "</sub>" 
                                              + "<sup>(" + String(q+1) + caminhoInterno[m] + String(p+1) + ")</sup>"

                                    var elemento;

                                    if (p < q)
                                    {
                                        elemento = String(p+1) + String(q+1)

                                        temp1 = temp1 + " + 2*A" + elemento + "*b" + elemento + "_" + Math.min(String(q+1),String(p+1)) + caminhoInterno[m] + Math.max(String(q+1),String(p+1))
                                                      + " - 2*B" + elemento + "*a" + elemento + "_" + Math.min(String(q+1),String(p+1)) + caminhoInterno[m] + Math.max(String(q+1),String(p+1))
                                    
                                        temp2 = temp2 + " - 2*A" + elemento + "*a" + elemento + "_" + Math.min(String(q+1),String(p+1)) + caminhoInterno[m] + Math.max(String(q+1),String(p+1))
                                                      + " - 2*B" + elemento + "*b" + elemento + "_" + Math.min(String(q+1),String(p+1)) + caminhoInterno[m] + Math.max(String(q+1),String(p+1))
                                    }

                                    if (p > q)
                                    {
                                        elemento = String(q+1) + String(p+1)

                                        temp1 = temp1 + " - 2*A" + elemento + "*b" + elemento + "_" + Math.min(String(p+1),String(q+1)) + caminhoInterno[m] + Math.max(String(p+1),String(q+1))
                                                      + " + 2*B" + elemento + "*a" + elemento + "_" + Math.min(String(p+1),String(q+1)) + caminhoInterno[m] + Math.max(String(p+1),String(q+1))
                                    
                                        temp2 = temp2 + " - 2*A" + elemento + "*a" + elemento + "_" + Math.min(String(p+1),String(q+1)) + caminhoInterno[m] + Math.max(String(p+1),String(q+1))
                                                      + " - 2*B" + elemento + "*b" + elemento + "_" + Math.min(String(p+1),String(q+1)) + caminhoInterno[m] + Math.max(String(p+1),String(q+1))
                                    }

                                    /* temp1 = temp1 + " - A" + Math.min(String(p+1), String(q+1)) + Math.max(String(p+1), String(q+1))
                                                  + "*b" + Math.min(String(p+1), String(q+1)) + Math.max(String(p+1), String(q+1)) 
                                                  + "_" + Math.min(String(q+1),String(p+1)) + caminhoInterno[m] + Math.max(String(q+1),String(p+1))
                                                  + " + B" + Math.min(String(p+1), String(q+1)) + Math.max(String(p+1), String(q+1))
                                                  + "*a" + Math.min(String(p+1), String(q+1)) + Math.max(String(p+1), String(q+1)) 
                                                  + "_" + Math.min(String(q+1),String(p+1)) + caminhoInterno[m] + Math.max(String(q+1),String(p+1))

                                    temp2 = temp2 + " + A" + Math.min(String(p+1), String(q+1)) + Math.max(String(p+1), String(q+1))
                                                  + "*a" + Math.min(String(p+1), String(q+1)) + Math.max(String(p+1), String(q+1)) 
                                                  + "_" + Math.min(String(q+1),String(p+1)) + caminhoInterno[m] + Math.max(String(q+1),String(p+1))
                                                  + " + B" + Math.min(String(p+1), String(q+1)) + Math.max(String(p+1), String(q+1))
                                                  + "*b" + Math.min(String(p+1), String(q+1)) + Math.max(String(p+1), String(q+1)) 
                                                  + "_" + Math.min(String(q+1),String(p+1)) + caminhoInterno[m] + Math.max(String(q+1),String(p+1)) */
                                }

                                if ( (String(p+1) + caminhoInterno[m] + String(q+1) + String(p+1)).includes(rotaPopulacao) )
                                {
                                    pop = pop + " &#x2212; iΩ<sub>" + String(q+1) + String(p+1) + "</sub>σ<sub>" + String(p+1) + String(q+1) + "</sub>" 
                                              + "<sup>(" + String(p+1) + caminhoInterno[m] + String(q+1) + ")</sup>"

                                    var elemento;

                                    if (p < q)
                                    {
                                        elemento = String(p+1) + String(q+1)
                                        
                                        temp1 = temp1 + " - 2*A" + elemento + "*a" + elemento + "_" + Math.min(String(q+1),String(p+1)) + caminhoInterno[m] + Math.max(String(q+1),String(p+1))
                                                      + " - 2*B" + elemento + "*b" + elemento + "_" + Math.min(String(q+1),String(p+1)) + caminhoInterno[m] + Math.max(String(q+1),String(p+1))
                                    
                                        temp2 = temp2 + " - 2*A" + elemento + "*b" + elemento + "_" + Math.min(String(q+1),String(p+1)) + caminhoInterno[m] + Math.max(String(q+1),String(p+1))
                                                      + " + 2*B" + elemento + "*a" + elemento + "_" + Math.min(String(q+1),String(p+1)) + caminhoInterno[m] + Math.max(String(q+1),String(p+1))
                                    }

                                    if (p > q)
                                    {
                                        elemento = String(q+1) + String(p+1)
                                        
                                        temp1 = temp1 + " + 2*A" + elemento + "*a" + elemento + "_" + Math.min(String(p+1),String(q+1)) + caminhoInterno[m] + Math.max(String(p+1),String(q+1))
                                                      + " - 2*B" + elemento + "*b" + elemento + "_" + Math.min(String(p+1),String(q+1)) + caminhoInterno[m] + Math.max(String(p+1),String(q+1))
                                    
                                        temp2 = temp2 + " + 2*A" + elemento + "*b" + elemento + "_" + Math.min(String(p+1),String(q+1)) + caminhoInterno[m] + Math.max(String(p+1),String(q+1))
                                                      + " - 2*B" + elemento + "*a" + elemento + "_" + Math.min(String(p+1),String(q+1)) + caminhoInterno[m] + Math.max(String(p+1),String(q+1))
                                    }



                                    /* temp1 = temp1 + " - A" + Math.min(String(q+1), String(p+1)) + Math.max(String(q+1), String(p+1))
                                                  + "*b" + Math.min(String(q+1), String(p+1)) + Math.max(String(q+1), String(p+1)) 
                                                  + "_" + Math.min(String(p+1),String(q+1)) + caminhoInterno[m] + Math.max(String(p+1),String(q+1))
                                                  + " + B" + Math.min(String(q+1), String(p+1)) + Math.max(String(q+1), String(p+1))
                                                  + "*a" + Math.min(String(q+1), String(p+1)) + Math.max(String(q+1), String(p+1)) 
                                                  + "_" + Math.min(String(p+1),String(q+1)) + caminhoInterno[m] + Math.max(String(p+1),String(q+1))

                                    temp2 = temp2 + " - A" + Math.min(String(q+1), String(p+1)) + Math.max(String(q+1), String(p+1))
                                                    + "*a" + Math.min(String(q+1), String(p+1)) + Math.max(String(q+1), String(p+1))
                                                    + "_" + Math.min(String(p+1),String(q+1)) + caminhoInterno[m] + Math.max(String(p+1),String(q+1))
                                                    + " - B" + Math.min(String(q+1), String(p+1)) + Math.max(String(q+1), String(p+1))
                                                    + "*b" + Math.min(String(q+1), String(p+1)) + Math.max(String(q+1), String(p+1))
                                                    + "_" + Math.min(String(p+1),String(q+1)) + caminhoInterno[m] + Math.max(String(p+1),String(q+1)) */
                                }
                            }
                        }
                    }
                }

                //decaimentos
                for (var q=0; q<=N-1; q++)
                {
                    if (q !== p && document.getElementById("switchTP" + String(Math.min(p+1,q+1)) + String(Math.max(p+1,q+1)) ).checked)
                    {
                        if ( nivel[p].y > nivel[q].y && (rotaPopulacao.includes(q+1) || n === 0) )
                        {
                            var rotaInterna = ""

                            if (rotaPopulacao.includes(q+1))
                            {
                                if (rotaPopulacao.indexOf(q+1) === 2)
                                    rotaInterna = String(rotaPopulacao[0]) + String(rotaPopulacao[1])

                                if (rotaPopulacao.indexOf(q+1) === 1)
                                    rotaInterna = String(rotaPopulacao[2]) + String(rotaPopulacao[3])
                            }

                            pop = pop + " + Γ<sub>" + String(q+1) + String(p+1) + "</sub>ρ<sub>" + String(q+1) + String(q+1) + "</sub>" + 
                                    "<sup>(" + String(q+1) + rotaInterna + String(q+1) + ")</sup>"

                            temp1 = temp1 + " + Gamma" +  String(q+1) + String(p+1) + "*a" + String(q+1) + String(q+1) 
                                          + "_" + String(q+1) + rotaInterna + String(q+1)

                            if (temp2 !== "")
                                temp2 = temp2 + " + Gamma" +  String(q+1) + String(p+1) + "*b" + String(q+1) + String(q+1)
                                            + "_" + String(q+1) + rotaInterna + String(q+1)
                        }

                        if (nivel[q].y > nivel[p].y)
                        {
                            pop = pop + " &#x2212; Γ<sub>" + String(p+1) + String(q+1) + "</sub>ρ<sub>" + String(p+1) + String(p+1) + "</sub>"
                                    + "<sup>(" + rotaPopulacao + ")</sup>"

                            temp1 = temp1 + " - Gamma" +  String(p+1) + String(q+1) + "*a" + String(p+1) + String(p+1) 
                                          + "_" + rotaPopulacao

                            if (temp2 !== "")
                                temp2 = temp2 + " - Gamma" +  String(p+1) + String(q+1) + "*b" + String(p+1) + String(p+1)
                                            + "_" + rotaPopulacao
                        }
                    }
                }

                eqBloch = eqBloch + pop

                if (temp2 !== "")
                    eqBlochC = eqBlochC + temp1 + ";\n" + temp2 + ";\n"
                else
                    eqBlochC = eqBlochC + temp1 + ";\n"

                if (pop === "")
                    eqBloch = eqBloch + "0"

                eqBloch = eqBloch + "<br>"
            }
        
        eqBloch = eqBloch + "<br>"
        eqBlochC = eqBlochC + "\n"
    }

    //coerências
    for (var k=0; k<=N-1; k++)
    {
        for (var p=k; p<=N-1; p++)
        {
            temp1 = ""      //Parte real
            temp2 = ""      //Parte imaginária

            if (k !== p)
            {
                var vetIndices = Array.from({length: N}, (_, i) => i + 1)

                //n=2  => três ômegas
                for (var n=0; n<=4; n++)
                    for (var r=0; r<=permutacoes(removerElementos(vetIndices, k+1, p+1), n).length-1; r++)
                    {
                        var rotaCoerencia = String(k+1) + permutacoes(removerElementos(vetIndices, k+1, p+1), n)[r] + String(p+1)

                        j++

                        eqBloch = eqBloch + "dσ<sub>" + String(k+1) + String(p+1) + "</sub><sup>(" + rotaCoerencia + ")</sup>/dt = " + 
                                    "&#x2212; [i(" + indiceParaPares(rotaCoerencia, "+", "δ") + ") + γ<sub>" + String(k+1) + String(p+1) + 
                                    "</sub>]σ<sub>" + String(k+1) + String(p+1) + "</sub><sup>(" + rotaCoerencia + ")</sup>"

                        temp1 = "\t\t/*a" + String(k+1) + String(p+1) + "("
                                + rotaCoerencia + ")*/\n\t\tif (j==" + j + ") return "
                                + "+(" + indiceParaPares(rotaCoerencia, "+", "delta") + ")*" + "b" + String(k+1) + String(p+1) + "_" + rotaCoerencia
                                + " - gamma" + String(k+1) + String(p+1) + "*a" + String(k+1) + String(p+1) + "_" + rotaCoerencia

                        j++

                        temp2 = "\t\t/*b" + String(k+1) + String(p+1) + "("
                                + rotaCoerencia + ")*/\n\t\tif (j==" + j + ") return "
                                + "-(" + indiceParaPares(rotaCoerencia, "+", "delta") + ")*" + "a" + String(k+1) + String(p+1) + "_" + rotaCoerencia
                                + " - gamma" + String(k+1) + String(p+1) + "*b" + String(k+1) + String(p+1) + "_" + rotaCoerencia

                        for (var q=0; q<=N-1; q++)
                        {
                            if (q !== p && q !== k && document.getElementById( "switchFR" + String(Math.min(q+1,p+1)) + String(Math.max(q+1,p+1)) ).checked)
                            {
                                for (var h=0; h<=4; h++)
                                {
                                    var vetIndices2 = Array.from({length: N}, (_, i) => i + 1)

                                    var caminhoInterno = permutacoes(removerElementos(vetIndices2, k+1, q+1), h)

                                    for (var m=0; m<=caminhoInterno.length-1; m++)
                                    {
                                        if ( (String(k+1) + caminhoInterno[m] + String(q+1) + String(p+1)).includes(rotaCoerencia) 
                                          && ( ( (caminhoInterno[m]).length === rotaCoerencia.length - 1 )  || ( (caminhoInterno[m]).length === rotaCoerencia.length - 3 ) ) )
                                        {
                                            eqBloch = eqBloch + " &#x2212; iΩ<sub>" + String(q+1) + String(p+1) + "</sub>σ<sub>" + String(k+1) + String(q+1) + "</sub> <sup>(" + String(k+1) + caminhoInterno[m] + String(q+1) + ")</sup>"

                                            //Parte real
                                            var sinal1 = " +", sinal2 = " +"

                                            var rota2 = elemMinMaxRota(k+1, caminhoInterno[m], q+1)

                                            if (trocarSinal(k, q))
                                            {
                                                sinal1 = " -"
                                                rota2 = elemMinMaxRota(k+1, inverterString(caminhoInterno[m]), q+1)
                                            }
                    
                                            if (trocarSinal(q, p)) 
                                                sinal2 = " -"

                                            temp1 = temp1 + sinal1 + " A" + elemMinMax(q+1, p+1) + "*b" + elemMinMax(k+1, q+1)
                                                          + "_" + rota2
                                                          + sinal2 + " B" + elemMinMax(q+1, p+1) + "*a" + elemMinMax(k+1, q+1)
                                                          + "_" + rota2

                                            //Parte imaginária
                                            sinal1 = " -", sinal2 = " +"
   
                                            if (trocarSinal2(k, q, q, p))
                                                sinal2 = " -"

                                            temp2 = temp2 + sinal1 + " A" + elemMinMax(q+1, p+1) + "*a" + elemMinMax(k+1, q+1)
                                                                   + "_" + rota2
                                                          + sinal2 + " B" + elemMinMax(q+1, p+1) + "*b" + elemMinMax(k+1, q+1)
                                                                   + "_" + rota2
                                        }
                                    }
                                }
                            }

                            if (q !== p && q !== k && document.getElementById( "switchFR" + String(Math.min(k+1,q+1)) + String(Math.max(k+1,q+1)) ).checked)
                            {
                                for (var h=0; h<=4; h++)
                                {
                                    var vetIndices3 = Array.from({length: N}, (_, i) => i + 1)

                                    var caminhoInterno = permutacoes(removerElementos(vetIndices3, q+1, p+1), h)

                                    for (var m=0; m<=caminhoInterno.length-1; m++)
                                    {
                                        if ( (String(k+1) + String(q+1) + caminhoInterno[m] + String(p+1)).includes(rotaCoerencia) 
                                          && ( ( (caminhoInterno[m]).length === rotaCoerencia.length - 1 )  || ( (caminhoInterno[m]).length === rotaCoerencia.length - 3 ) ) )
                                        {
                                            eqBloch = eqBloch + " + iΩ<sub>" + String(k+1) + String(q+1) + "</sub>σ<sub>" + String(q+1) + String(p+1) + "</sub> <sup>(" + String(q+1) + caminhoInterno[m] + String(p+1) + ")</sup>"

                                            //Parte real
                                            var sinal1 = " -", sinal2 = " -"

                                            var rota3 = elemMinMaxRota(q+1, caminhoInterno[m], p+1)

                                            if (trocarSinal(q, p))
                                            {
                                                sinal1 = " +"
                                                rota3 = elemMinMaxRota(q+1, inverterString(caminhoInterno[m]), p+1)
                                            }

                                            if (trocarSinal(k, q))
                                                sinal2 = " +"

                                            temp1 = temp1 + sinal1 + " A" + elemMinMax(k+1, q+1) + "*b" + elemMinMax(q+1, p+1) //Erro aqui, nos elem. de 4 índices (abcd)
                                                                   + "_" + rota3
                                                          + sinal2 + " B" + elemMinMax(k+1, q+1) + "*a" + elemMinMax(q+1, p+1)
                                                                   + "_" + rota3

                                            //Parte imaginária
                                            sinal1 = " +", sinal2 = " -"

                                            if (trocarSinal2(k, q, q, p))
                                                sinal2 = " +"

                                            temp2 = temp2 + sinal1 + " A" + elemMinMax(k+1, q+1) + "*a" + elemMinMax(q+1, p+1)
                                                                   + "_" + rota3
                                                          + sinal2 + " B" + elemMinMax(k+1, q+1) + "*b" + elemMinMax(q+1, p+1)
                                                                   + "_" + rota3
                                        }
                                    }
                                }
                            }
                        }

                        //Termos do tipo i*Omega23*(rho33 - rho22)
                        if ( document.getElementById( "switchFR" + String(Math.min(k+1,p+1)) + String(Math.max(k+1,p+1)) ).checked )
                        {
                            for (var h=0; h<=4; h=h+2)
                            {
                                var vetIndices4 = Array.from({length: N}, (_, i) => i + 1)

                                var caminhoInterno = permutacoes(removerElementos(vetIndices4, p+1, p+1), h)

                                var temp1b = "", temp2b = "";

                                for (var m=0; m<=caminhoInterno.length-1; m++)
                                {
                                    if ( (String(k+1) + String(p+1) + caminhoInterno[m] + String(p+1)).includes(rotaCoerencia) 
                                        && ( ( (caminhoInterno[m]).length === rotaCoerencia.length - 1 )  || ( (caminhoInterno[m]).length === 0 ) ) )
                                    {
                                        eqBloch = eqBloch + " + iΩ<sub>" + String(k+1) + String(p+1) + "</sub>[" + "ρ<sub>" + String(p+1) + String(p+1) 
                                                + "</sub><sup>(" + String(p+1) + caminhoInterno[m] + String(p+1) + ")</sup> &#x2212; "

                                        if (h !== 0)
                                            temp1 = temp1 + " - A" + String(k+1) + String(p+1) 
                                                           + "*(b" + String(p+1) + String(p+1) + "_" + String(p+1) + caminhoInterno[m] + String(p+1) + " - "

                                        temp1b = " - B" + String(k+1) + String(p+1)
                                                + "*(a" + String(p+1) + String(p+1) + "_" + String(p+1) + caminhoInterno[m] + String(p+1) + " - "

                                        temp2 = temp2 + " + A" + String(k+1) + String(p+1)
                                                        + "*(a" + String(p+1) + String(p+1) + "_" + String(p+1) + caminhoInterno[m] + String(p+1) + " - "

                                        if (h !== 0)
                                            temp2b = " - B" + String(k+1) + String(p+1)
                                                     + "*(b" + String(p+1) + String(p+1) + "_" + String(p+1) + caminhoInterno[m] + String(p+1) + " - "
                                        else temp2b = ""
                                    }
                                }

                                var vetIndices5 = Array.from({length: N}, (_, i) => i + 1)

                                var caminhoInterno = permutacoes(removerElementos(vetIndices5, k+1, k+1), h)

                                for (var m=0; m<=caminhoInterno.length-1; m++)
                                {
                                    if ( (String(k+1) + caminhoInterno[m] + String(k+1) + String(p+1)).includes(rotaCoerencia) 
                                        && ( ( (caminhoInterno[m]).length === rotaCoerencia.length - 1 )  || ( (caminhoInterno[m]).length === 0 ) ) )
                                    {
                                        eqBloch = eqBloch + "ρ<sub>" + String(k+1) + String(k+1) 
                                                + "</sub><sup>(" + String(k+1) + caminhoInterno[m] + String(k+1) + ")</sup>]"

                                        if (h !== 0)
                                            temp1 = temp1 + "b" + String(k+1) + String(k+1) 
                                                      + "_" + String(k+1) + caminhoInterno[m] + String(k+1) + ")"

                                        temp1b = temp1b + "a" + String(k+1) + String(k+1)
                                                        + "_" + String(k+1) + caminhoInterno[m] + String(k+1) + ")"

                                        temp2 = temp2 + "a" + String(k+1) + String(k+1)
                                                        + "_" + String(k+1) + caminhoInterno[m] + String(k+1) + ")"

                                        if (h !== 0)
                                            temp2b = temp2b + "b" + String(k+1) + String(k+1)
                                                        + "_" + String(k+1) + caminhoInterno[m] + String(k+1) + ")"
                                    }
                                }

                                temp1 = temp1 + temp1b
                                temp2 = temp2 + temp2b
                            }
                        }

                        eqBloch = eqBloch + "<br>"
                        eqBlochC = eqBlochC + temp1 + ";\n" + temp2 + ";\n"
                    }
            }

            if (p !== N - 1)
            {
                eqBloch = eqBloch + "<br>"
                eqBlochC = eqBlochC + "\n"
            }
        }
    }

    document.getElementById("equacoesBloch").innerHTML = eqBloch
}







//Gera as equações de Bloch na linguagem C, com partes real e imaginária separadas (sem mistura de ondas)
function gerarEquacoesBlochRealImaginaria()
{
    eqBloch = ""
    var j = -1;

    for (var k=0; k<=Number(Nmax)-1; k++)
        nivel[k].decaimentos = 0

    //populações
    for (var p=0; p<=N-1; p++)
    {
        j++;
        eqBloch = eqBloch + "\t\t/*a" + String(p+1) + String(p+1) + "*/ if (j == " + j + ") return"

        var pop = ""

        for (var q=0; q<=N-1; q++)
        {
            if (q !== p && document.getElementById("switchFR" + String(Math.min(p+1,q+1)) + String(Math.max(p+1,q+1)) ).checked)
            {
                if (p < q)
                {
                    var elemento = String(p+1) + String(q+1)

                    pop = pop + " - 2*a" + elemento + "*B" + elemento
                              + " + 2*b" + elemento + "*A" + elemento
                }
                
                if (p > q)
                {
                    var elemento = String(q+1) + String(p+1)

                    pop = pop + " + 2*a" + elemento + "*B" + elemento
                                      + " - 2*b" + elemento + "*A" + elemento
                }                
            }
        }

        //decaimentos
        for (var q=0; q<=N-1; q++)
        {
            if (q !== p && document.getElementById("switchTP" + String(Math.min(p+1,q+1)) + String(Math.max(p+1,q+1)) ).checked)
            {
                if (nivel[p].y > nivel[q].y)
                {
                    pop = pop + " + Gamma" + String(q+1) + String(p+1) + "*a" + String(q+1) + String(q+1)
                }

                if (nivel[q].y > nivel[p].y)
                {
                    pop = pop + " - Gamma" + String(p+1) + String(q+1) + "*a" + String(p+1) + String(p+1)
                    nivel[p].decaimentos++;
                }
            }
        }

        eqBloch = eqBloch + pop;

        if (pop === "")
            eqBloch = eqBloch + " 0"

        if (p < N-1)
            eqBloch = eqBloch + ";\n"
    }

    //coerências
    for (var k=0; k<=N-1; k++)
    {
        for (var p=k; p<=N-1; p++)
        {
            if (k !== p)
            {
                //Parte real
                j++;
                eqBloch = eqBloch + "\t\t/*a" + String(k+1) + String(p+1) + "*/ if (j == " + j + ") return "

                eqBloch = eqBloch + "-gamma"   + String(k+1) + String(p+1) + "*a" + String(k+1) + String(p+1) + 
                                    " - delta" + String(p+1) + String(k+1) + "*b" + String(k+1) + String(p+1)                

                for (var q=0; q<=N-1; q++)
                {
                    if (q !== p && q !== k && document.getElementById( "switchFR" + String(Math.min(q+1,p+1)) + String(Math.max(q+1,p+1)) ).checked)
                    {
                        var sinal1 = " +", sinal2 = " +"
                        if (trocarSinal(q, p))
                            sinal1 = " -"

                        if (trocarSinal(k, q)) 
                            sinal2 = " -"                        

                        eqBloch = eqBloch + sinal1 + " a" + elemMinMax(k+1, q+1) + "*B" + elemMinMax(q+1, p+1)
                                          + sinal2 + " b" + elemMinMax(k+1, q+1) + "*A" + elemMinMax(q+1, p+1)
                    }

                    if (q !== p && q !== k && document.getElementById( "switchFR" + String(Math.min(k+1,q+1)) + String(Math.max(k+1,q+1)) ).checked)
                    {
                        var sinal1 = " -", sinal2 = " -"
                        if (trocarSinal(k, q))
                            sinal1 = " +"

                        if (trocarSinal(q, p))
                            sinal2 = " +"

                        eqBloch = eqBloch + sinal1 + " a" + elemMinMax(q+1, p+1) + "*B" + elemMinMax(k+1, q+1)
                                          + sinal2 + " b" + elemMinMax(q+1, p+1) + "*A" + elemMinMax(k+1, q+1)
                    }
                }

                if ( document.getElementById( "switchFR" + String(Math.min(k+1,p+1)) + String(Math.max(k+1,p+1)) ).checked )
                {
                    eqBloch = eqBloch + " - B" + String(k+1) + String(p+1) + "*(" + "a" + String(p+1) + String(p+1) + " - a" + String(k+1) + String(k+1) + ")"
                }

                eqBloch = eqBloch + ";\n"

                //Parte imaginária
                j++;
                eqBloch = eqBloch + "\t\t/*b" + String(k+1) + String(p+1) + "*/ if (j == " + j + ") return "

                eqBloch = eqBloch + "-gamma"   + String(k+1) + String(p+1) + "*b" + String(k+1) + String(p+1) + 
                                    " + delta" + String(p+1) + String(k+1) + "*a" + String(k+1) + String(p+1)                

                for (var q=0; q<=N-1; q++)
                {
                    if (q !== p && q !== k && document.getElementById( "switchFR" + String(Math.min(q+1,p+1)) + String(Math.max(q+1,p+1)) ).checked)
                    {
                        var sinal1 = " -", sinal2 = " +";

                        if (trocarSinal2(k, q, q, p))
                            sinal2 = " -"

                        eqBloch = eqBloch + sinal1 + " a" + elemMinMax(k+1, q+1) + "*A" + elemMinMax(q+1, p+1)
                                          + sinal2 + " b" + elemMinMax(k+1, q+1) + "*B" + elemMinMax(q+1, p+1)
                    }

                    if (q !== p && q !== k && document.getElementById( "switchFR" + String(Math.min(k+1,q+1)) + String(Math.max(k+1,q+1)) ).checked)
                    {
                        var sinal1 = " +", sinal2 = " -"
                        if (trocarSinal2(k, q, q, p))
                            sinal2 = " +"

                        eqBloch = eqBloch + sinal1 + " a" + elemMinMax(q+1, p+1) + "*A" + elemMinMax(k+1, q+1)
                                          + sinal2 + " b" + elemMinMax(q+1, p+1) + "*B" + elemMinMax(k+1, q+1)
                    }
                }

                if ( document.getElementById( "switchFR" + String(Math.min(k+1,p+1)) + String(Math.max(k+1,p+1)) ).checked )
                {
                    eqBloch = eqBloch + " + A" + String(k+1) + String(p+1) + "*(" + "a" + String(p+1) + String(p+1) + " - a" + String(k+1) + String(k+1) + ")"
                }
            }

            if (p !== N - 1)
                eqBloch = eqBloch + ";\n"
        }
    }

    eqBloch = eqBloch + ";"

    //document.getElementById("equacoesBloch").innerHTML = eqBloch
}



function elemMinMax(a, b)
{
    return String(Math.min(a, b)) + String(Math.max(a, b))
}

function elemMinMaxRota(a, rota, b)
{
    return String(Math.min(a, b)) + rota + String(Math.max(a, b))
}

function inverterString(str)
{
    return str.split("").reverse().join("")
}

function trocarSinal(a, b)
{
    if (a < b) return false;
    if (a > b) return true;
}

function trocarSinal2(a1, b1, a2, b2)
{
    if (!trocarSinal(a1, b1) && !trocarSinal(a2, b2)) return false;
    if (trocarSinal(a1, b1)  &&  trocarSinal(a2, b2)) return false;
    if (trocarSinal(a1, b1)  ||  trocarSinal(a2, b2)) return true;
}


var xM, yM;

function posicaoMouse()
{
    xM = event.offsetX;
    yM = event.offsetY;
  
    if (mobile)
    {
       var rect = canvas.getBoundingClientRect();
       xM = event.touches[0].clientX - rect.left;
       yM = event.touches[0].clientY - rect.top;
       canvas.addEventListener("touchmove",   function(event) {event.preventundefined()})
    }
    //console.log(xM + ", " + yM)

    var cont = 0

    for (var i=0; i<= N-1; i++)
        if ( Math.abs( xM - nivel[i].x - 0.5*compNiveis ) < 0.5*compNiveis && Math.abs( yM - nivel[i].y ) < 15 )
        {
            cont++
        }

    if (cont === 0)
    {
        canvas.style.cursor = "[object Object]"
    }
    else
    {
        canvas.style.cursor = "move"
    }

    //console.log(xM)
    if (moverSistema && xM < Math.max(selecao.inicioX, selecao.fimX) && xM > Math.min(selecao.inicioX, selecao.fimX) && yM < Math.max(selecao.inicioY, selecao.fimY) && yM > Math.min(selecao.inicioY, selecao.fimY))
    {
        canvas.style.cursor = "move"
        //console.log("move")
    }
}

var selecionar = false;

function pressMouse()
{  
    if (mobile)
    {
       var rect = canvas.getBoundingClientRect();
       xM = event.touches[0].clientX - rect.left;
       yM = event.touches[0].clientY - rect.top;
       canvas.addEventListener("touchmove",   function(event) {event.preventundefined()})
    }

    var cont = 0
    
    for (var i=0; i<= N-1; i++)
	    if ( Math.abs( xM - nivel[i].x - 0.5*compNiveis ) < 0.5*compNiveis && Math.abs( yM - nivel[i].y ) < 15 )
            if (!moverSistema)
            {
                nivel[i].movel = true
                nivel[i].cor = nivel[i].cor.replace(", 1.0", ', 0.3')
                nivel[i].posXRelativa = xM - nivel[i].x
                nivel[i].posYRelativa = yM - nivel[i].y
                cont++
            }
    
    if (cont === 0)
    {
        selecionar = true
        //canvas.style.cursor = "grabbing"
    }
    else
    {
        selecionar = false
    }

    if (moverSistema)
    {
        moverSistema2 = true
        moverSistema = false
    }
}

var moverSistema = false, moverSistema2 = false;

function saiuMouse()
{
    for (var i=0; i<= N-1; i++)
    {
	    nivel[i].movel = false
        nivel[i].cor = nivel[i].cor.replace(", 0.3", ', 1.0')
    }

    selecionar = false

    chaveSelecionar = true
    canvas.style.cursor = "grab"

    if (numSelecionados > 0)
    {
        moverSistema = true
    }

    if (moverSistema2)
    {
        moverSistema = false
        moverSistema2 = false
        selecao.inicioX = 0
        selecao.inicioY = 0
        selecao.fimX = 0
        selecao.fimY = 0
    }
}



function updateCheckbox()
{
    for (var k=0; k<=N-1; k++)
    {
        for (var p=k+1; p<=N-1; p++)
        {
            if (document.getElementById("switchFR" + String(k+1) + String(p+1)).checked)
                eval("mostrar.FR" + String(k+1) + String(p+1) + " = true")
            else
                eval("mostrar.FR" + String(k+1) + String(p+1) + " = false")
        }

        for (var p=k+1; p<=N-1; p++)
        {
            if (document.getElementById("switchTP" + String(k+1) + String(p+1)).checked)
                eval("mostrar.TP" + String(k+1) + String(p+1) + " = true")
            else
                eval("mostrar.TP" + String(k+1) + String(p+1) + " = false")
        }
    }
}





function setPosicoes()
{
    for (var k=0; k<=N-1; k++)
    {
        setGetParam("x" + Number(k+1), nivel[k].x)
        setGetParam("y" + Number(k+1), nivel[k].y)
    }
}



/*Casos particulares ******************/
function doisNiveis()
{
    N = 2

    nivel[0].x = 0.5*Lx - 0.5*compNiveis
    nivel[0].y = 0.7*Ly

    nivel[1].x = nivel[0].x
    nivel[1].y = nivel[0].y - 200

    gerarCheckbox()
    document.getElementById("switchFR12").checked = true
    document.getElementById("switchTP12").checked = true

    setarVariaveis()
}

function tresNiveisLambda()
{
    N = 3

    nivel[0].x = 0.35*Lx - 0.5*compNiveis
    nivel[0].y = 0.7*Ly

    nivel[1].x = 0.5*Lx - 0.5*compNiveis
    nivel[1].y = nivel[0].y - 300

    nivel[2].x = 0.65*Lx - 0.5*compNiveis
    nivel[2].y = nivel[0].y - 50

    gerarCheckbox()
    document.getElementById("switchFR12").checked = true
    document.getElementById("switchFR23").checked = true

    document.getElementById("switchTP12").checked = true
    document.getElementById("switchTP23").checked = true

    setarVariaveis()

}

function tresNiveisCascata()
{
    N = 3

    nivel[0].x = 0.5*Lx - 0.5*compNiveis
    nivel[0].y = 0.7*Ly

    nivel[1].x = nivel[0].x
    nivel[1].y = nivel[0].y - 200

    nivel[2].x = nivel[0].x
    nivel[2].y = nivel[0].y - 400

    gerarCheckbox()
    document.getElementById("switchFR12").checked = true
    document.getElementById("switchFR23").checked = true

    document.getElementById("switchTP12").checked = true
    document.getElementById("switchTP23").checked = true

    setarVariaveis()
}

function tresNiveisV()
{
    N = 3

    nivel[0].x = 0.35*Lx - 0.5*compNiveis
    nivel[0].y = 0.4*Ly

    nivel[1].x = 0.5*Lx - 0.5*compNiveis
    nivel[1].y = nivel[0].y + 200

    nivel[2].x = 0.65*Lx - 0.5*compNiveis
    nivel[2].y = nivel[0].y - 50

    gerarCheckbox()
    document.getElementById("switchFR12").checked = true
    document.getElementById("switchFR23").checked = true

    document.getElementById("switchTP12").checked = true
    document.getElementById("switchTP23").checked = true

    setarVariaveis()

}
/*Casos particulares ******************/



function parametros()
{
    N = Number(document.getElementById("N").innerHTML)
    tempoIntegracao = Number(document.getElementById("tempoIntegracao").innerHTML)
    larguraEspectro = Number(document.getElementById("larguraEspectro").innerHTML)
    passoTemporal = Number(document.getElementById("passoTemporal").innerHTML)
    passoDessintonia = Number(document.getElementById("passoDessintonia").innerHTML)

    setRangeSliders()
    limitarValores()
}

paramEdit()

evitarCaracNN("parametros")



let cameraOffset = { x: window.innerWidth/2, y: window.innerHeight/2 }
let cameraZoom = 1
let MAX_ZOOM = 5
let MIN_ZOOM = 0.1
let SCROLL_SENSITIVITY = 0.0005

canvas.addEventListener( 'wheel', (e) => adjustZoom(e.deltaY*SCROLL_SENSITIVITY))

function adjustZoom(zoomAmount, zoomFactor)
{
    //if (!isDragging)
    {
        if (zoomAmount)
        {
            cameraZoom += zoomAmount
        }
        else if (zoomFactor)
        {
            console.log(zoomFactor)
            cameraZoom = zoomFactor*lastZoom
        }
        
        cameraZoom = Math.min( cameraZoom, MAX_ZOOM )
        cameraZoom = Math.max( cameraZoom, MIN_ZOOM )
        
        console.log(zoomAmount)
    }
}




chaveSelecionar = true
var houveSelecao = false
var distX = [], distY = []


var selecao = {
    inicioX: 0,
    inicioY: 0,
    fimX: 0,
    fimY: 0
}

var ct = 0;
function updateSimulation()
{
    simulation.clear();
    ctx = simulation.context;

    /* ctx.translate( window.innerWidth / 2, window.innerHeight / 2 )
    ctx.scale(cameraZoom, cameraZoom)
    ctx.translate( -window.innerWidth / 2, -window.innerHeight / 2 )
    cameraZoom = 1 */

    parametros()

    if (ct === 0)
    {
        setarVariaveis()
        ctx.scale(escalaRender, escalaRender);
        ct = 1
    }    

    for (var i=0; i<= N-1; i++)
        if (nivel[i].movel)
        {
            nivel[i].x = xM - nivel[i].posXRelativa
            nivel[i].y = yM - nivel[i].posYRelativa
            nivel[i].xi = nivel[i].x
            nivel[i].yi = nivel[i].y
        }

    if (selecionar && chaveSelecionar)
    {
        for (var i=0; i<= N-1; i++)
        {
            distX[i] = xM - nivel[i].x - 0.5*compNiveis
            distY[i] = yM - nivel[i].y
        }

        chaveSelecionar = false

        if (!moverSistema2)
        {
            selecao.inicioX = xM
            selecao.inicioY = yM
        }
    }

    numSelecionados = 0

    for (var k=0; k<=N-1; k++)
        if (nivel[k].selecionado)
            numSelecionados++

    if ( (selecionar || numSelecionados > 0) && !moverSistema2) 
    {
        //canvas.style.cursor = "grabbing"
        //canvas.style.cursor = "[object Object]"

        if (selecionar)
        {
            selecao.fimX = xM;
            selecao.fimY = yM;
        }

        //Desenha retângulo tracejado
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";        
        ctx.rect(selecao.inicioX, selecao.inicioY, selecao.fimX - selecao.inicioX, selecao.fimY - selecao.inicioY);
        ctx.stroke();

        ctx.setLineDash([]);
    }
    if (!selecionar && numSelecionados === 0)
    {
        selecao.inicioX = 0
        selecao.inicioY = 0
        selecao.fimX = 0
        selecao.fimY = 0
    }

    if (moverSistema)
    {
        xMi = xM
        yMi = yM
    }

    if (moverSistema2 && xM <= Math.max(selecao.inicioX + xM - xMi, selecao.fimX + xM - xMi) && xM >= Math.min(selecao.inicioX + xM - xMi, selecao.fimX + xM - xMi) && yM <= Math.max(selecao.inicioY + yM - yMi, selecao.fimY + yM - yMi) && yM >= Math.min(selecao.inicioY + yM - yMi, selecao.fimY + yM - yMi))
    {
        for (var i=0; i<= N-1; i++)
            if (nivel[i].selecionado)
            {
                nivel[i].x = xM - distX[i] - 0.5*compNiveis
                nivel[i].y = yM - distY[i]
            }

        canvas.style.cursor = "move"

        //Desenha retângulo tracejado se movendo com xM e yM
        ctx.beginPath();
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";
        //console.log(xM, yM, selecao.fimX, selecao.fimY)
        ctx.rect(selecao.inicioX + xM - xMi, selecao.inicioY + yM - yMi, selecao.fimX - selecao.inicioX, selecao.fimY - selecao.inicioY);
        ctx.stroke();
        
        ctx.setLineDash([]);
    }

    drawNiveis()
    drawDecaimentos()
    drawFrequenciasRabi()
      
    wTgd("grey", Lx-83, Ly-5)    
}

//Bugs/fazer

// Traduzir código em C para inglês
// Bug quando nível é alterado após um decaimento ser configurado
// Bug checkbox/eq Bloch quando abre configuração salva ou quando abre a página
// Informar notação sigma, rho, omega, delta e Omega
// Bug quando o nível está desacoplado do campo
// Inserir download para IDE recomendada

// adicionar linguagem para equações de Bloch (C, Maple, LaTeX)
// adicionar opção de igualar níveis
// opção níveis numérico ou abc
// melhorar posições das transições e dos decaimentos
// informar se níveis são degenerados
// Ajustar dessintonias
// No tempo, rodar em js e apresentar os gráficos
// Implementar checkbox para mostrar qual transição está varrendo
// Implementar função zoom
// Resolver sistema estacionário numericamente