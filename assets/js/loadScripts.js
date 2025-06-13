var scriptLatex1 = document.createElement("script");
scriptLatex1.src = "../../assets/js/MathJax.js?config=TeX-AMS_HTML-full";

var scriptLatex2 = document.createElement("script");
scriptLatex2.src = "../../assets/js/MathJaxConfig.js";
scriptLatex2.type = "text/x-mathjax-config";

var scriptLatex3 = document.createElement("script");
scriptLatex3.innerHTML = 'MathJax.Hub.Config({  tex2jax: {inlineMath: [["$","$"]]}  });';
scriptLatex3.type = "text/x-mathjax-config";



var scriptGrafico2 = document.createElement("script");
scriptGrafico2.src = "https://cdn.plot.ly/plotly-2.17.1.min.js";
scriptGrafico2.onerror = "onPlotlyLoadError()";



function onPlotlyLoadError()
{
    document.write('<scr' + 'ipt src="../../assets/js/plotly-pt-2.34.0.min.js"></scr' + 'ipt>');
}


function loadGrafico()
{
     document.body.appendChild(scriptGrafico2);
}

function loadLatex()
{
    document.body.appendChild(scriptLatex1);
    document.body.appendChild(scriptLatex2);
    document.body.appendChild(scriptLatex3);
}