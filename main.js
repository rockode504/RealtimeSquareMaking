noseX=0;
noseY=0;
difference=0;
rightWristX=0;
leftWristX=0;

function preload()
{

}

function setup()
{
    video=createCapture(VIDEO);
    video.size();
    canvas=createCanvas(550,550);
    canvas.position(900,100);
    poseNet=ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw()
{
    background("#000000");
    document.getElementById("size").innerHTML="Width And Height Of The Square Will Be "+difference+"px.";
    fill("#ffe4c4");
    stroke("#ff0000");
    square(noseX, noseY, difference);
}

function modelLoaded()
{
    console.log("Model Loaded!")
}

function gotPoses(results)
{
    if(results.length>0)
    {
        console.log(results);
        noseX=results[0].pose.nose.x;
        noseY=results[0].pose.nose.y;
        console.log("Nose's X position is "+noseX+"Nose's Y position is "+noseY);

        leftWristX=results[0].pose.leftWrist.x;
        rightWristX=results[0].pose.rightWrist.y;
        difference=floor(leftWristX-rightWristX);

        console.log("Right Wrist's X position is "+rightWristX+"Left Wrist's X position is "+leftWristX+"Difference is "+difference);
    }
}