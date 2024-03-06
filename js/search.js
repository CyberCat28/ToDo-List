const searchInput = document.getElementById("search-input");
const todoList = document.querySelectorAll("#todo-container", "li");

searchInput.oninput = () => {
    let searchArr = [];
    todoObject.map((data, i) => {
        if ( data.text.includes( searchInput.value ) ) {
            searchArr.push( data )
        }
    })

    todoContainer.innerHTML = '';
    searchArr.map((data, i) => {
        todoContainer.innerHTML += `
            <li id="${data.id}">
                <p>${i + 1}</p>
                <p ${data.status == 'done' ? 'style="color: green;"' : ''}>${data.text}</p>
                ${data.status == 'done' ? '' : `
                    <button class="done-button" id="${data.id}">DONE</button>
                `}
                <button class="delete-button" id="${data.id}">DEL</button>
            </li> 
        `
    })
}

