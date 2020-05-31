const baseUrl = 'http://localhost:3000';
const appContainer = document.getElementById('app-container');
const readyStateDone = 4;
const codeStatusOk = 200;
const codeSattusCreated = 201;
const codeNoContent = 204;
const message = {
    loading: 'Loading...',
    success: 'Thank you...',
    failure: 'Something wrong...'
}

function createContent() {
    appContainer.innerHTML = `
    <h1>Manage User App</h1>
    <form class='form'>
        <input type='text' class='form_name' placeholder='Name'>
        <input type='text' class='form_username' placeholder='Full Name'>
        <button type='submit' class='btn btn_add'>Add New User</button>
    </form>
    `
}
createContent();

function render () {
    function createGetMethod () {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', baseUrl + '/users');
        xhr.send();
        xhr.onload = function() {
            if (xhr.status !== codeStatusOk) { 
                alert(`Error ${xhr.status}: ${xhr.statusText}`); 
            } else { 
                let listOfUsers = JSON.parse(`${xhr.response}`);
                const ul = document.createElement('ul');
                appContainer.appendChild(ul);
                for(let i = 0; i < listOfUsers.length; i++) {
                    let li = document.createElement('li');
                    ul.appendChild(li);
                    let itemId = listOfUsers[i].id;
                    let name = listOfUsers[i].name;
                    let username = listOfUsers[i].username;
                    li.innerHTML = `
                    <form class='form_item'>
                        <span><input type='text' name='user_id' class='user_id' value='${itemId}' readonly></span>
                        <input type='text' name='name' class='name' value='${name}'>
                        <input type='text' name='username' class='username' value='${username}'>
                        <button type='button' class='btn btn_up' onclick='functionUpdate(this)'>Update</button>
                        <button type='button' class='btn btn_del' onclick='functionDelete(this)'>Delete</button>
                    </form>
                    `
                }
            }
        };
        xhr.onerror = function() {
        alert('Request failed');
        };
    }
    return createGetMethod();
}
render();

function createPostMethod () {
    let form = document.querySelector('.form');
    let inputName = document.querySelector('.form_name');
    let inputUserName = document.querySelector('.form_username');
    let input = document.querySelectorAll('input');
    let statusMessage = document.createElement('div');
    let btnAdd = document.querySelector('.btn_add');
    
    inputName.setAttribute('name', 'name');
    inputUserName.setAttribute('name', 'username');
    statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);
        btnAdd.setAttribute('disabled', true);
        statusMessage.innerHTML = message.loading;

        let request = new XMLHttpRequest();
        request.open('POST', baseUrl + '/users');
        request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        let formData = new FormData(form); 
        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        })

        let json = JSON.stringify(obj);
        request.send(json);
        request.addEventListener('readystatechange', function() {
            if(request.readyState < readyStateDone) {
                statusMessage.innerHTML = message.loading;
            } else if(request.readyState === readyStateDone && request.status === codeStatusOk) {
                statusMessage.innerHTML = message.success;
            } else if (request.status === codeSattusCreated){
                const delUl = document.querySelector('ul');
                const deleyShow = 1000;
                delUl.remove();
                render();
                btnAdd.removeAttribute('disabled');
                statusMessage.innerHTML = message.success;

                setTimeout(function test() {
                    statusMessage.remove();
                }, deleyShow);
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });
        for(let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    })  
}
createPostMethod();

function functionUpdate(obj) {
    let id = obj.parentNode.querySelector('.user_id').value;
    let name = obj.parentNode.querySelector('.name');
    let username = obj.parentNode.querySelector('.username');
    let statusMessage = document.createElement('div');
    let btnUpdate = obj.parentNode.querySelector('.btn_up');
    statusMessage.classList.add('status');
    btnUpdate.appendChild(statusMessage);
    btnUpdate.setAttribute('disabled', true);
    statusMessage.innerHTML = message.loading;

    let putRequest = new XMLHttpRequest();
    putRequest.open('PUT', baseUrl + '/users/' + id);
    putRequest.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    putRequest.send(JSON.stringify({name: name.value, username: username.value}));
    putRequest.onload = function () {
        if(putRequest.readyState < readyStateDone){
            statusMessage.innerHTML = message.loading;
        } else if(putRequest.readyState === readyStateDone && putRequest.status === '200') {
            statusMessage.innerHTML = message.success;
        } else if(putRequest.status === codeNoContent){
            const delUl = document.querySelector('ul');
            delUl.remove();
            render();
            statusMessage.innerHTML = message.success;
        } else {
            statusMessage.innerHTML = message.failure;    
        }
    }  
}

function functionDelete(obj) {
    let id = obj.parentNode.querySelector('.user_id').value;
    let btnDelete = obj.parentNode.querySelector('.btn_del');
    let statusMessage = document.createElement('div');
    btnDelete.setAttribute('disabled', true);
    statusMessage.classList.add('status');
    btnDelete.appendChild(statusMessage);
    statusMessage.innerHTML = message.loading;

    let deleteRequest = new XMLHttpRequest();
    deleteRequest.open('DELETE', baseUrl + '/users/' + id);
    deleteRequest.setRequestHeader('Authorization', 'admin');
    deleteRequest.send(null);
    deleteRequest.onload = function () {
        if (deleteRequest.readyState === readyStateDone && deleteRequest.status === '200') {
            statusMessage.innerHTML = message.success;
        } else if(deleteRequest.status === codeNoContent){
            const delUl = document.querySelector('ul');
            delUl.remove();
            render();
        } else {
            statusMessage.innerHTML = message.failure;    
        }
    }
}