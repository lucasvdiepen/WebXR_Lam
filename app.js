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

const textHolder = CreateTextHolder(0, 1.5, -1.5);

const lowPolyPedistal = new Model("Assets (3D)/Blender Files/Lobby Props/Display Pedistal (Low Polly).gltf");
lowPolyPedistal.setPosition(1.998, 0.990, -0.975);
lowPolyPedistal.setScale(0.15, 0.15, 0.15);

const highPolyPedistal = new Model("Assets (3D)/Blender Files/Lobby Props/Display Pedistal (High Polly).gltf");
highPolyPedistal.setPosition(1.385, 0.985, -0.975);
highPolyPedistal.setScale(0.15, 0.15, 0.15);

//Set all event listeners

cube.addEventListener("click", () => {
    TextHolderToggleVisibility(textHolder);
});
highPolyPedistal.addEventListener("click", () => lowPolyPedistal.toggleVisibility());

function CreateTextHolder(x, y, z)
{
    const textHolder = new Cube();
    textHolder.setVisible(false);
    textHolder.setColor("#000000");
    textHolder.setPosition(0, 1.5, -1.5);
    textHolder.setScale(0.850, 0.6, 0.03);
    textHolder.setOpacity(0.6);
    textHolder.elem.setAttribute("look-at", "#head");

    const infoText = new Text(TextFitInHolder("Dit is een tekst\nDit is een andere tekst"), textHolder.getId());
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
