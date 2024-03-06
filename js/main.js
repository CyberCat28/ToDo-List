const selectAddBatton = document.getElementById('select-add')
const selectSeachBatton = document.getElementById('select-search')
const selectContainer = document.getElementById('search-container')
const addContainer = document.getElementById('add-container')
const todoContainer = document.getElementById('todo-container')
const addPostInput = document.getElementById('add-post-input')
const addPostButton = document.getElementById('add-post-button')

let todoObject = localStorage.getItem('todo') != null ? JSON.parse(localStorage.getItem('todo')) : [];

const recheckStorage = () => {
    if ( localStorage.getItem('todo') == '' || !localStorage.getItem('todo') || localStorage.getItem('todo') == '[]') {
        todoContainer.innerHTML = `
            <li>
                <p>Записи не найдены!</p>
            </li>
        `
    } else {
        todoContainer.innerHTML = '';
        todoObject.map((data, i) => {
            todoContainer.innerHTML += `
                <li id="${data.id}">
                    <p>${i + 1}</p>
                    <p ${data.status == 'done' ? 'style="color: #adde6f;"' : ''}>${data.text}</p>
                    ${data.status == 'done' ? '' : `
                        <button class="done-button" id="${data.id}">DONE</button>
                    `}
                    <button class="delete-button" id="${data.id}">DEL</button>
                </li> 
            `
        })
    }
}

recheckStorage()

addPostButton.onclick = () => {
    if ( addPostInput.value != '' ){
        let todoArr = {
            id: todoObject.length + 1,
            text: addPostInput.value,
            status:'active',
        }
        todoObject.push( todoArr );
    
        localStorage.setItem('todo', JSON.stringify( todoObject ));
        recheckStorage();
        addPostInput.value = '';
    } else {
        alert ('Поле пустое')
    }
}

document.addEventListener("click", function(e) {
    if( e.target.className == "delete-button" ) {
        const idToDelete = e.target.id;

        let deleteArr = [];
        todoObject.map(data => {
            if ( data.id != idToDelete ) {
                deleteArr.push( data )
            }
        })

        todoObject = deleteArr;
        localStorage.setItem('todo', JSON.stringify( todoObject ));
        recheckStorage();
    }

    if ( e.target.className == "done-button" ) {
        const idToDone = e.target.id;

        let doneArr = [];
        todoObject.map( data => {
            if ( data.id == idToDone ) {
                data.status = "done"
            }
            doneArr.push( data )
        } )

        todoObject = doneArr;
        localStorage.setItem('todo', JSON.stringify( todoObject ))
        recheckStorage();
    }
})