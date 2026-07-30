

function delay(fn,time){
    introTimers.push(setTimeout(fn,time));
}

/* =========================================
   INTRO : TWO DIMENSIONAL CHROMATOGRAPHY
========================================= */

const intro = document.getElementById("intro");

const paper = document.querySelector(".paper");

const sample = document.querySelector(".sample");

const firstSolvent = document.querySelector(".solvent.first");

const secondSolvent = document.querySelector(".solvent.second");

const firstSpots = document.querySelectorAll(".first-spot");

const finalSpots = document.querySelectorAll(".final-spot");

const rotationLayer = document.querySelector(".rotation-layer");

const caption = document.getElementById("intro-caption");

const startBtn = document.getElementById("startBtn");

const studentNameInput =
    document.getElementById("studentName");

let introTimers = [];

function resetChromatography(){

    sample.style.opacity = 0;

    firstSolvent.style.transition = "none";
    firstSolvent.style.width = "0";

    secondSolvent.style.transition = "none";
    secondSolvent.style.height = "0";

    rotationLayer.style.transition = "none";
    rotationLayer.style.transform = "rotate(0deg)";

    firstSpots.forEach(spot=>{
        spot.classList.remove("moved");
        spot.style.opacity = 0;
    });

    finalSpots.forEach(spot=>{
        spot.classList.remove("moved");
        spot.style.opacity = 0;
    });

    caption.textContent =
        "시료를 종이 아래쪽에 떨어뜨립니다.";

}

startChromatography();



function startChromatography(){

resetChromatography();
    /* ① 시료 점적 */

    delay(()=>{

        caption.textContent =
        "① 혼합물을 종이의 원점에 떨어뜨립니다.";

        sample.style.opacity = 1;


    },500);



/* ② 1차 전개 : 용매와 점이 함께 3초간 이동 */
setTimeout(()=>{

    caption.textContent =
    "② 첫 번째 방향으로 용매가 이동하며 물질이 함께 이동합니다.";

    firstSolvent.style.transition = "width 3s linear";
    firstSolvent.style.width = "100%";

    firstSpots.forEach(spot=>{
        spot.style.opacity = 1;
        spot.classList.add("moved");   // left 값이 3s linear로 이동
    });

},1500);


/* ③ 1차 분리 결과 (점은 이미 이동 중, 캡션만 갱신) */
setTimeout(()=>{

    caption.textContent =
    "③ 물질마다 이동 속도가 달라 서로 다른 위치에 도달했습니다.";

},4500);


/* ④ 종이 회전 */
setTimeout(()=>{

    caption.textContent =
    "④ 종이를 90° 회전시켜 두 번째 방향으로 전개합니다.";

    rotationLayer.style.transition = "transform 1.5s ease";
    rotationLayer.style.transform = "rotate(90deg)";

},6000);


/* ⑤ 2차 전개 : 용매와 점이 함께 3초간 이동 */
setTimeout(()=>{

    caption.textContent =
    "⑤ 두 번째 방향으로 전개하면 물질이 평면상에서 분리됩니다.";

    secondSolvent.style.transition = "height 3s linear";
    secondSolvent.style.height = "100%";

    finalSpots.forEach(spot=>{
        spot.style.opacity = 1;
        spot.classList.add("moved");   // bottom 값이 3s linear로 이동
    });

},8000);


/* ⑥ 최종 결과 (점은 이미 도착, 캡션만 갱신) */
setTimeout(()=>{

    caption.textContent =
    "⑥ 방사성 탄소가 포함된 물질이 서로 다른 위치에서 검출됩니다.";

},11500);


/* ⑦ 실험 시작 */

setTimeout(()=>{

    caption.textContent =
        "캘빈의 광합성 실험 결과를 관찰해 봅시다.";

    startBtn.hidden = false;

},13000);


}




startBtn.addEventListener("click",()=>{

    studentName = studentNameInput.value.trim();

    if(studentName === ""){

        alert("이름을 입력하세요.");

        studentNameInput.focus();

        return;

    }

    intro.classList.add("fade-out");

    setTimeout(()=>{

        intro.remove();

        document
            .querySelector(".container")
            .classList.remove("hidden");

    },800);

});
/* =========================================
   ELEMENT
========================================= */

const film = document.getElementById("film");
const tabs = document.querySelectorAll(".time-tab");

const compoundName = document.getElementById("compoundName");
const compoundDescription = document.getElementById("compoundDescription");


/* =========================================
   STATE
========================================= */

let currentStep = "3s";
let selectedSpot = null;
let studentName = "";

let quizAnswers = [];

/* =========================================
   DATA
========================================= */

