const input = document.querySelector('input');
const btnAdd = document.querySelector('button#add');
const btnRmv = document.querySelector('button#remove');


btnAdd.addEventListener('click', (e) => {
  e.preventDefault();
  
  if(!localStorage.getItem("todo")) localStorage.setItem("todo", '');
  
  if (typeof(Storage)) {
    let storage = localStorage.getItem("todo");
    
    storage.length === 0 ? storage = [] : storage = storage.split(',');
    
    storage.push(input.value);
    
    storage = storage.join();
    
    localStorage.setItem('todo', storage);
    
    add();
    
  } else {
    document.body.append("O Navegador não suporta armazenamento local");
  }
  
  input.value = '';
});

btnRmv.addEventListener('click', (e) => {
  e.preventDefault();

  let storage = localStorage.getItem("todo");
    
  storage.length === 0 ? storage = [] : storage = storage.split(',');
  
  storage = storage.slice(0,storage.length-1);
  
  storage = storage.join();
  
  localStorage.setItem('todo', storage);

  add();
});

const add = () => {
  let ul = document.querySelector('ul.list');
  ul.textContent = '';
  
  let storage = localStorage.getItem("todo");
  
  if(storage) {
    storage.length === 0 ? storage = [] : storage = storage.split(',');
  
    for(const i of storage) {
      let li = document.createElement('li');
      li.append(i);
      
      ul.append(li);

      document.body.append(ul);
    }
  }
}

add();
