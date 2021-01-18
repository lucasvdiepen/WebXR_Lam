const controls = new Controls(50);
controls.setSpeed(100);
controls.enableMovement();

/*const cube = new Cube();
cube.setColor('#4CC3D9');
cube.setPosition(0, 2, -2);
cube.setScale(0.5, 0.5, 0.5);

const textHolder = CreateTextHolder("Dit is een tekst\nDit is een andere tekst", 0, 1.5, -1.5);*/

const room = new Model("Assets (3D)/Blender Files/Lobby/Lobby Room.gltf");
room.setPosition(1, 1, 1);
room.setScale(0.2, 0.2, 0.2);

const grapeModel = CreateModelOnPedistal("Assets (3D)/Blender Files/Grape/Grape.gltf", false, -2.136, 0.972, -0.975, 1.877, 0.1, 0.1, 0.1, 0, 90, 0, 2);

const grapeTextHolder = CreateTextHolder("Grape model text", -1.582, 1.510, -0.988);

const artPieceModel = CreateModelOnPedistal("Assets (3D)/Blender Files/Art Piece/Art Piece 1.gltf", false, -2.129, 0.972, 2.620, 2.159, 0.1, 0.1, 0.1, 0, 90, -3.160, 2.339);

const kettleModel = CreateModelOnPedistal("Assets (3D)/Blender Files/Kettle/Kettle.gltf", true, -2.129, 0.972, 0.945, 1.867, 0.1, 0.1, 0.1, 0, 90, 0, 2.525);

//Sound
backgroundMusic = new Howl({
    src: ['Music/The Vibing Lam (Loop).mp3'],
    autoplay: false,
    loop: true,
    volume: 0.5
});

//Set all event listeners

/*cube.addEventListener("click", () => {
    TextHolderToggleVisibility(textHolder);
});*/

grapeModel.addEventListener("click", () =>{
    TextHolderToggleVisibility(grapeTextHolder);
});

function CreateModelOnPedistal(modelPath, pedistalLowPoly, pedistalX, pedistalY, pedistalZ, modelY, modelScaleX, modelScaleY, modelScaleZ, modelRotationX, modelRotationY, modelRotationZ, spotlightY)
{
    let pedistalPath = "";
    if(pedistalLowPoly) pedistalPath = "Assets (3D)/Blender Files/Lobby Props/Display Pedistal (Low Poly).gltf";
    else pedistalPath = "Assets (3D)/Blender Files/Lobby Props/Display Pedistal (High Poly).gltf";

    const pedistal = new Model(pedistalPath);
    pedistal.setPosition(pedistalX, pedistalY, pedistalZ);
    pedistal.setScale(0.3, 0.3, 0.3);

    const model = new Model(modelPath);
    model.setPosition(pedistalX, modelY, pedistalZ);
    model.setRotation(modelRotationX, modelRotationY, modelRotationZ);
    model.setScale(modelScaleX, modelScaleY, modelScaleZ);

    const spotlight = new SpotLight();
    spotlight.setPosition(pedistalX, spotlightY, pedistalZ);
    spotlight.setDistance(0.93);
    spotlight.setTarget(model);

    return model;
}

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
        backgroundMusic.play();
    }
}

function TextFitInHolder(text)
{
    let newText = text;
    let newLines = 13 - (text.split(/\r\n|\r|\n/).length);
    for(var i = 0; i < newLines; i++) newText += "\n";
    return newText;
}