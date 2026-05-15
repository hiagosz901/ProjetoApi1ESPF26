//declarçoes de elementos com DOM

const videoElemento=document.getElementById("video");
const botaoScanear=document.getElementById("bnt-texto")
const resultado=document.getElementById("saida")
const canvas=document.getElementById("canvas")

//função para habilitar a camera

async function configurarCamera(){
    try{
        const midia = await navigator.midiaDevices.getUserMedia({
            video: { facingMode: "envrontment"},
            audio:false //
        })

        videoElemento.srcObject = midia;

        videoElemento.onplay();

    }catch(erro){
        resultado.innerText="Erro ao capturar a camera", erro
    }


}

configurarCamera();


botaoScanear.onclick = async()=>{
    botaoScanear.disabled =true;
    resultado.innerText="Fazendo a leitura ...aguarde"

    const contexto = canvas.getContext("2d");

//  
    canvas.width = videoElemento.videoWidth;
    canvas.heigh = videoElemento.videoHeight;

//
    contexto.setTransform(1, 0, 0, 1, 0, 0);

//
    contexto.filter = 'contraste(1.2) grayscale(1)';

    contexto.drawImage(videoElemento, 0, 0, canvas.width,canvas.heigh);

    try{
        const {data: { text }}= await tesseract,recognize(
            canvas,
            'por'
        );
        contexto textoFinal= text.trim();
        resultado.innerText= textoFinal.length > 0 ? textoFinal : "Nao foi possivel identificar o texto"
    }catch(erro){
        resultado.innerText="Erro ao processar a leitura",erro
    }finally{
        botaoScanear.disabled=false;
    }

}