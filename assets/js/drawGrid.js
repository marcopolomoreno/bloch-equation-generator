function grid() {
    if (!document.getElementById("switchGrid").checked) {
        mostrar.grid = false
    }
    if (document.getElementById("switchGrid").checked) {
        mostrar.grid = true
    }
}

function drawGrid(Lx, Ly, divX, divY, cor, espessura, tipo, offsetX, offsetY)
{
    const divisoesX = Math.floor(Lx / divX)
    const divisoesY = Math.floor(Ly / divY)

    ctx.beginPath();
    ctx.strokeStyle = cor
    ctx.lineWidth = espessura;

    if (tipo == "tracejada")
        ctx.setLineDash([5, 5]);
    
    for (var k = 0; k <= divisoesX; k++)
    {
        ctx.moveTo(divX * k + offsetX, 0);
        ctx.lineTo(divX * k + offsetX, Ly);
        ctx.stroke();
    }

    for (var k = 0; k <= divisoesY; k++)
    {
        ctx.moveTo(0, divY * k + offsetY);
        ctx.lineTo(Lx, divY * k + offsetY);
        ctx.stroke();
    }

    ctx.setLineDash([]);
}