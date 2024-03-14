import { useRef, useState, useEffect } from "react";

const Thermometer = ({data, width, height, radius, lineWidth, fontSize}) => {
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
            
            ctx.lineWidth = lineWidth;

            // normalize against total records

            const x = 20;
            const thermometerLength = 450;
            const recordLength = thermometerLength / totalRecords;

            let y = 10;
            for (let i=0; i<data.length; i++) {
                const d = data[i];
                ctx.lineCap = "round";
                ctx.lineWidth = 20;
                ctx.strokeStyle = "grey";
                
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + thermometerLength, y);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.strokeStyle = d.color;
                const length = recordLength * d.count; 
                ctx.moveTo(x, y);
                ctx.lineTo(length, y);
                ctx.stroke();
               
                y += 40;
            }            
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

export default Thermometer;