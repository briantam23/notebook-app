import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const ExportButton = () => {
    const exportNotebook = () => {
        html2canvas(document.querySelector("#canvas")).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'PNG', 0, 0);
            pdf.save("notebook.pdf");
        });
    };
    return (
        <button onClick={() => exportNotebook()}>Export</button>
    )
}

export default ExportButton;
