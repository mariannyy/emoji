prediction1=""
prediction2=""

Webcam.set({
    width:350,
    height:300,
    imageFormat:'png',
    pngQuality:90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:', ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/CEezX7FDJ/model.json',modelLoaded);

function modelLoaded() {
    console.log ('model Loaded!');
}

function speak(){
    var synth=window.speechSynthesis;
    speakData1="A primeira previsão é" + prediction1;
    speakData2="e a segunda previsão é" + prediction2;
    var utterThis= new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

function check()
{
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error,result){
    if(error){
        console.error(error);
    } else {
        console.log(result);
        document.getElementById("resultEmotionName").innerHTML=result[0].label;
        document.getElementById("resultEmotionName2").innerHTML=result[1].label;
        prediction1= result[0].label;
        prediction2= result[1].label;
        speak();
        if(result[0].label == "feliz")
        {
            document.getElementById("updateEmoji").innerHTML= "&#128522;";
        }

        if(result[0].label == "triste")
        {
            document.getElementById("updateEmoji").innerHTML="&#128532;";
        }
        if(result[0].label == "irritado")
        {
            document.getElementById("updateEmoji").innerHTML="&#128548;";
        }
        if(result[1].label == "feliz")
        {
            document.getElementById("updateEmoji2").innerHTML="&#128522;"; 
        }
        if(result[1].label == "triste")
        {
            document.getElementById("updateEmoji2").innerHTML="&#128532;";  
        }
        if(result[1].label == "irritado")
        {
            document.getElementById("updateEmoji2").innerHTML="&#128548;"; 
        }


    }
}