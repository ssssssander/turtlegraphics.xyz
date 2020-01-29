const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const examples = [
    'Dead tree|a:15;r:0.75;d:20;g:7;stststfldrrd',
    'Twisted tree|a:25;r:0.75;d:20;g:8;mfsstldrfrfrfrtd',
    'Winter tree|a:15;g:10;s:180;d:10;r:0.9;fss?d?s?s?b',
    'Geometree|a:36;d:15;g:8;r:0.75;c:0.3;fffsldrrdlc',
    'Bubbler|d:20;a:36;g:7;r:0.75;b:3;???nnfrfrfrfrfrfrfrfrfrfllnbbc',
    'Squiggler|a:18;d:10;g:20;r:0.95;mrsrsrsrsrsrsrsrsrsrsrsrsrsrsrsrsd',
    'Seaweed|d:15;a:25;r:0.5;sssf?d?sssf?d?sssfbbc',
    'Roots|a:15;r:1.25;d:5;g:8;s:0;c:0.15;tststsmbmdc',
    'Hypnoshrub|g:10;a:25;r:0.75;d:20;mfrbrrr?f?fd',
    'Tuft|d:20;g:10;r:0.9;a:16;mtlfllrdmfrfrfrfc',
    'Lucky sapling|a:15;r:0.75;d:35;g:7;?s?sbbbbb',
    'Spiral|a:16;g:350;d:25;r:0.99;cnrd',
    'Brick spiral|d:20;g:30;r:0.9;flfrflfrfrflflfrfrflfrfrflfrflfd',
    'Star|a:72;d:50;frrfld',
    'Sun|a:18;g:10;d:100;r:0.5;b:16;ncrd',
    'Triskel|a:18;r:0.9;d:20;g:30;b:3;frfrfrfrfrd',
    'Hierarchy, 1|r:0.5;d:25;g:8;ffsssldrrd',
    'Hierarchy, 2|r:0.5;d:25;g:5;ffsssldrdrd',
    'Dementia|a:45;r:0.75;d:20;g:7;mfdrrflflflfrrfb?b',
    'Bad seed|a:45;r:0.75;d:20;g:7;mfrfllffrrfrdbb',
    'Lost|d:20;g:30;r:0.75;a:45;?mfnrfnrfnrfnnd',
    'Mollusca|a:33;r:0.9;d:30;g:35;nldfrfrcfrfrfrfrfrrrrflflflf',
    'Turtles|a:45;r:0.75;d:10;g:8;s:90;fffflflfflfflfffflfflfflflf---rrrrffrfrfrrnc-llfrfrffrfrffrflflflflflfrrnnrrflflflflfnnnnnllnnnnrrrrsssd',
    'Willekeurig|'
];

for (let i in examples) {
    let li = document.createElement('li');
    let button = document.createElement('button');
    button.addEventListener('click', () => {
        if (examples[i] == 'Willekeurig|') {
            randomGenome();
        } else {
            setGenome(examples[i].split('|')[1]);
        }
    });
    button.textContent = examples[i].split('|')[0];
    li.appendChild(button);
    $('#examples').appendChild(li);
}

let col = [];
col[0] = [];
col[1] = [];
col[0]['r'] = 36;
col[0]['g'] = 218;
col[0]['b'] = 255;
col[1]['r'] = 115;
col[1]['g'] = 97;
col[1]['b'] = 75;

let bots = [];

class Bot {
    constructor(x, y, a, l, d, m) {
        this.x = x;
        this.y = y;
        this.a = a;
        this.l = l;
        this.d = d;
        this.m = m;

        bots.push(this);
    }

