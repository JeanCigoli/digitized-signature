import React, { useEffect, useState } from 'react';
import SignaturePad from 'signature_pad';
import './App.css';

function App() {

  const [pad, setPad] = useState();

  const clearPad = () => {
    pad.clear();
  }

  function download(dataURL, filename) {
    if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
      window.open(dataURL);
    } else {
      const blob = dataURLToBlob(dataURL);
      const url = window.URL.createObjectURL(blob);
  
      const a = document.createElement("a");
      a.style = "display: none";
      a.href = url;
      a.download = filename;
  
      document.body.appendChild(a);
      a.click();
  
      window.URL.revokeObjectURL(url);
    }
  }
  

  function dataURLToBlob(dataURL) {
    const parts = dataURL.split(';base64,');
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);
  
    for (let i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }
  
    return new Blob([uInt8Array], { type: contentType });
  }

  const savePad = () => {
    if (pad.isEmpty()) {
      alert("Por favor crie uma assinatura para baixar!");
    } else {
      const dataURL = pad.toDataURL();
      download(dataURL, "signature.png");
    }
  }

  useEffect(() => {

    const canvas = document.querySelector('canvas');

    setPad(new SignaturePad(canvas, {
      minWidth: 2,
      maxWidth: 2,
    }));

    resizeCanvas(canvas);

  }, []);

  const resizeCanvas = (canvas) => {
    let ratio = Math.max(window.devicePixelRatio || 1, 1);
    canvas.width = canvas.offsetWidth * ratio;
    canvas.height = canvas.offsetHeight * ratio;
    canvas.getContext("2d").scale(ratio, ratio);
  }

  return (
    <div className="App">

      <div className="container-main">

        <p>Assine aqui</p>

        <header>

          <h1>Crie sua assinatura!</h1>

          <button
            onClick={clearPad}>
            Limpar
          </button>

        </header>

        <canvas className="canvas">
        </canvas>

        <footer>
          <button
            onClick={savePad}>
            Baixar
          </button>

          <button>
            Salvar
          </button>

        </footer>

      </div>

    </div>
  );
}

export default App;
