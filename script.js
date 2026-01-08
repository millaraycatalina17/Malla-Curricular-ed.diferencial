// 1. Datos de los ramos y sus requisitos (ID del requisito)
const datosMalla = [
    {
        semestre: 1,
        ramos: [
            { id: "div1", nombre: "Diversidad en inclusión", req: null },
            { id: "fund1", nombre: "Fundamentos del currículo", req: null },
            { id: "neet1", nombre: "NEE transitorias", req: null },
            { id: "danza1", nombre: "Taller de danza", req: null },
            { id: "abp1", nombre: "Taller integrado ABP", req: null },
            { id: "ing1", nombre: "Inglés I", req: null },
            { id: "ofim1", nombre: "Herramientas de ofimática", req: null }
        ]
    },
    {
        semestre: 2,
        ramos: [
            { id: "bra2", nombre: "Braille", req: "div1" },
            { id: "psic2", nombre: "Psicología", req: null },
            { id: "sen2", nombre: "Lenguas de señas", req: "div1" },
            { id: "neep2", nombre: "NEE permanentes", req: "neet1" },
            { id: "mus2", nombre: "Taller de música y juegos", req: "danza1" },
            { id: "lang2", nombre: "Taller de habilidades de lenguaje", req: null },
            { id: "prac1", nombre: "Taller práctica pedagogía I", req: "abp1" },
            { id: "ing2", nombre: "Inglés II", req: "ing1" }
        ]
    },
    {
        semestre: 3,
        ramos: [
            { id: "prot3", nombre: "Protocolos de atención infantil", req: "psic2" },
            { id: "corp3", nombre: "Desarrollo de la corporalidad", req: "mus2" },
            { id: "estneet3", nombre: "Estratg. inter. para NEET", req: "neep2" },
            { id: "teat3", nombre: "Taller de teatro", req: null },
            { id: "plas3", nombre: "Taller de técnicas plásticas", req: null },
            { id: "prac2", nombre: "Taller práctica pedagógica II", req: "prac1" },
            { id: "com3", nombre: "Comunicación y aprendizaje", req: "lang2" },
            { id: "inn3", nombre: "Innovación y transferencia", req: "ofim1" }
        ]
    },
    {
        semestre: 4,
        ramos: [
            { id: "salu4", nombre: "Salud y primeros auxilios", req: "prot3" },
            { id: "proj4", nombre: "Taller de proyecto", req: "inn3" },
            { id: "estneep4", nombre: "Estratg. inter. para NEEP", req: "estneet3" },
            { id: "pracInt4", nombre: "Práctica integrada de competencias", req: "prac2" },
            { id: "sust4", nombre: "Sustentabilidad y emprendimiento", req: null },
            { id: "cult4", nombre: "Cultura y sociedad", req: null },
            { id: "prof4", nombre: "Desarrollo profesional", req: null }
        ]
    }
];

// 2. Cargar progreso desde LocalStorage
let aprobados = JSON.parse(localStorage.getItem('ramosAprobados')) || [];

const mallaDiv = document.getElementById('malla');
const contadorText = document.getElementById('contador');

function renderizarMalla() {
    mallaDiv.innerHTML = '';
    
    datosMalla.forEach(sem => {
        const col = document.createElement('div');
        col.className = 'semestre';
        col.innerHTML = `<h3>Semestre ${sem.semestre}</h3>`;
        
        sem.ramos.forEach(ramo => {
            const ramoDiv = document.createElement('div');
            ramoDiv.className = 'ramo';
            ramoDiv.innerText = ramo.nombre;
            ramoDiv.id = ramo.id;

            // Verificar si ya está aprobado
            if (aprobados.includes(ramo.id)) {
                ramoDiv.classList.add('aprobado');
            }

            // Manejo de clic
            ramoDiv.onclick = () => toggleRamo(ramo);
            
            col.appendChild(ramoDiv);
        });
        mallaDiv.appendChild(col);
    });
    actualizarContador();
}

function toggleRamo(ramo) {
    const index = aprobados.indexOf(ramo.id);

    if (index > -1) {
        // Si ya está aprobado, lo quitamos (con confirmación o simple)
        aprobados.splice(index, 1);
    } else {
        // Si no está aprobado, verificamos requisito
        if (ramo.req && !aprobados.includes(ramo.req)) {
            const nombreReq = buscarNombrePorId(ramo.req);
            alert(`¡Alto! No puedes aprobar este ramo sin antes completar: ${nombreReq}`);
            return;
        }
        aprobados.push(ramo.id);
    }

    localStorage.setItem('ramosAprobados', JSON.stringify(aprobados));
    renderizarMalla();
}

function buscarNombrePorId(id) {
    let nombre = "";
    datosMalla.forEach(s => s.ramos.forEach(r => {
        if(r.id === id) nombre = r.nombre;
    }));
    return nombre;
}

function actualizarContador() {
    contadorText.innerText = aprobados.length;
}

// Botón Reset
document.getElementById('reset-btn').addEventListener('click', () => {
    if(confirm("¿Seguro que quieres borrar todo tu progreso?")) {
        aprobados = [];
        localStorage.removeItem('ramosAprobados');
        renderizarMalla();
    }
});

// Inicio
renderizarMalla();
              
