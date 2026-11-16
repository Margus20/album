// ====== MAZO DE BARAJITAS ======
const deck = [
    {id:1,  name:"Mbappé",    team:"Francia",     color:"#1e3a8a", emoji:"⚽"},
    {id:2,  name:"Messi",     team:"Argentina",   color:"#38bdf8", emoji:"🐐"},
    {id:3,  name:"Vinicius",  team:"Brasil",      color:"#16a34a", emoji:"🇧🇷"},
    {id:4,  name:"Haaland",   team:"Noruega",     color:"#dc2626", emoji:"🤖"},
    {id:5,  name:"Bellingham",team:"Inglaterra",  color:"#7f1d1d", emoji:"🦁"},
    {id:6,  name:"Lautaro",   team:"Argentina",   color:"#0ea5e9", emoji:"🐂"},
    {id:7,  name:"Salah",     team:"Egipto",      color:"#ca8a04", emoji:"👑"},
    {id:8,  name:"Lewandowski",team:"Polonia",    color:"#b91c1c", emoji:"🇵🇱"},
    {id:9,  name:"De Bruyne", team:"Bélgica",     color:"#facc15", emoji:"🎯"},
    {id:10, name:"Neymar",    team:"Brasil",      color:"#22c55e", emoji:"🇧🇷"},
    {id:11, name:"Modric",    team:"Croacia",     color:"#ef4444", emoji:"🧠"},
    {id:12, name:"Pedri",     team:"España",      color:"#f97316", emoji:"🇪🇸"},
    {id:13, name:"Ronaldo",   team:"Portugal",    color:"#15803d", emoji:"🇵🇹"},
    {id:14, name:"Griezmann", team:"Francia",     color:"#1d4ed8", emoji:"🇫🇷"},
    {id:15, name:"Rodrygo",   team:"Brasil",      color:"#65a30d", emoji:"🇧🇷"},
    {id:16, name:"Saka",      team:"Inglaterra",  color:"#991b1b", emoji:"🦁"},
    {id:17, name:"Dybala",    team:"Argentina",   color:"#0284c7", emoji:"🇦🇷"},
    {id:18, name:"Musiala",   team:"Alemania",    color:"#a16207", emoji:"🇩🇪"},
    {id:19, name:"Osimhen",   team:"Nigeria",     color:"#166534", emoji:"🇳🇬"},
    {id:20, name:"Kane",      team:"Alemania",    color:"#b45309", emoji:"🇩🇪"},
    {id:21, name:"Foden",     team:"Inglaterra",  color:"#7f1d1d", emoji:"🦁"},
    {id:22, name:"Alvarez",   team:"Argentina",   color:"#0ea5e9", emoji:"🐐"},
    {id:23, name:"Jamal",     team:"Alemania",    color:"#a16207", emoji:"🇩🇪"},
    {id:24, name:"Nico",      team:"España",      color:"#ea580c", emoji:"🇪🇸"}
];

const pastedIds = new Set(JSON.parse(localStorage.getItem('barajitasPegadas') || '[]'));

function crearSlots() {
    for (let n = 1; n <= 4; n++) {
        const grid = document.getElementById('grid' + n);
        for (let i = 0; i < 6; i++) grid.appendChild(nuevoSlot());
    }
    pastedIds.forEach(id => {
        const card = deck.find(c => c.id === id);
        if (card) pegarBarajita(card, true);
    });
}
function nuevoSlot() {
    const s = document.createElement('div');
    s.className = 'slot';
    s.textContent = 'espacio';
    return s;
}

function pegarBarajita(card, silencioso = false) {
    const slots = [...document.querySelectorAll('.slot')];
    const libre = slots.find(s => !s.classList.contains('filled'));
    if (!libre) return false;
    libre.classList.add('filled');
    libre.textContent = '';
    const st = document.createElement('div');
    st.className = 'sticker';
    st.style.background = card.color;
    st.innerHTML = `<div class="num">#${card.id}</div><div class="emoji">${card.emoji}</div><div class="name">${card.name}</div>`;
    libre.appendChild(st);
    pastedIds.add(card.id);
    if (!silencioso) {
        localStorage.setItem('barajitasPegadas', JSON.stringify([...pastedIds]));
    }
    return true;
}

document.getElementById('btnSobre').addEventListener('click', () => {
    document.getElementById('sobreScreen').classList.add('visible');
    document.getElementById('envelope').classList.remove('open');
    document.getElementById('bandeja').innerHTML = '';
    document.getElementById('btnCerrar').classList.remove('visible');
});

document.getElementById('envelope').addEventListener('click', () => {
    const env = document.getElementById('envelope');
    if (env.classList.contains('open')) return;
    env.classList.add('open');

    const disponibles = deck.filter(c => !pastedIds.has(c.id));
    const picks = [];
    while (picks.length < 5 && disponibles.length > 0) {
        const idx = Math.floor(Math.random() * disponibles.length);
        picks.push(disponibles.splice(idx, 1)[0]);
    }

    const bandeja = document.getElementById('bandeja');
    picks.forEach((card, i) => {
        setTimeout(() => {
            const el = document.createElement('div');
            el.className = 'card-out';
            el.style.background = card.color;
            el.innerHTML = `<div>#${card.id}</div><div style="font-size:20px">${card.emoji}</div><div>${card.name}</div>`;
            bandeja.appendChild(el);
            requestAnimationFrame(() => el.classList.add('show'));
        }, 500 + i * 250);
    });

    setTimeout(() => {
        picks.forEach(c => pegarBarajita(c));
        document.getElementById('btnCerrar').classList.add('visible');
    }, 500 + picks.length * 250 + 600);
});

document.getElementById('btnCerrar').addEventListener('click', () => {
    document.getElementById('sobreScreen').classList.remove('visible');
});

crearSlots();
const pageFlip = new St.PageFlip(document.getElementById('book'), {
    width: 380, height: 560, size: "stretch",
    minWidth: 280, maxWidth: 500, minHeight: 380, maxHeight: 700,
    showCover: true, mobileScrollSupport: true
});
pageFlip.loadFromHTML(document.querySelectorAll('.page'));
