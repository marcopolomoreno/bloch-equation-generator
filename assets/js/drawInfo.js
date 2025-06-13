function drawInfo(texto, fonte, cor, posX, posY)
{
    ctx.font = fonte
    ctx.fillStyle = cor

    ctx.fillText(texto, posX, posY)
}