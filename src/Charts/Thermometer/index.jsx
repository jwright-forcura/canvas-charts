import { useRef, useEffect } from "react";

const Thermometer = ({data, width, height, radius, lineWidth, fontSize}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            
            ctx.lineWidth = lineWidth;
            const x = 20;
            const thermometerLength = 450;            

            let y = 10;
            
            ctx.lineCap = "round";
            ctx.lineWidth = 20;
            ctx.strokeStyle = "grey";

            // first draw the grey bars
            for (let i=0; i<data.length; i++) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + thermometerLength, y);
                ctx.stroke();
               
                y += 40;
            } 

            y = 10;
            
            // next draw the color bar
            const totalRecords = data.reduce((accumulator, currentValue) => accumulator + currentValue.count, 0);

            let stepMultiplier = 0.2;
            
            const drawBars = () => {
                for (let i=0; i<data.length; i++) {
                    const localY = y + (i*40);
                    const d = data[i];
                    ctx.strokeStyle = d.color;
    
                    const finalLength = (d.count / totalRecords) * thermometerLength;
                    const currentLength = x + (stepMultiplier * finalLength);

                    ctx.beginPath();
                    ctx.moveTo(x, localY);
                    ctx.lineTo(currentLength, localY);
                    ctx.stroke();
                }

                if(stepMultiplier < 1) {
                    stepMultiplier += 0.01;
                    window.requestAnimationFrame(drawBars);
                }
            }
            
            window.requestAnimationFrame(drawBars);
        }
        
        return () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                ctx.clearRect(0,0,canvas.width, canvas.height);
            }
        }
    }, [data, width, height, radius, lineWidth, fontSize]);

    const styleProps = {height: `${height}px`, width: `${width}px`, background: "#1b1b1b", overflow: "hidden"};

    return (
        <div style={{...styleProps}}>
            <canvas ref={canvasRef} height={`${height}px`} width={`${width}px`}></canvas>
        </div>
    )
}

export default Thermometer;