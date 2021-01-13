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
//infoText.elem.setAttribute("look-at", "#head");

cube.addEventListener('click', () => textHolder.setVisible(true));

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
