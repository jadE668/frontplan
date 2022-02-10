const radius = 5
const button = document.querySelectorAll(".btn")
const imgItems = document.querySelectorAll(".img")

let idCounter = 0
let canv = document.getElementById('canvas')
let ctx = canv.getContext('2d')

let state = {
    points: {}
};

canv.addEventListener('mousedown', (event) => {
    let x = event.offsetX
    let y = event.offsetY

    let nodeId = getNodeIdAtPoint(x, y)
    state.mouseDownPointId = nodeId
});
canv.addEventListener('mouseup', (event) => {
    let x = event.offsetX
    let y = event.offsetY

    let nodeId = getNodeIdAtPoint(x, y)
    state.mouseUpPointId = nodeId

    checkIfNeedDrawEdge()

})

function checkIfNeedDrawEdge() {
    let startPoint = state.mouseDownPointId
    let endPoint = state.mouseUpPointId

    if (startPoint !== -1 && endPoint !== -1 && startPoint !== endPoint) {
        let xStart = state.points[startPoint].x
        let yStart = state.points[startPoint].y
        let xEnd = state.points[endPoint].x
        let yEnd = state.points[endPoint].y

        ctx.beginPath()
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'darksalmon';
        ctx.moveTo(xStart, yStart)
        ctx.lineTo(xEnd, yEnd)
        ctx.stroke()
    }
}

canv.addEventListener("click", function (event) {
    let x = event.offsetX
    let y = event.offsetY

    let nodeId = getNodeIdAtPoint(x, y)

    if (nodeId !== -1)
        return

    if (!state.points) {
        state.points = [];
    }

    state.points[idCounter++] = {
        'x': x,
        'y': y
    }

    console.log(state.points)


    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.fillStyle = 'darksalmon';
    ctx.strokeStyle = 'darksalmon';
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    /*ctx.fill();*/
    ctx.stroke();
})

function getNodeIdAtPoint(x, y) {
    for (const [id, point] of Object.entries(state.points)) {
        let xContain = x >= point.x - radius & x <= point.x + radius;
        let yContain = y >= point.y - radius & y <= point.y + radius;
        if (xContain & yContain)
            return id
    }
    return -1;
}

button.forEach(function(item){
    item.addEventListener("click", function(){
        let currentBtn = item;
        let btnId = currentBtn.getAttribute("data-btn")
        let currentImg = document.querySelector(btnId)

        button.forEach(function(item){
            item.classList.remove('active')
        });
        imgItems.forEach(function(item){
            item.classList.remove('active')
        });

        currentBtn.classList.add('active');
        currentImg.classList.add('active');
    });
});

