document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('thcGraph');
    const ctx = canvas.getContext('2d');

    // Sample data - replace with actual data
    const dataPoints = [
        { time: '4:15 PM', date: '10/30', thcLevel: 6 },
        { time: '5:30 PM', date: '10/30', thcLevel: 4 },
        { time: '6:00 PM', date: '10/30', thcLevel: 1 }
    ];

    // Function to draw the graph
    function drawGraph(data) {
        const xScale = (canvas.width - 60) / data.length;
        const yScale = (canvas.height - 60) / 10;
        const xOffset = 50;
        const yOffset = 40;

        ctx.beginPath();
        ctx.moveTo(xOffset, 0);
        ctx.lineTo(xOffset, canvas.height - yOffset);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(xOffset, canvas.height - yOffset);
        ctx.lineTo(canvas.width, canvas.height - yOffset);
        ctx.stroke();

        // Drawing the time labels
        data.forEach((point, index) => {
            const x = xOffset + index * xScale;
            const y = (canvas.height - yOffset) - point.thcLevel * yScale;
            if (index === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);

            ctx.fillText(point.time, x - 25, canvas.height - yOffset + 15);
        });
        ctx.stroke();

        // Drawing THC level labels and horizontal lines
        for (let i = 0; i <= 10; i++) {
            ctx.fillText(i, 15, canvas.height - yOffset - i * yScale + 3);
            ctx.beginPath();
            ctx.moveTo(xOffset, canvas.height - yOffset - i * yScale);
            ctx.lineTo(canvas.width, canvas.height - yOffset - i * yScale);
            ctx.strokeStyle = "#eee";
            ctx.stroke();
        }

        // Drawing data points
        ctx.fillStyle = "#000";
        data.forEach((point, index) => {
            const x = xOffset + index * xScale;
            const y = (canvas.height - yOffset) - point.thcLevel * yScale;
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2);
            ctx.fill();
        });

        // Drawing Y-axis title
        ctx.save();
        ctx.translate(10, canvas.height / 2);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = "center";
        ctx.fillText("THC ng/mL over Time", 0, 0);
        ctx.restore();
    }

    drawGraph(dataPoints);
});
