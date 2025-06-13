function drawSeta(p1x, p1y, p2x, p2y, cor, tipo, tamanho, limiar)
{
    if (tipo === "fina")
    {
        var dx = p2x - p1x;
        var dy = p2y - p1y;
        var angle = Math.atan2(dy, dx);

        if (Math.hypot(dx, dy) >= limiar)
        {
            ctx.beginPath()
            ctx.strokeStyle = cor
            ctx.moveTo(p1x, p1y);
            ctx.lineTo(p2x, p2y);
            ctx.lineTo(p2x - tamanho * Math.cos(angle - Math.PI / 6), p2y - tamanho * Math.sin(angle - Math.PI / 6));
            ctx.moveTo(p2x, p2y);
            ctx.lineTo(p2x - tamanho * Math.cos(angle + Math.PI / 6), p2y - tamanho * Math.sin(angle + Math.PI / 6));
            ctx.stroke()
        }       
    }

    if (tipo === "grossa")
    {
        var angle = Math.atan2((p2y - p1y) , (p2x - p1x));
        var hyp = Math.sqrt((p2x - p1x) * (p2x - p1x) + (p2y - p1y) * (p2y - p1y));

        if (hyp >= limiar)
        {
            ctx.save();
            ctx.translate(p1x, p1y);
            ctx.rotate(angle);
        
            // line
            ctx.strokeStyle = cor
            ctx.beginPath();	
            ctx.moveTo(0, 0);
            ctx.lineTo(hyp - tamanho, 0);
            ctx.stroke();
        
            // triangle
            ctx.fillStyle = cor
            ctx.beginPath();
            ctx.lineTo(hyp - tamanho, 0.5*tamanho);
            ctx.lineTo(hyp, 0);
            ctx.lineTo(hyp - tamanho, -0.5*tamanho);
            ctx.fill();
        
            ctx.restore();
        }        
    }

    ctx.strokeStyle = "black"
}