    draw() {
        if (this.l < gen && steps < maxSteps) {
            for (let i = 0; i < code.length; i++) {
                if (code[i] == 'f' || (code[i] == 's' && Math.round(Math.random()) == 1)) {
                    cxt.strokeStyle = 'rgb(' +
                        (Math.floor(col[1]['r'] * (this.l / gen) + col[0]['r'] * (1 - this.l / gen))) + ',' +
                        (Math.floor(col[1]['g'] * (this.l / gen) + col[0]['g'] * (1 - this.l / gen))) + ',' +
                        (Math.floor(col[1]['b'] * (this.l / gen) + col[0]['b'] * (1 - this.l / gen))) +
                        ')';
                    cxt.beginPath();
                    cxt.moveTo(Math.floor(this.x), Math.floor(this.y));
                    this.x += Math.sin((startA - this.a) / 180 * Math.PI) * this.d;
                    this.y += Math.cos((startA - this.a) / 180 * Math.PI) * this.d;
                    cxt.lineTo(Math.floor(this.x), Math.floor(this.y));
                    cxt.stroke();
                } else if (code[i] == 'c') {
                    cxt.fillStyle = 'rgb(' +
                        (Math.floor(col[1]['r'] * (this.l / gen) + col[0]['r'] * (1 - this.l / gen))) + ',' +
                        (Math.floor(col[1]['g'] * (this.l / gen) + col[0]['g'] * (1 - this.l / gen))) + ',' +
                        (Math.floor(col[1]['b'] * (this.l / gen) + col[0]['b'] * (1 - this.l / gen))) +
                        ')';
                    cxt.beginPath();
                    cxt.arc(Math.floor(this.x), Math.floor(this.y), this.d / 2 * circleS, 0, Math.PI * 2, true);
                    cxt.closePath();
                    cxt.fill();
                } else if (code[i] == 'n') {
                    this.x += Math.sin((startA - this.a) / 180 * Math.PI) * this.d;
                    this.y += Math.cos((startA - this.a) / 180 * Math.PI) * this.d;
                } else if (code[i] == '-') {
                    this.x -= Math.sin((startA - this.a) / 180 * Math.PI) * this.d;
                    this.y -= Math.cos((startA - this.a) / 180 * Math.PI) * this.d;
                } else if (code[i] == 'l') {
                    this.a -= ang * this.m;
                } else if (code[i] == 'r') {
                    this.a += ang * this.m;
                } else if (code[i] == 't') {
                    this.a += choose([-ang, ang]);
                } else if (code[i] == '?') {
                    this.a += choose([-ang, 0, ang]);
                } else if (code[i] == 'm') {
                    this.m = choose([-1, 1]);
                } else if (code[i] == 'd') {
                    let child = new Bot(this.x, this.y, this.a, this.l + 1, this.d * ratio, this.m);
                    child.draw();
                } else if (code[i] == 'b') {
                    if (choose([0, 1]) == 0) {
                        let child = new Bot(this.x, this.y, this.a, this.l + 1, this.d * ratio, this.m);
                        child.draw();
                    }
                }

                if (steps >= maxSteps) break;
                steps++;

            }

        }
    }
}



let c = $('#canvas');
let cxt = c.getContext('2d');

function choose(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function setGenome(what) {
    $('#code-input').value = what;
    redraw();
}

function redraw() {
    len = 10;
    ratio = 1;
    gen = 5;
    ang = 90;
    startA = 180;
    sym = 1;
    circleS = 1;
    code = $('#code-input').value;

    code = code.split(';');
    actualCode = '';

    for (let i in code) {
        let thisBit = code[i].split(':');
        if (!thisBit[1]) actualCode += thisBit[0];
        else if (thisBit[0] == 'a') ang = parseInt(thisBit[1]);
        else if (thisBit[0] == 'g') gen = parseInt(thisBit[1]);
        else if (thisBit[0] == 's') startA = parseInt(thisBit[1]);
        else if (thisBit[0] == 'd') len = parseInt(thisBit[1]);
        else if (thisBit[0] == 'r') ratio = parseFloat(thisBit[1]);
        else if (thisBit[0] == 'b') sym = parseInt(thisBit[1]);
        else if (thisBit[0] == 'c') circleS = parseFloat(thisBit[1]);
    }
    ratio = Math.min(Math.max(0, ratio), 2);
    len = Math.min(Math.max(1, len), 100);
    sym = Math.min(Math.max(1, sym), 32);
    circleS = Math.min(Math.max(0.05, circleS), 4);
    code = actualCode;

    newBot = 0;
    bots = [];
    cxt.clearRect(0, 0, 600, 600);

    steps = 0;
    maxSteps = 10000;

    for (let i = 0; i < sym; i++) {
        let newBot = new Bot(300, 300, Math.floor((i / sym) * 360), 0, len, 1);
        newBot.draw();
    }

    let warning = '';
    if (steps >= maxSteps - 1) {
        warning = 'Je programma is gestopt om een crash te vermijden, probeer het aantal duplicaties, generaties of branches te verminderen.';

    }
    $('#warning').innerHTML = warning;
}

function randomGenome() {
    let newCode = '';
    for (let i = 0; i < Math.floor(Math.random() * 15) + 2; i++) {
        newCode += choose('ffffn-llrrdbssstt??mc');
    }
    newCode += choose('dbn');
    setGenome('a:' + choose(['135', '45', '90', '36', '18', '12', '10', '8', '6']) + ';' + 'g:' + (Math.floor(Math.random() * 10) + 4) + ';' + 's:' + choose(['0', '90', '180', '270']) + ';' + 'd:' + (Math.floor(Math.random() * 20) + 10) + ';' + 'r:' + (Math.floor(Math.random() * 10) / 10 + 0.5) + ';' + 'c:' + (Math.floor(Math.random() * 10) / 10 + 0.1) + ';' + newCode);
}


redraw();

$('#code-button').addEventListener('click', redraw);
$('#code-input').addEventListener('keyup', redraw);
