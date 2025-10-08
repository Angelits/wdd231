const canvas = document.getElementById('snow');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const snowflakes = Array.from({length: 100}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 4 + 1,
    d: Math.random() * 1
}));

function drawSnow() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    snowflakes.forEach(f => {
        ctx.moveTo(f.x, f.y);
        ctx.arc(f.x, f.y, f.r, 0, Math.PI*2);
    });
    ctx.fill();
    updateSnow();
}

function updateSnow() {
    snowflakes.forEach(f => {
        f.y += Math.pow(f.d, 2) + 1;
        if(f.y > canvas.height) {
            f.y = -f.r;
            f.x = Math.random()*canvas.width;
        }
    });
}

setInterval(drawSnow, 25);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
