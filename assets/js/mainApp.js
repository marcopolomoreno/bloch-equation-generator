//Seleciona elemento clicado
function selectText(id){
	var sel, range;
	var el = document.getElementById(id); //get element id
	if (window.getSelection && document.createRange) { //Browser compatibility
	  sel = window.getSelection();
	  if(sel.toString() == ''){ //no text selection
		 window.setTimeout(function(){
			range = document.createRange(); //range object
			range.selectNodeContents(el); //sets Range
			sel.removeAllRanges(); //remove all ranges from selection
			sel.addRange(range);//add Range to a Selection.
		},1);
	  }
	}else if (document.selection) { //older ie
		sel = document.selection.createRange();
		if(sel.text == ''){ //no text selection
			range = document.body.createTextRange();//Creates TextRange object
			range.moveToElementText(el);//sets Range
			range.select(); //make selection.
		}
	}
}

//Coloca primeira letra da string em maiúsculo
function firtLettG(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}




function setGetParam(key,value) {
    if (history.pushState) {
      var params = new URLSearchParams(window.location.search);
      params.set(key, value);
      var newUrl = window.location.origin 
            + window.location.pathname 
            + '?' + params.toString();
      window.history.pushState({path:newUrl},'',newUrl);
    }
}



isOnline = true


if(mobile || !isOnline)
{
    document.getElementById("citacao").remove()
    document.getElementById("comoCitar").remove()
}

function revelar()
{
    var x = document.getElementById("citacao");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}


if (!mobile && isOnline)
    document.getElementById("dataAtual").innerHTML = dataAtualFormatada();

function dataAtualFormatada() {
    var data = new Date(),
        dia = data.getDate().toString(),
        diaF = (dia.length == 1) ? '0' + dia : dia,
        mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
        mesF = (mes.length == 1) ? '0' + mes : mes,
        anoF = data.getFullYear();
    return diaF + "/" + mesF + "/" + anoF;
}





// Problema da linha inferior dos Iphones e Ipads sem botão home
if (isMobile.iOS())
{
    var linhaInferior = Number(getComputedStyle(document.documentElement).getPropertyValue("--sab").replace("px", ""))

    if (linhaInferior > 0)
    {
        document.getElementById("barraInferior").style.marginBottom = "20px"
    }
}



if (isIpad.ipad())
{
    var linhaInferior = Number(getComputedStyle(document.documentElement).getPropertyValue("--sab").replace("px", ""))

    if (linhaInferior > 0)
    {
        document.getElementById("barraInferior").style.height = "60px"
    }
}






//Puxa os valores da url, caso existam
for (var k=0; k<=param.length-1; k++)
    if (urlParams.get(param[k]) !== null)
    {
        document.getElementById(param[k]).innerHTML = Number(urlParams.get(param[k]))  //window[param[k]]
        document.getElementById("range" + primeiraLetraMaiuscula(param[k])).value = Number(urlParams.get(param[k])) //window[param[k]]
    }
        
//Puxa os configs (checkbox, etc) da url, caso existam
for (var chave in mostrar)
    if (mostrar.hasOwnProperty(chave))
        if (tf(urlParams.get(chave)) !== undefined)
        {
            mostrar[chave] = tf(urlParams.get(chave))  //apenas true/false
            document.getElementById("switch" + primeiraLetraMaiuscula(chave)).checked = mostrar[chave]
        }
            






/* Salvar simulação no localStorage --------------------------------*/
/* function recuperarLista()
{
    armazenado = JSON.parse( localStorage.getItem(simString) );

    document.getElementById("listaConfig").innerHTML = ""

    if (armazenado === null)
    {
        document.getElementById("semSimulacoes").innerHTML = "Sem simulações salvas."

        if (document.documentElement.lang === "en")
            document.getElementById("semSimulacoes").innerHTML = "No saved simulations."

        if (document.documentElement.lang === "es")
            document.getElementById("semSimulacoes").innerHTML = "Sin simulaciones guardadas."
    }
    else
    {
        document.getElementById("semSimulacoes").innerHTML = ""

        for (var k=0; k<=armazenado.nome.length-1; k++)
        {
            var li = document.createElement("li");
            url = new URL(armazenado.url[k])
            li.innerHTML = '<span onclick="window.location.replace(\'' + url.toString() + '\')">' + armazenado.nome[k] + '</span>' + 
                           '<span onclick="this.parentElement.style.display = \'none\';apagarElementoAppLocalStorage(' + k + ')" class="deletarSim"> \u00D7 </span>'
            document.getElementById("listaConfig").appendChild(li);
        }
    }
} */


function criarItem() 
{
    armazenado = JSON.parse( localStorage.getItem(simString) );
    var tamanhoArrayApp;

    if ( armazenado !== null )
    {
        for (var k=0; k<=armazenado.nome.length-1; k++)
        {
            nomeSim.nome[k] = armazenado.nome[k];
            nomeSim.url[k] = armazenado.url[k];
        }

        tamanhoArrayApp = armazenado.nome.length + 1;
    }
    else
    {
        tamanhoArrayApp = 1;
    }

    nomeSim.nome[tamanhoArrayApp-1] = document.getElementById("inputSalvarSim").value
    nomeSim.url[tamanhoArrayApp-1] = window.location.href

    localStorage.setItem( simString, JSON.stringify(nomeSim) );
    recuperarLista()
}


