const controls = new Controls(50);
controls.setSpeed(100);
controls.enableMovement();

const room = new Model("Assets (3D)/Blender Files/Lobby/Lobby Room.gltf");
room.setPosition(1, 1, 1);
room.setScale(0.2, 0.2, 0.2);

const grapeModel = CreateModelOnPedistal("Assets (3D)/Blender Files/Grape/Grape.gltf", false, -2.136, 0.972, -0.975, 1.877, 0.1, 0.1, 0.1, 0, 90, 0, 2.404);

const grapeTextHolder = CreateTextHolder("", -1.582, 1.626, -0.975);

const artPieceModel = CreateModelOnPedistal("Assets (3D)/Blender Files/Art Piece/Art Piece 1.gltf", false, -2.129, 0.972, 2.620, 2.159, 0.1, 0.1, 0.1, 0, 90, -3.160, 2.339);

const artPieceTextHolder = CreateTextHolder("", -1.582, 1.626, 2.620);

const kettleModel = CreateModelOnPedistal("Assets (3D)/Blender Files/Kettle/Kettle.gltf", true, -2.129, 0.972, 0.945, 1.867, 0.1, 0.1, 0.1, 0, 90, 0, 2.525);

const kettleTextHolder = CreateTextHolder("", -1.582, 1.626, 0.945);

const potModel = CreateModelOnPedistal("Assets (3D)/Blender Files/Pot (Low Poly)/Pot (Low Poly).gltf", true, 0.991, 0.972, 4.145, 1.871, 0.15, 0.15, 0.15, 180, 0, 0, 2.4);

const potTextHolder = CreateTextHolder("", 0.991, 1.626, 3.591);

const chairModel = new Model("Assets (3D)/Blender Files/Stoel/Stoel.gltf");
chairModel.setPosition(4.334, 0.993, 1.022);
chairModel.setRotation(0, 270, 0);
chairModel.setScale(0.2, 0.2, 0.2);

const chairTextHolder = CreateTextHolder("", 3.603, 1.371, 1.022);

//Create all garbage

//Art piece 1 model garbage
CreateSprayCan(-2.368, 4.210);
CreatePaintCan(-2.719, 3.848);
CreateMetalPaintCan(-1.871, 4.700);
CreateTF2PaintCan(-2.289, 4.700);

//Grape model garbage
CreateSprayCan(-2.691, -2.307);
CreateTF2PaintCan(-2.858, -1.713);

//Kettle model garbage
CreatePaintCan(-2.580, 0.380, 75);
CreateSprayCan(-2.691, 0.636);

//Chair model garbage
CreateSprayCan(4.693, 0.386);
CreateSprayCan(4.693, 1.527, 79.41);
CreateTF2PaintCan(4.747, 0.829);

//Pot model garbage
CreateSprayCan(1.525, 4.620);
CreateSprayCan(0.536, 4.699, 52.29);

//Sound
backgroundMusic = new Howl({
    src: ['Music/The Vibing Lam (Loop).mp3'],
    autoplay: false,
    loop: true,
    volume: 0.1
});

//Set all event listeners

grapeModel.addEventListener("click", () =>{
    TextHolderToggleVisibility(grapeTextHolder);
});

kettleModel.addEventListener("click", () =>{
    TextHolderToggleVisibility(kettleTextHolder);
});

artPieceModel.addEventListener("click", () =>{
    TextHolderToggleVisibility(artPieceTextHolder);
});

potModel.addEventListener("click", () =>{
    TextHolderToggleVisibility(potTextHolder);
});

chairModel.addEventListener("click", () =>{
    TextHolderToggleVisibility(chairTextHolder);
});

function CreateSprayCan(x, z, rotationY = 0)
{
    const sprayCanModel = new Model("Assets (3D)/Models/spray_can/scene.gltf");
    sprayCanModel.setPosition(x, 0.998, z);
    sprayCanModel.setRotation(0, rotationY, 0);
    sprayCanModel.setScale(0.1, 0.1, 0.1);

    return sprayCanModel;
}

function CreatePaintCan(x, z, rotationY = 0)
{
    const paintCanModel = new Model("Assets (3D)/Models/paint_can/scene.gltf");
    paintCanModel.setPosition(x, 0.993, z);
    paintCanModel.setRotation(0, rotationY, 0);
    paintCanModel.setScale(0.05, 0.05, 0.05);

    return paintCanModel;
}

function CreateMetalPaintCan(x, z, rotationY = 0)
{
    const metalPaintCanModel = new Model("Assets (3D)/Models/metal_paint_can/scene.gltf");
    metalPaintCanModel.setPosition(x, 0.997, z);
    metalPaintCanModel.setRotation(0, rotationY, 0);
    metalPaintCanModel.setScale(0.017, 0.017, 0.017);

    return metalPaintCanModel;
}

function CreateTF2PaintCan(x, z, rotationY = 0)
{
    const tf2PaintCanModel = new Model("Assets (3D)/Models/tf2_paint_can/scene.gltf");
    tf2PaintCanModel.setPosition(x, 0.997, z);
    tf2PaintCanModel.setRotation(0, rotationY, 0);
    tf2PaintCanModel.setScale(0.1, 0.1, 0.1);

    return tf2PaintCanModel;
}

function SetTextHolderText(grapeText, kettleText, artPieceText, potText, chairText)
{
    ChangeTextHolderText(grapeTextHolder, grapeText);
    ChangeTextHolderText(kettleTextHolder, kettleText);
    ChangeTextHolderText(artPieceTextHolder, artPieceText);
    ChangeTextHolderText(potTextHolder, potText);
    ChangeTextHolderText(chairTextHolder, chairText);
}

function ChangeTextHolderText(textHolder, text)
{
    let textElement = document.getElementById(textHolder.getId()).childNodes[0];
    textElement.setAttribute("value", TextFitInHolder(text));
}

function CreateModelOnPedistal(modelPath, pedistalLowPoly, pedistalX, pedistalY, pedistalZ, modelY, modelScaleX, modelScaleY, modelScaleZ, modelRotationX, modelRotationY, modelRotationZ, spotlightY, mtlPath  = "")
{
    let pedistalPath = "";
    if(pedistalLowPoly) pedistalPath = "Assets (3D)/Blender Files/Lobby Props/Display Pedistal (Low Poly).gltf";
    else pedistalPath = "Assets (3D)/Blender Files/Lobby Props/Display Pedistal (High Poly).gltf";

    const pedistal = new Model(pedistalPath);
    pedistal.setPosition(pedistalX, pedistalY, pedistalZ);
    pedistal.setScale(0.3, 0.3, 0.3);

    let model;

    if(mtlPath == "") model = new Model(modelPath);
    else model = new Model(modelPath, mtlPath);

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
    textHolder.setScale(0, 0, 0);
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