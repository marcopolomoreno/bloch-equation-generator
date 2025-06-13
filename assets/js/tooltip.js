//Tooltip
$(document).ready(function(){
    $('[data-toggle="popover"]').popover({ trigger: "hover" });   
});

//Impedir tecla enter
$('label').keydown(function(event){
    
    if (event.which == '13')
    {
        event.preventDefault();
        event.stopPropagation();
        document.getElementById(event.target.id).blur();
    }

    if (event.which == '9' || event.which == '27')
    {
        document.getElementById(event.target.id).blur();
    }

    setRangeSliders()

    /* document.getElementById("range" + primeiraLetraMaiuscula(event.target.id)).value = document.getElementById(event.target.id).innerHTML
    console.log(event.target.innerHTML) */
});



/* $('label').blur(function(event){
    document.getElementById("range" + primeiraLetraMaiuscula(param[0])).value = window[param[0]]
    console.log(event.target.innerHTML)
    console.log(event.target)
}); */

/* $('#theta').change(function(event){
    document.getElementById("range" + primeiraLetraMaiuscula(param[0])).value = theta
}); */

/* document.getElementById("theta").addEventListener('input', function (evt) {
    document.getElementById("range" + primeiraLetraMaiuscula(param[0])).value = evt
}); */