const spots = [

{
    id:"3pg",
    name:"3PG",

    description:
`광합성 후 짧은 시간 내 방사성 탄소(^14C)가 가장 먼저 검출되는 물질이다.
이산화탄소의 탄소가 캘빈 회로에 처음 고정된 결과를 보여 준다.`,

    steps:{
        "3s":{
            x:520,
            y:500,
            size:28,
            opacity:1
        },

        "30s":{
            x:520,
            y:500,
            size:32,
            opacity:1
        }
    }
},


{
    id:"pgal",
    name:"PGAL",

    description:
`시간이 지나면서 방사성 탄소(^14C)가 3PG에서 PGAL로 이동했음을 보여 준다.
PGAL은 이후 다양한 유기물 합성에 이용되는 중간 생성물이다.`,

    steps:{
        "30s":{
            x:455,
            y:405,
            size:22,
            opacity:0.9
        }
    }
},


{
    id:"hexose",
    name:"6탄당인산",

    description:
`방사성 탄소가 당 합성 과정으로 이동한 결과이다.
광합성으로 고정된 탄소가 탄수화물 형태로 전환되고 있음을 보여 준다.`,

    steps:{
        "30s":{
            x:470,
            y:610,
            size:20,
            opacity:0.85
        }
    }
},


{
    id:"alanine",
    name:"알라닌",

    description:
`방사성 탄소가 아미노산에서도 검출된다.
이는 광합성으로 고정된 탄소가 다양한 유기물 합성에 이용됨을 보여 준다.`,

    steps:{
        "30s":{
            x:70,
            y:95,
            size:22,
            opacity:0.95
        }
    }
},


{
    id:"glutamate",
    name:"글루탐산",

    description:
`광합성으로 고정된 탄소가 다른 대사 과정으로 전달되어
아미노산 합성에도 이용됨을 보여 준다.`,

    steps:{
        "30s":{
            x:405,
            y:40,
            size:14,
            opacity:0.75
        }
    }
},


{
    id:"serine",
    name:"세린",

    description:
`방사성 탄소가 여러 유기물 합성 과정으로 이동했음을 보여 주는 물질이다.`,

    steps:{
        "30s":{
            x:330,
            y:165,
            size:22,
            opacity:0.9
        }
    }
},


{
    id:"glycine",
    name:"글라이신",

    description:
`방사성 탄소가 글라이신에서도 검출된다.
광합성 생성물이 다양한 생합성 경로로 전달됨을 보여 준다.`,

    steps:{
        "30s":{
            x:190,
            y:170,
            size:20,
            opacity:0.8
        }
    }
},


{
    id:"aspartate",
    name:"아스파트산",

    description:
`광합성으로 고정된 탄소가 아미노산 합성에도 이용됨을 보여 준다.`,

    steps:{
        "30s":{
            x:470,
            y:255,
            size:24,
            opacity:0.95
        }
    }
},


{
    id:"sucrose",
    name:"설탕",

    description:
`방사성 탄소가 설탕에서도 검출된다.
이는 광합성으로 고정된 탄소가 저장 형태의 당으로 전환되었음을 의미한다.`,

    steps:{
        "30s":{
            x:190,
            y:430,
            size:10,
            opacity:0.8
        }
    }
},


{
    id:"citrate",
    name:"시트르산",

    description:
`고정된 탄소가 다른 대사 과정으로 이동했음을 보여 준다.`,

    steps:{
        "30s":{
            x:510,
            y:90,
            size:14,
            opacity:0.75
        }
    }
}

];



/* =========================================
   SPOT ELEMENTS
========================================= */

const spotElements = new Map();



/* =========================================
   INITIALIZE
========================================= */

initializeFilm();
initializeTabs();
updateFilm();



/* =========================================
   CREATE SPOTS
========================================= */

function initializeFilm(){

    spots.forEach(spot=>{

        const el=document.createElement("div");

        el.className="spot";





        film.appendChild(el);

        spotElements.set(spot.id,el);

    });

}



/* =========================================
   TAB EVENT
========================================= */

function initializeTabs(){

    tabs.forEach(tab=>{

        tab.addEventListener("click",()=>{

            tabs.forEach(t=>{
                t.classList.remove("active");
            });


            tab.classList.add("active");


            currentStep = tab.dataset.step;


            selectedSpot = null;


            resetInfo();


            updateFilm();

        });

    });

}



/* =========================================
   UPDATE FILM
========================================= */

