//Vars
const counter = document.querySelector('#counter')
let counterValue = 0
let isPaused = false
const minusButton = document.querySelector('#minus')
const plusButton = document.querySelector('#plus')
const heartButton = document.querySelector('#heart')
const pauseButton = document.querySelector('#pause')
const likesUL = document.querySelector('.likes')
const commentList = document.querySelector('#list')
const commentForm = document.querySelector('#comment-form')
const commentInput = document.querySelector('#comment-input')
const commentSubmit = document.querySelector('#submit')
let likes = []
//DOM Load
document.addEventListener('DOMContentLoaded', function() {
    loadEvents()
    setInterval(timeCount, 1000)
})
function loadEvents() {
    minusButton.addEventListener('click', minusCount)
    plusButton.addEventListener('click', plusCount)
    heartButton.addEventListener('click', heartCount)
    pauseButton.addEventListener('click', pauseCount)
    commentForm.addEventListener('submit', addComment)
}
//Functions
function timeCount() {
    if (!isPaused) plusCount()
}
function minusCount() {
    counterValue -= 1
    counter.textContent = counterValue
}
function plusCount() {
    counterValue += 1
    counter.textContent = counterValue
}
function pauseCount() {
    isPaused = !isPaused
    if (!isPaused){
        pauseButton.textContent = 'pause'
        toggleDisabled([minusButton, plusButton, heartButton, commentSubmit])
    } else {
        pauseButton.textContent = 'resume'
        toggleDisabled([minusButton, plusButton, heartButton, commentSubmit])
    }
}
function toggleDisabled(array) {
    array.forEach ((e) => e.toggleAttribute('disabled'))
}
function heartCount() {
    const tempValue = counterValue
    let likeLi
    if (likes[tempValue] == null) {
        likeLi = document.createElement('li')
        likeLi.id = `num-${tempValue}`
        likesUL.appendChild(likeLi)
        likes[tempValue] = 1
    } else {
        likeLi = document.querySelector(`#num-${tempValue}`)
        likes[tempValue] ++
    }
    likeLi.innerText = `${tempValue} has been liked ${likes[tempValue]} time`
    sortLikes()
}
function sortLikes() {
    ulArray = [...likesUL.children]
    ulArray.sort((a, b) => a.id.split("-")[1] - b.id.split("-")[1])
    ulArray.forEach(e => likesUL.appendChild(e))
}
function addComment(e) {
    const comment = document.createElement('p')
    comment.textContent = commentInput.value
    commentList.appendChild(comment)
    commentInput.value = ''
    e.preventDefault()
}
