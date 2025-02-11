import React, { useRef, useState, useEffect } from 'react';


const Canvas = () => {
    
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [selectedTool, setSelectedTool] = useState('line');
    const [isDrawing, setIsDrawing] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
      
    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        contextRef.current = context;
        canvas.width = window.innerWidth * 0.7;
        canvas.height = window.innerHeight * 0.6;
        context.lineCap = 'round';
        context.strokeStyle = 'black';
        context.lineWidth = 3;
    }, []);
      
    const handleMouseDown = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        setIsDrawing(true);
        setStartX(offsetX);
        setStartY(offsetY);
        contextRef.current.beginPath();
        // Line and freehand
        contextRef.current.moveTo(offsetX, offsetY);
    };
      
    const handleMouseUp = ({ nativeEvent }) => {
        if (!isDrawing) {
            return;
        }
        setIsDrawing(false);
        const { offsetX, offsetY } = nativeEvent;
    
        switch (selectedTool) {
            case 'line':
                drawLine(startX, startY, offsetX, offsetY);
                break;
            case 'rectangle':
                drawRectangle(startX, startY, offsetX, offsetY);
                break;
            case 'freehand':
            default:
                break;
        }
        contextRef.current.closePath();
    };
    
    const drawLine = (x1, y1, x2, y2) => {
        contextRef.current.beginPath();
        contextRef.current.moveTo(x1, y1);
        contextRef.current.lineTo(x2, y2);
        contextRef.current.stroke();
    };
      
    const drawRectangle = (x1, y1, x2, y2) => {
        const width = x2 - x1;
        const height = y2 - y1;
        contextRef.current.beginPath();
        contextRef.current.rect(x1, y1, width, height);
        contextRef.current.stroke();
    };
      
    const handleMouseMove = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
    
        if (selectedTool === 'freehand') {
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
        }
    };
      
    const clearCanvas = () => {
        const canvas = canvasRef.current;
        contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    };
      
        return (
            <div>
                <div className='flex space-x-2 mb-6'>
                    <button 
                        className={`p-2 border-2 ${selectedTool === 'line' ? 'border-black dark:border-white' : 'dark:border-black'}`}
                        onClick={() => setSelectedTool('line')}
                    >
                        Line
                    </button>
                    <button
                        className={`p-2 border-2 ${selectedTool === 'rectangle' ? 'border-black dark:border-white' : 'dark:border-black'}`}
                        onClick={() => setSelectedTool('rectangle')}
                    >
                        Rectangle
                    </button>
                    <button
                        className={`p-2 border-2 ${selectedTool === 'freehand' ? 'border-black dark:border-white' : 'dark:border-black'}`}
                        onClick={() => setSelectedTool('freehand')}
                    >
                        Freehand
                    </button>
                    <button className='p-2' onClick={clearCanvas}>Clear</button>
                </div>
                <canvas
                    ref={canvasRef}
                    className='border border-black dark:bg-white'
                    height={500}
                    width={750}
                    onMouseUp={handleMouseUp}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    id='canvas'
                />
            </div>
        );
    };

export default Canvas;
