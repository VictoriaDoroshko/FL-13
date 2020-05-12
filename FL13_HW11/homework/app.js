const data = [
  {
    'folder': true,
    'title': 'Pictures',
    'children': [
      {
        'title': 'logo.png'
      },
      {
        'folder': true,
        'title': 'Vacations',
        'children': [
          {
            'title': 'spain.jpeg'
          }
        ]
      }
    ]
  },
  {
    'folder': true,
    'title': 'Desktop',
    'children': [
      {
        'folder': true,
        'title': 'screenshots',
        'children': null
      }
    ]
  },
  {
    'folder': true,
    'title': 'Downloads',
    'children': [
      {
        'folder': true,
        'title': 'JS',
        'children': null
      },
      {
        'title': 'nvm-setup.exe'
      },
      {
        'title': 'node.exe'
      }
    ]
  },
  {
    'title': 'credentials.txt'
  }
];

const rootNode = document.getElementById('root');
rootNode.append(createTreeDom(data));

function createTreeDom(arr) {
  if (!Object.keys(arr).length) {
    return;
  }
  let ul = document.createElement('ul');
  for (let i = 0; i < arr.length; i++) { 
    let el = arr[i];
    let para = document.createElement('p');
    let li = document.createElement('li');
    li.innerHTML = `<i class="material-icons icon-style-grey">insert_drive_file</i><span> ${el['title']}</span>`;
    if(el['folder'] === true) {
      li.innerHTML = `<i class="material-icons show">folder</i><span> ${el['title']}</span>`;
    }
    let children = el['children'];
    
    if(children){ 
      let newchild = createTreeDom(children);
      li.append(newchild);
    }else{
      para.innerHTML = `Folder is empty`;
      para.classList.add('is-empty');
      li.append(para);
    }
    ul.append(li);     
  }
  return ul;  
}

rootNode.onclick = function (event){
  if(event.target.tagName !== 'SPAN') {
    return;
  }
  let childrenContainer = event.target.parentNode.querySelector('ul');
  if(!childrenContainer) {
    return;
  }
  childrenContainer.hidden = !childrenContainer.hidden;
  if(!childrenContainer.hidden) {
    event.target.classList.add('hide');
    event.target.classList.remove('show');
  } else {
    event.target.classList.add('show');
    event.target.classList.remove('hide');
  }
}

function createListMenu () {
  let ul = document.createElement('ul');
  ul.classList.add('right-click-menu');
  let li0 = document.createElement('li');
  let li1 = document.createElement('li');
  li0.innerHTML = 'Rename';
  li1.innerHTML = 'Delete item';
  li0.classList.add('rename');
  li1.classList.add('remove-item');
  ul.appendChild(li0);
  ul.appendChild(li1);
  rootNode.appendChild(ul);
}
createListMenu();

function rightClickMenu () {
  let menu = document.querySelector('.right-click-menu');
  rootNode.addEventListener('contextmenu', event => {
    event.preventDefault();
    console.log('contextmenu');
    menu.style.top = `${event.clientY}px`;
    menu.style.left = `${event.clientX}px`;
    menu.classList.add('active');
  });

  document.addEventListener('click', event => {
    let rightButton = 2;
    if(event.button !== rightButton) {
      menu.classList.remove('active');
    }
  }, false);

  menu.addEventListener('click', event => {
    event.stopPropagation();
  }, false);
}
rightClickMenu();

function isFolderEmpty () {
  let folders = document.querySelectorAll('li');
  for(let i = 0; i < folders.length; i++) {
    let text = folders[i].querySelectorAll('i')[0].textContent;
    if(text === 'folder') {
      let para = document.createElement('p');
      let node = document.createTextNode('Folder is empty');
      para.appendChild(node);
      let folderLength = 3;
      if(folders[i].children.length < folderLength) {
         folders[i].appendChild(para);
      }
     }
    console.log(text);
    console.log(folders[i].children.length);  
  }
}
isFolderEmpty();