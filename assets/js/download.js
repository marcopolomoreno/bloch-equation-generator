function download(dados, extensao, delimitacao, separadorDecimal)
{
    var finalValor = '';

    // Função auxiliar para detectar se um valor é realmente numérico
    function ehNumero(valor) {
        // Substitui vírgula temporariamente para testar
        if (typeof valor === 'string') valor = valor.replace(',', '.');
        return !isNaN(parseFloat(valor)) && isFinite(valor);
    }

    for (var i = 0; i < contDownload; i++)
    {
        var valor = dados[i];
        for (var j = 0; j < valor.length; j++)
        {
            var innerValor = valor[j];

            // Se for número, converte o separador decimal
            if (ehNumero(innerValor) && separadorDecimal && separadorDecimal !== '.')
                innerValor = innerValor.toString().replace('.', separadorDecimal);

            var resultado = innerValor.toString().replace(/"/g, '""');

            // Se tiver vírgula, aspas ou quebra de linha, coloca entre aspas
            if (resultado.search(/("|,|\n)/g) >= 0)
                resultado = '"' + resultado + '"';

            if (j > 0)
                finalValor += delimitacao;

            finalValor += resultado;
        }
        finalValor += '\n';
    }

    var gravar = document.createElement('a');
    gravar.setAttribute('href', 'data:text;charset=utf-8,' + encodeURIComponent(finalValor));
    gravar.setAttribute('download', 'dados.' + extensao);
    gravar.click();
}
