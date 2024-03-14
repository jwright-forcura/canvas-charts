import { useRef, useEffect } from "react";

const PieChart = ({data, width, height, radius, lineWidth, fontSize}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        return () => {
            canvasRef.current = null;
        }
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const totalRecords = data.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0);
            const xMid = canvas.width / 2;
            const yMid = canvas.height / 2;
            ctx.lineWidth = lineWidth;
            const circleRadians = 2 * Math.PI;
            const radianGap = 0.002 * circleRadians;

            let pathStart = -Math.PI / 2;
            for (let i=0; i<data.length; i++) {
                const d = data[i];
                const fraction = d.count / totalRecords;
                const radians = fraction * circleRadians;
                const pathEnd = pathStart + radians;
                ctx.strokeStyle = d.color;
                ctx.beginPath();                
                ctx.arc(xMid, yMid, radius, pathStart + radianGap, pathStart + radians - radianGap);
                pathStart = pathEnd;
                ctx.stroke();
            }

            ctx.fillstyle = "black";
            ctx.font = `${fontSize}px sans-serif`;
            const text = totalRecords.toString();
            console.log(text);
            const { width, actualBoundingBoxAscent, actualBoundingBoxDescent } = ctx.measureText(text);
            const offsetWidth = width / 2;
            const offsetHeight = (actualBoundingBoxAscent + actualBoundingBoxDescent) / 2;
            const textX = (canvas.width / 2) - offsetWidth;
            const textY = (canvas.height / 2) + offsetHeight;
            console.log(text, offsetWidth, offsetHeight, textX, textY)
            ctx.fillText(text, textX, textY);
        }
        
        return () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0,0,canvas.width, canvas.height);
            }
        }
    }, [data, width, height, radius, lineWidth, fontSize]);

    return (
        <div style={{height: `${height}px`, width: `${width}px`, background: "white", overflow: "hidden"}}>
            <canvas ref={canvasRef} height={`${height}px`} width={`${width}px`}></canvas>
        </div>
    )
}

export default PieChart;