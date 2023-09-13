song1="";
song2="";
scoreLeftwrist=0;
scoreRightwrist=0;
leftwristX=0;
rightwristX=0;
leftwristY=0;
rightwristY=0;
song1_status="";
song2_status="";
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,modelloaded);
    posenet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying(); 
    fill("red");
    stroke("red");
    if (scoreLeftwrist>0.1){
        circle(leftwristX,leftwristY,20);
        song1.stop();
        if(song2_status==false){
            song2.play();
            document.getElementById("song").innerHTML="playing - Vegedream_-_Ramenez_La_Coupe_La_Maison-jukeboxmusic.com.ng";
            
        }
    }
    if (scoreRightwrist>0.1){
        circle(rightwristX,rightwristY,20);
        song2.stop();
        if(song1_status==false){
            song1.play();
            document.getElementById("song").innerHTML="music.mp3";
            
        }
    }
}
function preload(){
    song1=loadSound("music.mp3");
    song2=loadSound("Vegedream_-_Ramenez_La_Coupe_La_Maison-jukeboxmusic.com.ng.mp3");
}
function modelloaded(){
    console.log("posenet is initialized");
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftwristX=results[0].pose.leftWrist.x;
        leftwristY=results[0].pose.leftWrist.y;
        console.log("leftwristX = "+ leftwristX +" leftwristY = "+leftwristY);
        rightwristX=results[0].pose.rightWrist.x;
        rightwristY=results[0].pose.rightWrist.y;
        console.log("rightwristX = "+ rightwristX +" rightwristY = "+rightwristY);
        scoreLeftwrist=results[0].pose.keypoints[9].score;
        console.log("scoreLeftwrist = "+scoreLeftwrist);
        scoreRightwrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightwrist = " + scoreRightwrist);

    }
}