function apagarElementoAppLocalStorage(k)
{
    armazenado.nome.splice(k, 1)
    armazenado.url.splice(k, 1)

    nomeSim.nome.splice(k, 1)
    nomeSim.url.splice(k, 1)

    for (var p=0; p<=armazenado.nome.length-1; p++)
    {
        nomeSim.nome[p] = armazenado.nome[p];
        nomeSim.url[p] = armazenado.url[p];
    }    

    localStorage.setItem( simString, JSON.stringify(nomeSim) );
}

/* var btnSalvar = document.getElementById("inputSalvarSim");
btnSalvar.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    //alert('Simulação salva com sucesso!')
    if (document.getElementById("btnSalvar").style.display === "none")
        document.getElementById("btnRenomear").click();
    else
        document.getElementById("btnSalvar").click();
  }
}); */
/* Salvar simulação no localStorage --------------------------------*/



/* Link para datashow/slide --------------------------------*/
function linkPPT(larg, alt)
{
    var linkPPT;

    var caminho;
    
    if (larg === undefined)
        larg = 600

    if (alt === undefined)
        alt = 450
    
    caminho = "modo=ppt&Lx=" + larg + "&Ly=" + alt

    if ((window.location.href).includes("?"))
    {
        linkPPT = window.location.href + "&" + caminho
    }
    else
    {
        linkPPT = window.location.href + "?" + caminho
    }



    if (document.getElementById("linkPPT").innerHTML === "")
    {
        document.getElementById("linkPPT").classList.add("bloco")
        document.getElementById("linkPPT").classList.add("item")

        document.getElementById("linkPPT").innerHTML = "Link para slide:<br>" + linkPPT
    }            
    else
    {
        document.getElementById("linkPPT").classList.remove("bloco")
        document.getElementById("linkPPT").classList.remove("item")

        document.getElementById("linkPPT").innerHTML = ""
    }

    navigator.clipboard.writeText(linkPPT);    
}
/* Link para datashow/slide --------------------------------*/




//preenche vetor config
var p=0;
for (var chave in mostrar)
    if (mostrar.hasOwnProperty(chave))
    {
        config[p] = chave
        p++
    }



function resetarTudo()
{
    window.history.pushState({}, "", document.location.href.split("?")[0]);
    window.location.reload()
}



function adequarBarraInferior()
{
    if (dispositivo() === "smartphone" && orientacao() === "retrato")
    {
        var all = document.getElementById("barraInferior").children.length
        for (var k=0; k<=all-1; k++)
        {
            if (document.getElementById("barraInferior").children[k].className !== "btn-group dropup")
            {
                document.getElementById("barraInferior").children[k].children[1].style.display = "none";
            }     
                       
            else
            {
                document.getElementById("barraInferior").children[k].children[0].children[1].style.display = "none";
                //document.getElementById("barraInferior").children[k].children[0].style.marginTop = "10px"
            }
        }
    }

    if (dispositivo() === "smartphone" && orientacao() === "paisagem")
    {
        var all = document.getElementById("barraInferior").children.length
        for (var k=0; k<=all-1; k++)
        {
            if (document.getElementById("barraInferior").children[k].className !== "btn-group dropup")
            {
                document.getElementById("barraInferior").children[k].children[1].style.display = "flex";
                //document.getElementById("barraInferior").children[k].children[0].style.marginTop = "5px"
            }
                
            else
            {
                document.getElementById("barraInferior").children[k].children[0].children[1].style.display = "flex";
                //document.getElementById("barraInferior").children[k].children[0].style.marginTop = ""
            }
        }
    }

    
}

if (document.getElementsByClassName("dropup")[0] !== undefined)
    document.getElementsByClassName("dropup")[0].children[0].style.marginTop = "1px"

if (document.getElementsByClassName("dropup")[1] !== undefined)
    document.getElementsByClassName("dropup")[1].children[0].style.marginTop = "1px"

function mudarOrientacao(opcao)
{
    adequarDispositivo()
    adequarBarraInferior()

    if (opcao === "int-michelson")
    {
        Lx = largura
        Ly = altura
    }

    if (opcao === "armadilha-atomos")
    {
        Lx = L
        Ly = L
    }

    if (typeof fatorCorrecao === 'undefined')
        fatorCorrecao = 1

    if ( typeof rt !== 'undefined' && typeof escalaRender !== 'undefined' && opcao !== "pendulo-filmado")
    {
        rt.style.setProperty('--Lx', Lx + 'px')
        rt.style.setProperty('--Ly', Ly + 'px')
        document.getElementById("canvas").children[0].width = Lx*escalaRender*fatorCorrecao;
        document.getElementById("canvas").children[0].height = Ly*escalaRender*fatorCorrecao;
        ctx.scale(escalaRender, escalaRender);
    }

    if (opcao === "pendulo-filmado")
    {
        document.getElementById("canvas").style.width = String(Lx + "px");
        document.getElementById("canvas").style.height = String(Ly + "px");
    }
}


function mudarOrientacao3D()
{
    adequarDispositivo()
    adequarBarraInferior()

    camera.aspect = Lx / Ly
    camera.updateProjectionMatrix(); //Updating the display
    renderer.setSize(Lx, Ly)
}


// Função para verificar se a tecla pressionada é "Enter"
function verificarEnter(event) {
    if (event.keyCode === 13) { // 13 é o código da tecla "Enter"
        event.preventDefault(); // Impede o comportamento padrão do "Enter" (como enviar o formulário)

        if (document.getElementById("btnSalvar").parentElement.style.display === "none")
            document.getElementById('btnRenomear').click();
        else
            document.getElementById('btnSalvar').click();
    }
}


//Adição de código Android
