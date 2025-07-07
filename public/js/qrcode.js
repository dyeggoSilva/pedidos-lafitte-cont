
 const url = "https://api-qrcode-portfolio.onrender.com";
function gerarQRCode() {

   
    const texto = document.getElementById('inputTexto').value;
    if (!texto) {
        alert('Digite um texto ou link!');
        return;
    }

    const urlImagem = `${url}/qrcode?texto=${encodeURIComponent(texto)}`;
    const urlDownload = `${url}/qrcode/download?texto=${encodeURIComponent(texto)}`;

    const imagem = document.getElementById('imagemQr');
    const botaoDownload = document.getElementById('botaoDownload');

    imagem.src = urlImagem;
    imagem.hidden = false;

    botaoDownload.href = urlDownload;
    botaoDownload.hidden = false;
}
