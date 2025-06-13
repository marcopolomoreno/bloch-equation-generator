//Coloca primeira letra da string em maiúsculo
function firstLettG(string)
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}


function paramEdit()
{
	for (var k=0; k<=variavel.length-1; k++)
    	document.getElementById(variavel[k]).contentEditable = true;
}

function limitarValores()
{
    for (var k=0; k<=variavel.length-1; k++)
    {
        if ( Number(document.getElementById(variavel[k]).innerHTML) > Number(document.getElementById("range" + firstLettG(variavel[k])).max) )
        {
            document.getElementById(variavel[k]).innerHTML = String(Number(document.getElementById("range" + firstLettG(variavel[k])).max).toFixed(0))
            document.getElementById("range" + firstLettG(variavel[k])).value = String(Number(document.getElementById("range" + firstLettG(variavel[k])).max).toFixed(0))
        }
            
        //if ( Number(document.getElementById(variavel[k]).innerHTML) < Number(document.getElementById("range" + firstLettG(variavel[k])).min) )
          //  document.getElementById(variavel[k]).innerHTML = document.getElementById("range" + firstLettG(variavel[k])).min
    }
}

function setRangeSliders()
{
    for (var k=0; k<=variavel.length-1; k++)
    {
        document.getElementById("range" + firstLettG(variavel[k])).value = window[variavel[k]]
    }
}


function evitarCaracNN(id)
{
    //Evita caracteres não numéricos nos labels dos parâmetros
    for (var k=0; k<=document.getElementById(id).querySelectorAll("label").length-1; k++)
        document.getElementById(id).querySelectorAll("label")[k].addEventListener("keypress", function (e) {
            var allowedChars = '0123456789.-';

            function contains(stringValue, charValue)
            {
                return stringValue.indexOf(charValue) > -1;
            }

            var invalidKey = e.key.length === 1 && !contains(allowedChars, e.key)
                    
            invalidKey && e.preventDefault();
        });
}



/* Transforma string em boolean --------------------------------*/
function tf(input) //trueFalse
{
    if (input === "true")    return true
    if (input === "false")   return false
}
/* Transforma string em boolean --------------------------------*/




function primeiraLetraMaiuscula(str) {
    if (typeof str !== 'string' || str.length === 0) {
        // Verifica se o argumento é uma string não vazia
        console.error('Por favor, forneça uma string não vazia.');
        return null;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
}




//**************  Funcionalidade aos sliders  *****************************//
function configurarSlider(sliderId, outputId) {
    var slider = document.getElementById(sliderId);
    var output = document.getElementById(outputId);
    output.innerHTML = slider.value;

    slider.oninput = function () {
        output.innerHTML = this.value;
    }
}

function variaveis()
{
    for (var k = 0; k<=param.length-1; k++)
        configurarSlider("range" + primeiraLetraMaiuscula(param[k]), param[k]);
}
//**************  Funcionalidade aos sliders  *****************************//



//Ajusta variáveis e parâmetros
function setarVariaveis()
{
    for (var k = 0; k<=param.length-1; k++)
    {
        document.getElementById(param[k]).innerHTML = window[param[k]]
        document.getElementById("range" + primeiraLetraMaiuscula(param[k])).value = window[param[k]]
    }

    for (var chave in mostrar)
        if (mostrar.hasOwnProperty(chave))
            document.getElementById("switch" + primeiraLetraMaiuscula(chave)).checked = mostrar[chave]
}



//Coloca os valores e as configs na url
function setUrl(app)
{
    for (var k=0; k<=param.length-1; k++)
        setGetParam(param[k], window[param[k]])

    if (app !== 'gerador-equacoes-bloch')
        for (var chave in mostrar)
            if (mostrar.hasOwnProperty(chave))
                setGetParam(chave, mostrar[chave])

    if (app === 'gerador-equacoes-bloch')
    {
        for (var chave in mostrar)
            if (mostrar.hasOwnProperty(chave) && (mostrar[chave] || chave === "ondaGirante"))
                setGetParam(chave, mostrar[chave])
    }
}



function habilitarSliders(vetor)
{
    for (var k=0; k<=vetor.length-1; k++)
        document.getElementById("range" + primeiraLetraMaiuscula(vetor[k])).disabled = false
}

function desabilitarSliders(vetor)
{
    for (var k=0; k<=vetor.length-1; k++)
        document.getElementById("range" + primeiraLetraMaiuscula(vetor[k])).disabled = true
}

const altTela = window.innerHeight
const largTela = window.innerWidth

const telaX = window.innerWidth
const telaY = window.innerHeight

function ajustarElementos()
{
    if (urlParams.get("Lx") !== null)
        Lx = Number(urlParams.get("Lx"))

    if (urlParams.get("Ly") !== null)
        Ly = Number(urlParams.get("Ly"))

    if (urlParams.get("setup") !== null)
        document.getElementById("parametrosPaisagem").style.width = urlParams.get("setup") + "px"
}

