const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors=document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const Mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR="#2c2c2c";
const CANVAS_SIZE="700";
ctx.strokeStyle = INITIAL_COLOR;/*우리가 그릴 선의 색상이 가질 초기색 */
ctx.lineWidth = 2.5;
ctx.fillStyle=INITIAL_COLOR;
/*css로 사이즈를 지정했어도 canvas가 다룰 픽셀을 따로 지정해줘야된다. */
canvas.width= CANVAS_SIZE;
canvas.height=CANVAS_SIZE;

let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}
function stopPainting(){
    painting=false;
}

function onMouseMove(event){
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){
        ctx.beginPath();/*path는 선이다 마우스가 만드는 선. */
        ctx.moveTo(x,y); 
        /*위에 두개는 계속 실행되지만 사용되지 않음. */

    }else{/*lineTo,stroke는 내가 마우스를 움직이는 내내 발생함 */
        ctx.lineTo(x,y);
        ctx.stroke();/*stroke의 사전적 의미 -> 획을긋다 */
        /*ctx.closePath()를 하면 직선을 그리면서 가시밤송이같은 사선을 그릴 수 있네ㅎㅎ참고하자 */
    }
}

function onMouseDown(event){
    painting = true;
}

function handleColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle= color;
}

function handleRange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleFill(){
    if(filling === true){
        filling = false;
        Mode.innerText="Fill";
    }else{
        filling =true;
        Mode.innerText="Paint";
    }
}

function handleCanvasClick(){
    if(filling){
    ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
    }
}
function handleCM(event){
    event.preventDefault();
}
function handleSaveClick(){
    const image =canvas.toDataURL("image/jpeg");/*png로 저장하고 싶으면 저거 괄호 안에 지우면 된당 */
    const link =document.createElement("a");
    link.href=image;
    link.download ="PaintJS";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove" , onMouseMove);
    canvas.addEventListener("mousedown" ,startPainting);
    canvas.addEventListener("mouseup" ,stopPainting);
    canvas.addEventListener("mouseleave" ,stopPainting);
    canvas.addEventListener("click" ,handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);/**마우스 우클릭으로 컨텍스트메뉴 못뜨게 하는거 */
}

if(range){
    range.addEventListener("input",handleRange);
}
if(Mode){
    Mode.addEventListener("click" ,handleFill);
}
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}

/*배열을 만들고, colors에 저장된 9개의 태그들이 배열이되면 forEach로 하나씩 실행하는 함수 */
Array.from(colors).forEach(color => color.addEventListener("click",handleColor));
