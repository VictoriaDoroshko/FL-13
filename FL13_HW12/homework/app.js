const root = document.getElementById('root');
function books(){
    let mainSection = document.createElement('div');
    mainSection.classList.add('main_section');
    root.appendChild(mainSection);
    const secondSection = document.createElement('div');
    secondSection.classList.add('dynamic_section');
    root.appendChild(secondSection);
    for(let i = 0; i < localStorage.length; i++){
        let item = JSON.parse(localStorage.getItem(i + 1));
        let div = document.createElement('div');
        mainSection.append(div);
        let obj = item.name;
        div.innerHTML = `<a href='?id=${i + 1}#preview' 
         id='${i + 1}' onclick='return click();' class='name_title'>${obj}</a> 
        <a href='?id=${i + 1}#edit' id='${i + 1}' class='link_edit'>edit</a>`;
        let mya = div.querySelector('a');
        mya.addEventListener('click', previewContent);
    }
    const divadd = document.createElement('div')
    divadd.innerHTML = `<a href='./#add' 
     class='link_add'>add</a>`
    mainSection.appendChild(divadd);
}
books();
let addButton = document.querySelector('.link_add')
addButton.addEventListener('click', formAdd);
function formAdd() {
    const secondSection = document.querySelector('.dynamic_section');
    const bookForm = document.createElement('form');
    const input1 = document.createElement('input');
    const input2 = document.createElement('input');
    const input3 = document.createElement('input');
    const input4 = document.createElement('input');
    const btnEditSave = document.createElement('button');
    btnEditSave.classList.add('save_button');
    bookForm.classList.add('form');
    secondSection.append(bookForm);
    input1.setAttribute('id', 'bookname');
    input1.setAttribute('placeholder', 'books');
    input2.setAttribute('id', 'bookautor');
    input2.setAttribute('placeholder', 'autor');
    input3.setAttribute('id', 'linkImg');
    input3.setAttribute('placeholder', 'url');
    input4.setAttribute('id', 'bookPlot');
    input4.setAttribute('placeholder', 'plot');
    btnEditSave.innerHTML = 'save';
    btnEditSave.addEventListener('click', function(){
            let newid = localStorage.length + 1;
            let newitem = { 
                id: newid, 
                name: `${input1.value}`, 
                autor: `${input2.value}`, 
                img: `${input3.value}`, 
                plot: `${input4.value}`};
            localStorage.setItem(newid.toString(), JSON.stringify(newitem));
            let div = document.createElement('div');
            let obj = newitem.name;
            div.innerHTML = `<a href='?id=${newid}#preview' 
                 id='${newid}' class='name_title'>${obj}</a> 
                <a href='?id=${newid}#edit'>edit</a>`;
            let parent = addButton.parentNode;
            parent.insertBefore(div, addButton);
        });
     bookForm.appendChild(input1);
     bookForm.appendChild(input2);
     bookForm.appendChild(input3);
     bookForm.appendChild(input4);       
     bookForm.appendChild(btnEditSave);
}
let editButton = document.querySelectorAll('.link_edit');
for(let i = 0; i < editButton.length; i++){
    editButton[i].addEventListener('click', formEdit);
}
function formEdit(el) {
    let elid = el.currentTarget;
    const secondSection = document.querySelector('.dynamic_section');
    if(secondSection.childNodes.length > 0){
        secondSection.removeChild(secondSection.firstChild);
    }
    const bookForm = document.createElement('form');
    const input1 = document.createElement('input');
    const input2 = document.createElement('input');
    const input3 = document.createElement('input');
    const input4 = document.createElement('input');
    const btnEditCancel = document.createElement('button');
    const btnEditSave = document.createElement('button');
    bookForm.classList.add('form');
    secondSection.append(bookForm);
    input1.setAttribute('id', 'bookname');
    input1.setAttribute('value', 'Title book');
    input2.setAttribute('id', 'bookautor');
    input2.setAttribute('value', 'Autor');
    input3.setAttribute('id', 'linkImg');
    input3.setAttribute('value', 'url image');
    input4.setAttribute('id', 'bookPlot');
    input4.setAttribute('value', 'plot');
    btnEditCancel.innerHTML = 'cancel';
    btnEditCancel.addEventListener('click', function(){
        return;
    })
    btnEditSave.innerHTML = 'save';
    btnEditSave.addEventListener('click', function(){
        let key = elid.id;
       let obj = JSON.parse(localStorage.getItem(key));
       obj.name = `${input1.value}`;
       obj.autor = `${input2.value}`;
       obj.img = `${input3.value}`;
       obj.plot = `${input4.value}`;
       localStorage.setItem(key.toString(), JSON.stringify(obj));
       alert('Book succesfully updated');
    });
     bookForm.appendChild(input1);
     bookForm.appendChild(input2);
     bookForm.appendChild(input3);
     bookForm.appendChild(input4);       
     bookForm.appendChild(btnEditCancel); 
     bookForm.appendChild(btnEditSave); 
}
function previewContent(e){
    let myId = e.currentTarget.id;
    let content = JSON.parse(localStorage.getItem(myId));
    let parent = document.querySelector('.dynamic_section');
    if(parent.childNodes.length > 0){
        parent.removeChild(parent.firstChild);
    }
    let div = document.createElement('div');
    let renderName = document.createElement('h3');
    let renderAutor = document.createElement('p');
    let imgBook = document.createElement('img');
    let renderPlot = document.createElement('p');
    renderName.innerHTML = content.name;
    renderAutor.innerHTML = content.autor;
    imgBook.setAttribute('src', content.img);
    renderPlot.innerHTML = content.plot;
    div.appendChild(renderName);
    div.appendChild(renderAutor);
    div.appendChild(imgBook);
    div.appendChild(renderPlot);
    parent.appendChild(div);
    history.pushState({myId}, 'select', `./?id=${myId}#preview`);
    return true;
}