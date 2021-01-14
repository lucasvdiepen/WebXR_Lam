const controls = new Controls(50);
controls.setSpeed(100);
controls.enableMovement();

const cube = new Cube();
cube.setColor('#4CC3D9');
cube.setPosition(0, 2, -2);
cube.setScale(0.5, 0.5, 0.5);

const room = new Model("Assets (3D)/Blender Files/Lobby/Lobby Room.gltf");
room.setPosition(1, 1, 1);
room.setScale(0.2, 0.2, 0.2);

const textHolder = CreateTextHolder("Dit is een tekst\nDit is een andere tekst", 0, 1.5, -1.5);

const lowPolyPedistal = new Model("Assets (3D)/Blender Files/Lobby Props/Display Pedistal (Low Poly).gltf");
lowPolyPedistal.setPosition(1.998, 0.990, -0.975);
lowPolyPedistal.setScale(0.15, 0.15, 0.15);

const highPolyPedistal = new Model("Assets (3D)/Blender Files/Lobby Props/Display Pedistal (High Poly).gltf");
highPolyPedistal.setPosition(1.385, 0.985, -0.975);
highPolyPedistal.setScale(0.15, 0.15, 0.15);

const grapePedistal = new Model("Assets (3D)/Blender Files/Lobby Props/Display Pedistal (High Poly).gltf");
grapePedistal.setPosition(-2.136, 0.972, -0.975);
grapePedistal.setScale(0.3, 0.3, 0.3);

const grapeModel = new Model("Assets (3D)/Blender Files/Grape/Grape.gltf");
grapeModel.setPosition(-2.136, 1.877, -0.975);
grapeModel.setRotation(0, 90, 0);
grapeModel.setScale(0.1, 0.1, 0.1);

const grapeSpotLight = new SpotLight();
grapeSpotLight.setPosition(-2.136, 2, -0.975);
grapeSpotLight.setDistance(0.93);
grapeSpotLight.setTarget(grapeModel);

/*const grapeSpotLight = new DirectionalLight();
grapeSpotLight.setPosition(-2.136, 2, -0.975);*/

const grapeTextHolder = CreateTextHolder("Grape model text", -1.582, 1.510, -0.988);

//Sound
backgroundMusic = new Howl({
    src: ['Music/The Vibing Lam (Loop).mp3'],
    autoplay: false,
    loop: true,
    volume: 0.5
});

//Set all event listeners

cube.addEventListener("click", () => {
    TextHolderToggleVisibility(textHolder);
});

grapeModel.addEventListener("click", () =>{
    TextHolderToggleVisibility(grapeTextHolder);
});

highPolyPedistal.addEventListener("click", () => lowPolyPedistal.toggleVisibility());

function CreateTextHolder(text, x, y, z)
{
    const textHolder = new Cube();
    textHolder.setVisible(false);
    textHolder.setColor("#000000");
    textHolder.setPosition(x, y, z);
    textHolder.setScale(0.850, 0.6, 0.03);
    textHolder.setOpacity(0.6);
    textHolder.elem.setAttribute("look-at", "#head");

    const infoText = new Text(TextFitInHolder(text), textHolder.getId());
    infoText.setPosition(-0.48, 0, 1);
    infoText.setFontsize(0.4);
    infoText.addScale(-0.850, -0.6, -0.03);
    infoText.setColor("white");

    return textHolder;
}

function TextHolderToggleVisibility(textHolder)
{
    let visibility = textHolder.getVisible();
    visibility = !visibility;
    if(visibility)
    {
        textHolder.setScale(0.850, 0.6, 0.03);
        textHolder.setVisible(true);
    }
    else
    {
        textHolder.setVisible(false);
        textHolder.setScale(0, 0, 0);
    }
}

function AframeClicked()
{
    if(!backgroundMusic.playing())
    {
        //backgroundMusic.play();
    }
}

function TextFitInHolder(text)
{
    let newText = text;
    let newLines = 13 - (text.split(/\r\n|\r|\n/).length);
    for(var i = 0; i < newLines; i++) newText += "\n";
    return newText;
}

function CalculateCrossProduct(x1, y1, x2, y2)
{
    return x1 * y2 - y1 * x2;
}

function CalculateDotProduct(x1, y1, x2, y2)
{
    return x1 * x2 + y1 * y2;
}

function CalculateAngle(x1, y1, x2, y2)
{
    let crossProduct = CalculateCrossProduct(x1, y1, x2, y2);
    let Angle = Math.atan2(Math.abs(crossProduct), CalculateDotProduct(x1, y1, x2, y2)) * 180 / Math.PI;
    if(crossProduct < 0) Angle = 360 - Angle;
    return Angle;
}

/*setInterval(function(){ 
    //console.log(controls.getPosition());
    let camPos = controls.getPosition();

    let angle = CalculateAngle(-1, -3, camPos.x, camPos.z);
    console.log(angle);

    textHolder.setRotation(0, angle, 0);
}, 500);*/
