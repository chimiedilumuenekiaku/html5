// variable $startGameButton pour connecter avec le boutton commencé le quiz
const $startGameButton = document.querySelector(".start-quiz")
const $questionContainer = document.querySelector(".question-container")
const $answersContainer = document.querySelector(".answers-container") // Pour connecté avec article qui contient 4 réponses
const $questionText = document.querySelector(".question") //Pour connecter avec span le text du question
// Pour connecter avec button prochaine question
const $nextQuestionButton = document.querySelector(".next-question")

// Attribution d'événement quand l'utilisateur click pour commencer
$startGameButton.addEventListener("click", startGame)

// Attribution d'événement quand l'utilisateur click sur prochaine question, je fais l'appel à la fonction displayNextQuestion
$nextQuestionButton.addEventListener("click", displayNextQuestion)

// Pour savoir l'index du question courante
let currentQuestionIndex = 0

// variable pour calculer combien de réponse sont bonne
let totalCorrect = 0

//Focntion pour demarrer le quiz quand l'utilisateur click sur commencé.
function startGame() {
    // Quand l'utilisateur click pour démarrer button commencer additionne "hide" pour disparaitre
    $startGameButton.classList.add("hide")
    // Quand l'utilisateur clique pour démarrer, bouton commencer, additionne "hide" pour disparaître et container réponse apparaît
    $questionContainer.classList.remove("hide")
    
    // Fonction pour apparaître button pour prochaine question.
    displayNextQuestion()
}

function displayNextQuestion() {
    resetState()

    if (questions.length === currentQuestionIndex){
        return finishGame()
    }

    // Le text question: J'accède mon array pour prendre cle question dans mon objet.
    $questionText.textContent = questions[currentQuestionIndex].question
    //J'accède mo array questions dans l'index actuel, Je prend le contenu du propriété answers qui est un array
    questions[currentQuestionIndex].answers.forEach(answer => {
        const newAnswer = document.createElement("button")
        newAnswer.classList.add("button", "answer")
        newAnswer.textContent = answer.text

        // verification si la réponse est correct
        if(answer.correct) {
            newAnswer.dataset.correct = answer.correct
        }
        $answersContainer.appendChild(newAnswer)

        // Quand l'utilisateur click dans une réponse je fais appel au fonction selectAnswer
        newAnswer.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    // Verification tant qu'il y a un élement premier fils
    while($answersContainer.firstChild){
        // si il existe removeChild pour enlever ce fils. 
        $answersContainer.removeChild($answersContainer.firstChild)
    }

    document.body.removeAttribute("class")
    $nextQuestionButton.classList.add("hide")
}

// Quand l'utilisateur selectionne une réponse
function selectAnswer(event) {
    const answerClicked = event.target

    // verification si l'utilisateur click sur la bonne réponse
    if (answerClicked.dataset.correct){
        document.body.classList.add("correct")
        // chaque bonne réponse incrémente
        totalCorrect++
    }else {
        // sinon
        document.body.classList.add("incorrect")
    }

    document.querySelectorAll(".answer").forEach(button => {
        if(button.dataset.correct){
            button.classList.add("correct")
        }else {
            button.classList.add("incorrect")
        }

        button.disabled = true
    })

    // L'apparution du button prochaine question. on l'enleve "hide"
    $nextQuestionButton.classList.remove("hide")

    // J'incremente ma variable pour passer à la prochaine 
    currentQuestionIndex++
}

function finishGame() {
    const totalQuestion = questions.length
    const performance = Math.floor(totalCorrect * 100 / totalQuestion)

    let message = " "

    switch (true){
        case (performance >= 90):
            message = "Excellent :)"
            break
        case (performance >= 70):
            message = "Très bien :)"
           break
        case (performance >= 50):
            message = " Bien"
            break
        default:
            message = "Vous pouvez améliorer :("
    }

    $questionContainer.innerHTML = 
    `
    <p class="final-message">
        Vous avez répondu correctement à ${totalCorrect} de ${totalQuestion} questions!
        <span>Résultat: ${message}</span>
    </p>
    <button onclick=window.location.reload() class="button">
        Refaire le test
    </button>
    `
}




















// Array pour les questionnaires
const questions = [
    {
        question: "Quel est le principal domaine de recherche de Marie-Paule Cani en informatique ?",
        answers: [
            {text: "La création et l'animation de mondes virtuels en 3D, en particulier l'interaction et la simulation visuelle d'objets complexes.", correct: true},
            {text: "Le développement de systèmes d'exploitation pour l'intelligence artificielle.", correct: false},
            {text: "La cryptographie et la sécurité des réseaux.", correct: false},
            {text: "L'analyse et la gestion de données massives (big data).", correct: false}     
        ]
    },
    {
        question: "Quelle distinction prestigieuse Marie-Paule Cani a-t-elle reçue en 2012 pour ses contributions scientifiques ?",
        answers: [
            {text: "Le Prix Turing en informatique", correct: false},
            {text: "Le Prix Nobel de Physique.", correct: false},
            {text: "La Médaille d'argent du CNRS", correct: true},
            {text: "La Médaille Fields en mathématiques.", correct: false}    
        ]
    },
    {
        question: "Dans quelle institution Marie-Paule Cani a-t-elle travaillé pendant plus de vingt ans avant de rejoindre l'École Polytechnique ?",
        answers: [
            {text: "Université Paris-Saclay, où elle a été responsable de laboratoires en robotique.", correct: false},
            {text: "Sorbonne Université, où elle a dirigé un département d'informatique théorique", correct: false},
            {text: "Université de Lyon, où elle a mené des recherches sur les systèmes embarqués.", correct: false},
            {text: "Grenoble INP, où elle a dirigé deux équipes de recherche Inria au sein d'UMRs du CNRS.", correct: true}     
        ]
    }
]