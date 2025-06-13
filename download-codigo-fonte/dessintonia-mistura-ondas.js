function downloadCodigoFonteDessintoniaMisturaOndas()
{


//conteúdo do código-fonte
var cont = []

cont[0] = 
`//Código-fonte gerado pelo aplicativo Gerador de Equações de Bloch:
//https://simufisica.com/ferramentas/gerador-equacoes-bloch/"
//Desenvolvedor: Marco Polo Moreno de Souza"
//Contato: marcopolo@unir.br
//Data de criação: ` + dataAtualFormatada() + `
//Versão do gerador: ` + document.getElementById("versao").innerHTML + `

//Todas as unidades estão no SI

#include <stdio.h>
#include <math.h>

int main() {
    FILE* arquivo;
    //Nome do arquivo de saída
    arquivo = fopen("dados.txt", "w");

    double const Pi = 3.14159265358979;`

var NumVariaveis = 0;   //Número de variáveis

function contarVariaveis()
{
    //Populações
    for (var p=0; p<=N-1; p++)
    {
        var vetIndices = Array.from({length: N}, (_, i) => i + 1)

        //n=2  => três ômegas
        for (var n=0; n<=2; n=n+2)
            for (var r=0; r<=permutacoes(removerElementos(vetIndices, p+1, p+1), n).length-1; r++)
            {
                if (n === 0)
                {   
                    NumVariaveis++
                }
                else
                {
                    NumVariaveis++
                    NumVariaveis++
                }
            }
    }

    //coerências
    for (var k=0; k<=N-1; k++)
    {
        for (var p=k; p<=N-1; p++)
        {   
            if (k !== p)
            {
                var vetIndices = Array.from({length: N}, (_, i) => i + 1)

                //n=2  => três ômegas
                for (var n=0; n<=4; n++)
                    for (var r=0; r<=permutacoes(removerElementos(vetIndices, k+1, p+1), n).length-1; r++)
                    {
                        NumVariaveis++
                        NumVariaveis++
                    }
            }
        }
    }
}
contarVariaveis()

cont[2] = 
 `

    //Matriz densidade
    double rho[` + NumVariaveis + `];
`

//double A12, A13, etc
//double B12, B13, etc
function omega()
{
    var string = "\n\t//Parte real das frequências de Rabi\n"
    
    string = string + gerarParametros("A", "FR", "1e6", "menor-maior")

    string = string + "\n\t//Parte imaginária das frequências de Rabi\n"

    string = string + gerarParametros("B", "FR", "0", "menor-maior")

    return string;
}



function gerarParametros(a, b, valor, ordem)
{
    var string = ""
    
    for (var k=0; k<=N-1; k++)
    {
        for (var p=k+1; p<=N-1; p++)
        {
            if (document.getElementById("switch" + b + String(k+1) + String(p+1) ).checked)
            {
                if (ordem === "menor-maior")
                    string = string + "\tdouble " + a + String(k+1) + String(p+1) + " = " + valor + ";\n"

                if (ordem === "maior-menor")
                    string = string + "\tdouble " + a + String(p+1) + String(k+1) + " = " + valor + ";\n"
            }
        }
    }

    return string;
}


//double gamma12, gamma13, etc
function gamma()
{
    var string = "\n\t//Taxas de decaimento das coerências\n"
    
    for (var k=0; k<=N-1; k++)
    {
        for (var p=k+1; p<=N-1; p++)
        {
            string = string + "\tdouble gamma" + String(k+1) + String(p+1) + " = 2*Pi*2.5e6;\n"
        }
    }

    return string;
}


//double delta21, delta31, etc
//ver qual frequência será variada
function delta()
{
    var string = "\n\t//Dessintonias\n"
    
    for (var k=0; k<=N-1; k++)
        for (var p=k+1; p<=N-1; p++)
            string = string + "\tdouble delta" + String(k+1) + String(p+1) + ";\n"

    string = string + "\n"

    for (var k=N-1; k>=0; k--)
        for (var p=k-1; p>=0; p--)
            string = string + "\tdouble delta" + String(k+1) + String(p+1) + ";\n"

    string = string + "\n\t//Passo da Dessintonia, em MHz\n"
    string = string + "\tdouble const passo = " + passoDessintonia + ";\n\n"

    string = string + "\t//Largura do espectro, em MHz\n"
    string = string + "\tdouble const larguraEspectro = " + larguraEspectro + ";\n\n"

    string = string + "\t//Número de pontos do espectro\n"
    string = string + "\tdouble D = larguraEspectro/(2*passo);\n"

    return string;
}


//double Gamma21, Gamma32, etc
function Gamma()
{
    var string = "\n\t//Taxas de decaimento dos estados excitados\n"
    
    for (var p=0; p<=N-1; p++)
    {
        for (var q=p+1; q<=N-1; q++)
        {
            if (document.getElementById("switchTP" + String(Math.min(p+1,q+1)) + String(Math.max(p+1,q+1)) ).checked)
            {
                if (nivel[p].y > nivel[q].y)
                {
                    string = string + "\tdouble Gamma" + String(q+1) + String(p+1) + " = 2*Pi*2.5e6;\n"
                }

                if (nivel[q].y > nivel[p].y)
                {
                    string = string + "\tdouble Gamma" + String(p+1) + String(q+1) + " = 2*Pi*2.5e6;\n"
                }
            }
        }
    }        

    return string;
}



cont[5] = 
`
    //Tempo
    double t;

    //Tempo de integração
    double const tTotal = ` + tempoIntegracao + `e-6;

    //Passo de integração temporal
    double const h = ` + passoTemporal + `e-12;
    
    //Número de pontos tempo
    double T = tTotal/h + 1;


    //Variáveis - arquivo dados.txt\n`

function printArquivo()
{
    var string = '\tfprintf(arquivo, "\\\\g(d)\\\\-(21)/2\\\\g(p) '

    //string = string + "\\\\g(r)\\\\-(" + String(k+1) + String(k+1) + ") "

    //Populações
    for (var p=0; p<=N-1; p++)
        string = string + "\\\\g(r)\\\\-(" + String(p+1) + String(p+1) + ") "

    string = string + "soma "

    for (var p=0; p<=N-1; p++)
    {
        var vetIndices = Array.from({length: N}, (_, i) => i + 1)

        //n=2  => três ômegas
        for (var n=0; n<=2; n=n+2)
            for (var r=0; r<=permutacoes(removerElementos(vetIndices, p+1, p+1), n).length-1; r++)
            {
                var rotaPopulacao = String(p+1) + permutacoes(removerElementos(vetIndices, p+1, p+1), n)[r] + String(p+1)

                if (n === 0)            //Re(\g(s)\-(34)\+((34)))
                {   
                    string = string + "\\\\g(r)\\\\-(" + String(p+1) + String(p+1) + ")" + "\\\\+((" + rotaPopulacao + ")) "
                }
                else
                {
                    string = string + "Re(\\\\g(r)\\\\-(" + String(p+1) + String(p+1) + ")" + "\\\\+((" + rotaPopulacao + "))) "
                    string = string + "Im(\\\\g(r)\\\\-(" + String(p+1) + String(p+1) + ")" + "\\\\+((" + rotaPopulacao + "))) "
                }
            }
    }
    
    //coerências
    for (var k=0; k<=N-1; k++)
    {
        for (var p=k; p<=N-1; p++)
        {   
            if (k !== p)
            {
                var vetIndices = Array.from({length: N}, (_, i) => i + 1)

                //n=2  => três ômegas
                for (var n=0; n<=4; n++)
                    for (var r=0; r<=permutacoes(removerElementos(vetIndices, k+1, p+1), n).length-1; r++)
                    {
                        var rotaCoerencia = String(k+1) + permutacoes(removerElementos(vetIndices, k+1, p+1), n)[r] + String(p+1)

                        string = string + "Re(\\\\g(s)\\\\-(" + String(k+1) + String(p+1) + ")" + "\\\\+((" + rotaCoerencia + "))) "
                        string = string + "Im(\\\\g(s)\\\\-(" + String(k+1) + String(p+1) + ")" + "\\\\+((" + rotaCoerencia + "))) "
                    }
            }
        }
    }

    string = string.slice(0, -1);
    string = string + '\\n");\n';

    //Unidades
    string = string + `\tfprintf(arquivo, "MHz`

    for (var k=0; k<=N**2-1; k++)
    {
        string = string + " "
    }

    string = string + '\\n");\n';

    return string;
}


cont[19] = 
`



    //Equações de Bloch
    //*****************************************`

function variaveis()
{
    var string = "\n\tdouble bloch("

    //Populações
    for (var p=0; p<=N-1; p++)
    {
        var vetIndices = Array.from({length: N}, (_, i) => i + 1)

        //n=2  => três ômegas
        for (var n=0; n<=2; n=n+2)
            for (var r=0; r<=permutacoes(removerElementos(vetIndices, p+1, p+1), n).length-1; r++)
            {
                var rotaPopulacao = String(p+1) + permutacoes(removerElementos(vetIndices, p+1, p+1), n)[r] + String(p+1)

                if (n === 0)
                {   
                    string = string + "double a" + String(p+1) + String(p+1) + "_" + rotaPopulacao + ", "
                }
                else
                {
                    string = string + "double a" + String(p+1) + String(p+1) + "_" + rotaPopulacao + ", "
                    string = string + "double b" + String(p+1) + String(p+1) + "_" + rotaPopulacao + ", "
                }
            }
    }

    //coerências
    for (var k=0; k<=N-1; k++)
    {
        for (var p=k; p<=N-1; p++)
        {   
            if (k !== p)
            {
                var vetIndices = Array.from({length: N}, (_, i) => i + 1)

                //n=2  => três ômegas
                for (var n=0; n<=4; n++)
                    for (var r=0; r<=permutacoes(removerElementos(vetIndices, k+1, p+1), n).length-1; r++)
                    {
                        var rotaCoerencia = String(k+1) + permutacoes(removerElementos(vetIndices, k+1, p+1), n)[r] + String(p+1)

                        string = string + "double a" + String(k+1) + String(p+1) + "_" + rotaCoerencia + ", "
                        string = string + "double b" + String(k+1) + String(p+1) + "_" + rotaCoerencia + ", "
                    }
            }
        }
    }

    string = string.slice(0, -1);
    string = string.slice(0, -1);
    string = string + ", int j)\n    {\n"

    return string;
}


cont[8] = 
`
    }
    //*****************************************


    int d, k, j;


    //Loop dessintonia
    for (d=-D; d<=D; d++)
    {
        //Condições iniciais`

function condicoesIniciais()
{
    var string = `
        for (j=0; j<=` + NumVariaveis + `-1; j++)
            rho[j] = 0;

        rho[0] = 0.5;       //rho11
        rho[26] = 0.5;      //rho33
    `
    return string;
}


function deltaDoisFotons(a, b)
{
    var k = 1, key = false

    do
    {
        if (k !== a && k !== b)
        {
            var elemento1 = String(Math.min(a, k)) + String(Math.max(a, k))
            var elemento2 = String(Math.min(k, b)) + String(Math.max(k, b))

            /* console.log(k)
            console.log("switchFR" + elemento1)
            console.log("switchFR" + elemento2) */

            if (document.getElementById("switchFR" + elemento1).checked &&
                document.getElementById("switchFR" + elemento2).checked)
            {
                key = true;
                var sinal1 = " ", sinal2 = " + "

                if (a > k)
                    sinal1 = " - "

                if (k > b)
                    sinal2 = " - "

                var saida = "\t\tdelta" + String(a) + String(b) + " =" + sinal1 + "delta" + elemento1
                                                                       + sinal2 + "delta" + elemento2 + ";\n"

                //console.log(saida)
                return saida
            }
        }

        k++;
    }
    while (k<=N && key === false)
}


function dessintonias()
{
    var string = "";

    for (var k=0; k<=N-1; k++)
        for (var p=k+1; p<=N-1; p++)
            if (String(k) + String(p) !== "01")
            {
                if (document.getElementById("switchFR" + String(k+1) + String(p+1)).checked)
                    string = string + "\t\tdelta" + String(k+1) + String(p+1) + " = delta12;\n"
            }

    string = string + "\n"

    for (var k=0; k<=N-1; k++)
        for (var p=k+1; p<=N-1; p++)
            if (String(k) + String(p) !== "01")
            {
                if (!document.getElementById("switchFR" + String(k+1) + String(p+1)).checked)
                    string = string + deltaDoisFotons(k+1, p+1)
            }
                

    string = string + "\n"

    for (var k=N-1; k>=0; k--)
        for (var p=k-1; p>=0; p--)
            string = string + "\t\tdelta" + String(k+1) + String(p+1) + " = - delta" + String(p+1) + String(k+1) + ";\n"

    return string;
}


cont[10] =
`
        t = 0;

        delta12 = 2*Pi*passo*d*1e6;
        
` + dessintonias() + `

        //Loop tempo
        for (k=0; k<=T; k++)
        {\n\t\t\t`

function k1234()
{
    var string = "double "
    
    for (var k=0; k<=3; k++)
    {
        string = string + "k" + String(k+1) + "[" + String(NumVariaveis) + "], "
    }

    string = string.slice(0, -1);
    string = string.slice(0, -1);
    string = string + ";\n"

    return string;
}


function kRungeKutta()
{
    var string = ""
    var add = ""

    for (var k=0; k<=3; k++)
    {
        string = string + "\n\t\t\t//Passo " + String(k+1) + "\n"
        
        string = string + "\t\t\tfor (j=0; j<=" + NumVariaveis + "-1; j++)\n"
        string = string + "\t\t\t{\n"
        string = string + "\t\t\t\tk" + String(k+1) + "[j] = bloch("
        
        for (var p=0; p<=NumVariaveis-1; p++)
        {
            if (k===1 || k===2)
                add = " + 0.5*h*k" + String(k) + "[" + String(p) + "]"

            if (k===3)
                add = " + h*k" + String(k) + "[" + String(p) + "]"

            string = string + "rho[" + String(p) + "]" + add + ", "
        }
        
        string = string + "j);\n"
        string = string + "\t\t\t}\n"
    }

    return string;
}


//Função de retorna o elemento de matriz com seu índice no vetor rho[i] (apenas populações)
//Exemplo: f(a11_1231) -> rho[5]
//Exemplo: f(b33_3123) -> rho[28]
function elementoParaIndice(elemento)
{

    var j = 0;
    for (var p=0; p<=N-1; p++)
    {
        var vetIndices = Array.from({length: N}, (_, i) => i + 1)

        //n=2  => três ômegas
        for (var n=0; n<=2; n=n+2)
            for (var r=0; r<=permutacoes(removerElementos(vetIndices, p+1, p+1), n).length-1; r++)
            {
                var rotaPopulacao = String(p+1) + permutacoes(removerElementos(vetIndices, p+1, p+1), n)[r] + String(p+1)

                if (n===0)
                {
                    if (elemento === "a" + String(p+1) + String(p+1) + "_" + rotaPopulacao) return "rho[" + j + "]"
                    j++
                }
                else
                {
                    if (elemento === "a" + String(p+1) + String(p+1) + "_" + rotaPopulacao) return "rho[" + j + "]"
                    j++

                    if (elemento === "b" + String(p+1) + String(p+1) + "_" + rotaPopulacao) return "rho[" + j + "]"
                    j++
                }
            }
    }
}


//Cálculos das populações
function calcPop()
{
    var string = ""

    for (var k=0; k<=N-1; k++)
    {
        string = string + "\t\tdouble a" + String(k+1) + String(k+1) + " = "

        var vetIndices = Array.from({length: N}, (_, i) => i + 1)

        //n=2  => três ômegas
        for (var n=0; n<=2; n=n+2)
            for (var r=0; r<=permutacoes(removerElementos(vetIndices, k+1, k+1), n).length-1; r++)
            {
                var rotaPopulacao = String(k+1) + permutacoes(removerElementos(vetIndices, k+1, k+1), n)[r] + String(k+1)

                if (n===0)
                    string = string + elementoParaIndice("a" + String(k+1) + String(k+1) + "_" + rotaPopulacao);

                if (permutacoes(removerElementos(vetIndices, k+1, k+1), n)[r][0] < permutacoes(removerElementos(vetIndices, k+1, k+1), n)[r][1])
                    string = string + " + 2*" + elementoParaIndice("a" + String(k+1) + String(k+1) + "_" + rotaPopulacao) + "*cos((" + indiceParaPares(String(k+1) + String(permutacoes(removerElementos(vetIndices, k+1, k+1), n)[r]) + String(k+1), "+", "delta") + ")*t)"
                                    + " - 2*" + elementoParaIndice("b" + String(k+1) + String(k+1) + "_" + rotaPopulacao) + "*sin((" + indiceParaPares(String(k+1) + String(permutacoes(removerElementos(vetIndices, k+1, k+1), n)[r]) + String(k+1), "+", "delta") + ")*t)"
            }
        
        string = string + ";\n\n"
    }

    string = string + "\t\tdouble soma = "

    for (var k=0; k<=N-1; k++)
    {
        string = string + "a" + String(k+1) + String(k+1) + " + "
    }

    string = string.slice(0, -3);

    string = string + ";\n\n"

    return string
}


cont[13] = 
`
            //Atualização dos elementos da matriz densidade
            for (j=0; j<=` + NumVariaveis + `-1; j++)
            {
                rho[j] = rho[j] + h*(k1[j] + 2*k2[j] + 2*k3[j] + k4[j])/6;
            }

            t = t + h;
        }\n\n` + calcPop() + `

        //Impressão do resultado na tela
        printf("*********************************\\n");
        printf("%.2f", passo*d);
        printf("`


function impressaoResultado()
{
    var string = ""
    
    for (var k=0; k<=NumVariaveis + N; k++)
    {
        string = string + ' %g'
    }

    string = string + '\\n"'

    for (var k=0; k<=N-1; k++)
    {
        string = string + ", a" + String(k+1) + String(k+1);
    }

    string = string + ", soma"

    for (var k=0; k<=NumVariaveis-1; k++)
    {
        string = string + ", rho[" + String(k) + "]"
    }

    return string;
}       

        
cont[15] = `);

        //Impressão do resultado no arquivo dados.txt
        fprintf(arquivo, "%.2f", passo*d);
        fprintf(arquivo, "`
        

cont[17] = `);
    }

    fclose(arquivo);

    return 0;
}`

    cont[1] = ""

    cont[3] = omega()

    cont[4] = Gamma() + gamma() + delta()

    cont[6] = variaveis();

    cont[7] = eqBlochC;

    cont[9] = condicoesIniciais()

    cont[11] = k1234()

    cont[12] = kRungeKutta()

    cont[14] = impressaoResultado()

    cont[16] = impressaoResultado()

    cont[18] = printArquivo()

    conteudo = cont[0] + cont[1] + cont[2] + cont[3] + cont[4] + cont[5] + cont[18] + cont[19] + cont[6] + cont[7] + cont[8] + cont[9] + 
               cont[10] + cont[11] + cont[12] + cont[13] + cont[14] + cont[15] + cont[16] + cont[17]

    var nomeArquivo = "dessintonia-mistura-ondas.c";

    var blob = new Blob([conteudo], { type: 'text/plain' });

    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = nomeArquivo;

    // Simula o clique no link para iniciar o download
    link.click();

    // Limpa o objeto URL após o download
    URL.revokeObjectURL(link.href);
}