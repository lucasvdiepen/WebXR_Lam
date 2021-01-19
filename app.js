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

//Sound
backgroundMusic = new Howl({
    src: ['Music/The Vibing Lam (Loop).mp3'],
    autoplay: false,
    loop: true,
    volume: 0.5
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

function SetTextHolderText(grapeText, kettleText, artPieceText, potText)
{
    ChangeTextHolderText(grapeTextHolder, grapeText);
    ChangeTextHolderText(kettleTextHolder, kettleText);
    ChangeTextHolderText(artPieceTextHolder, artPieceText);
    ChangeTextHolderText(potTextHolder, potText);
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