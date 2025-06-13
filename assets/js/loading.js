window.addEventListener("load", () => {

    if (isOnline || !navigator.userAgent.match(/Android/i))
    {
        const loader = document.querySelector(".loader");

        loader.classList.add("loader--hidden");
    }    

    document.getElementById("main").style.display = "block";

});