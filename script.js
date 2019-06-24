const inputElement = document.getElementById('input')
const ulElement = document.getElementById('list')
const actionPanel1 = document.getElementById('actionPanel1')
const actionPanel2 = document.getElementById('actionPanel2')

let toDoList = []
actionPanel2.style.display = 'none'

inputElement.addEventListener('keydown', event => {
    if (( event.key === 'Enter' || event.keyCode === 13 ) && (inputElement.value)) {
        toDoList.unshift({
            content: inputElement.value,
            done: false,
            selected: false,
        })
        inputElement.value = ''

        upgradeView()
    }
    
})

function upgradeView () {

    ulElement.innerHTML = ''

    for (let index = 0; index < toDoList.length; index++) {

        const toDoItem = toDoList[index]
        
        const liElement = document.createElement('li')
        liElement.className = 'list-group-item'

        ulElement.append(liElement)

        const spanElement = document.createElement('span')
        spanElement.className = 'form-check'
        liElement.append(spanElement)

        const checkboxElement = document.createElement('input')
        spanElement.append(checkboxElement)
        checkboxElement.type = 'checkbox'
        checkboxElement.className = 'form-check-input'
        checkboxElement.id = 'toDoItem' + index
        checkboxElement.checked = toDoItem.selected

        const labelElement = document.createElement('label')
        spanElement.append(labelElement)
        labelElement.className = 'form-check-label'
        if (toDoItem.done) {
            labelElement.className += ' todoDone'
        }
        labelElement.setAttribute('for', 'toDoItem' + index)
        labelElement.innerText = toDoItem.content

        if (!toDoItem.done) {
            const buttonDoneElement = document.createElement('button')
            buttonDoneElement.type = 'button'
            spanElement.append(buttonDoneElement)
            buttonDoneElement.className = 'btn btn-outline-primary'
            buttonDoneElement.innerText = 'Done'
            buttonDoneElement.style = 'float: right'

            buttonDoneElement.addEventListener('click', () => {
                toDoItem.done = !toDoItem.done
                upgradeView()
            })
        } else {

            const buttonRemoveElement = document.createElement('button')
            buttonRemoveElement.type = 'button'
            spanElement.append(buttonRemoveElement)
            buttonRemoveElement.className = 'btn btn-outline-danger'
            buttonRemoveElement.innerText = 'Remove'
            buttonRemoveElement.style = 'float: right'

            buttonRemoveElement.addEventListener('click', () => {

                toDoList = toDoList.filter(currenttoDoItem => currenttoDoItem !== toDoItem)
                upgradeView()
            })

        }

        

        checkboxElement.addEventListener('change', () => {
            toDoItem.selected = checkboxElement.checked
            upgradeView()
        })

        const someSelected = toDoList.some(toDoItem => toDoItem.selected)
        if (someSelected) {
            actionPanel1.style.display = 'none'
            actionPanel2.style.display = 'flex'
        } else {
            actionPanel1.style.display = 'flex'
            actionPanel2.style.display = 'none'
        }
    }

}


document.getElementById('doneAction').addEventListener('click', () => {
    for (const toDoItem of toDoList) {
        if (toDoItem.selected) {
            toDoItem.done = true
            toDoItem.selected = false
        }
    }
    upgradeView()
})
document.getElementById('restoreAction').addEventListener('click', () => {
    for (const toDoItem of toDoList) {
        if (toDoItem.selected) {
            toDoItem.done = false
            toDoItem.selected = false
        }
    }
    upgradeView()
})
document.getElementById('removeAction').addEventListener('click', () => {

    toDoList = toDoList.filter(toDoItem => !toDoItem.selected)

    upgradeView()
})

document.getElementById('selectAll').addEventListener('click', () => {
    for (const toDoItem of toDoList) {
        toDoItem.selected = true
    }
    upgradeView()
})