function updateFilm(){

    spots.forEach(spot=>{


        const el = spotElements.get(spot.id);


        const state = spot.steps[currentStep];


        if(state === undefined){

            el.style.display="none";

            return;

        }


        el.style.display="block";


const scaleX = 420 / 560;
const scaleY = 500 / 650;

el.style.left = (state.x * scaleX) + "px";

el.style.top = (state.y * scaleY) + "px";

el.style.width = (state.size * 0.75) + "px";

el.style.height = (state.size * 0.75) + "px";

el.style.opacity = state.opacity;

let label = el.querySelector(".spot-label");

if(!label){

    label = document.createElement("span");

    label.className = "spot-label";

    el.appendChild(label);

}

label.textContent = spot.name;

        if(selectedSpot === spot.id){

            el.classList.add("selected");

        }
        else{

            el.classList.remove("selected");

        }

    });

}






/* =========================================
   RESET INFO
========================================= */

function resetInfo(){}

/* =========================================
   QUIZ
========================================= */

const quizQuestions = [
    {
        question:
        "광합성 3초 후 오토라디오그램에서 방사성 탄소(¹⁴C)가 가장 먼저 검출되는 물질은 무엇인가요?",
        options:["3PG","PGAL","설탕","알라닌"],
        answer:0,
        explain:
        "3PG는 CO₂가 캘빈 회로에 처음 고정되어 만들어지는 물질이라 가장 먼저 방사성 탄소가 검출됩니다."
    },
{
    question:
    "30초 후 오토라디오그램에서 3초 후보다 방사성 탄소가 검출되는 물질의 종류가 많아진 이유를 쓰시오.",
    answer:"시간이 지나면서 방사성 탄소가 여러 물질로 이동했기 때문이다.",
    explain:
    "시간이 지날수록 3PG에 고정된 탄소가 PGAL, 당류, 아미노산 등 다양한 물질로 전달되기 때문입니다.",
    type:"text"
},
{
    question:
    "캘빈의 방사성 동위원소 추적 실험이 밝혀낸 내용을 쓰시오.",
    answer:"캘빈 회로에서 탄소가 고정되어 여러 물질로 이동하는 경로",
    explain:
    "캘빈은 시간에 따라 방사성 탄소가 검출되는 물질을 추적해 탄소 이동 경로를 밝혀냈습니다.",
    type:"text"
}
];

let quizIndex = 0;

const quizQuestionEl = document.getElementById("quiz-question");
const quizOptionsEl = document.getElementById("quiz-options");
const quizFeedbackEl = document.getElementById("quiz-feedback");
const quizProgressEl = document.getElementById("quiz-progress");
const quizNextBtn = document.getElementById("quizNextBtn");
const submitBtn = document.getElementById("submitBtn");

renderQuiz();

function renderQuiz(){

    const q = quizQuestions[quizIndex];

    quizProgressEl.textContent =
        `${quizIndex + 1} / ${quizQuestions.length}`;

    quizQuestionEl.textContent = q.question;

    quizFeedbackEl.textContent = "";
    quizOptionsEl.innerHTML = "";

    quizNextBtn.disabled = true;
    quizNextBtn.textContent =
        (quizIndex === quizQuestions.length - 1) ? "처음으로" : "다음 문제";

    q.options.forEach((optionText,i)=>{

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "quiz-option";
        btn.textContent = optionText;

        btn.addEventListener("click",()=>{
            selectQuizAnswer(i);
        });

        quizOptionsEl.appendChild(btn);

    });

}

function selectQuizAnswer(selectedIndex){

    const q = quizQuestions[quizIndex];

    quizAnswers[quizIndex] = {
        question: q.question,
        selected: q.options[selectedIndex],
        correct: q.options[q.answer],
        isCorrect: selectedIndex === q.answer
    };

    const optionButtons = quizOptionsEl.querySelectorAll(".quiz-option");

    optionButtons.forEach((btn,i)=>{

        btn.disabled = true;

        if(i === q.answer){
            btn.classList.add("correct");
        }
        else if(i === selectedIndex){
            btn.classList.add("wrong");
        }

    });

    quizFeedbackEl.textContent =
        (selectedIndex === q.answer)
            ? `정답입니다! ${q.explain}`
            : `아쉬워요. ${q.explain}`;

    quizNextBtn.disabled = false;

if(quizIndex === quizQuestions.length - 1){

    submitBtn.hidden = false;

}

}

quizNextBtn.addEventListener("click",()=>{

    quizIndex = (quizIndex + 1) % quizQuestions.length;
    renderQuiz();

});






submitBtn.addEventListener("click",()=>{


    if(studentName === ""){
        alert("이름이 없습니다.");
        return;
    }


    const data = {

        name: studentName,

        answers: quizAnswers

    };


    fetch("https://script.google.com/macros/s/AKfycbxDSA5MX9KYqx23-wbPP6UOnj4b5zHkZs6dt7fNdyMcVR-MorqcudkUpCN4m_mr_rDM/exec",{

        method:"POST",

        body:JSON.stringify(data.answers)

    })
    .then(()=>{

        alert("답안이 제출되었습니다.");

    });


});
