import { MdPictureAsPdf } from "react-icons/md"

export const WinPrint = () => {

  const print = () => {
    const previewElement = document.getElementById('preview');
    if (previewElement) {
      const printWindow = window.open('', '', 'height=1920,width=1080');
      if (printWindow) {
        const html = `
          <html>
            <head>
              <title>Resume ATS - Preview</title>
              <style>
                @media print {
                  body {
                    font-family: Arial, sans-serif;
                    font-size: 12pt;
                  }
                  .w-24 {
                    width: 24px;
                  }
                  .h-24 {
                    height: 24px;
                  }
                  .rounded-full {
                    border-radius: 50%;
                  }
                  .overflow-hidden {
                    overflow: hidden;
                  }
                  .border-2 {
                    border-width: 2px;
                  }
                  .border-violet-500 {
                    border-color: #7A288A;
                  }
                  .object-cover {
                    object-fit: cover;
                  }
                  .h-full {
                    height: 100%;
                  }
                  .w-full {
                    width: 100%;
                  }
                }
              </style>
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
            </head>
            <body>
              ${previewElement.outerHTML.replace(/src="([^"]+)"/g, (match, src) => {
                if (src.startsWith('/')) {
                  return `src="${window.location.origin}${src}"`;
                }
                return match;
              })}
            </body>
          </html>
        `;
        printWindow.document.writeln(html);
        printWindow.document.close();
        printWindow.print();
        printWindow.close();
      } else {
        console.error('Não foi possível abrir a janela de impressão');
      }
    }
  }

return (
  <button
    onClick={print}
    className="exclude-print fixed bottom-5 right-10 font-bold rounded-full bg-violet-500 text-violet-50 shadow-lg border-2 border-white"
  >
    <MdPictureAsPdf className="w-10 h-10 p-2" title="Download Resume as PDF" />
  </button>
)
}