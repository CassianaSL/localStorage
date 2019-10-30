const nome = document.querySelector('input#nome');
const cpf = document.querySelector('input#cpf');
const cidade = document.querySelector('input#cidade');
const curriculo = document.querySelector('textarea#curriculo');

const btnAdd = document.querySelector('button#add');
const btnRmv = document.querySelector('button#remove');

const json = {};

btnAdd.addEventListener('click', (e) => {
  e.preventDefault();
  
  if(!localStorage.getItem("curriculos")) localStorage.setItem("curriculos", '');
  
  if (typeof(Storage)) {
    json.nome = nome.value;
    json.cpf = cpf.value;
    json.cidade = cidade.value;
    json.curriculo = curriculo.value;

    console.dir(json);

    let storage = localStorage.getItem("curriculos");
    
    storage.length === 0 ? storage = [] : storage = storage.split(',');
    
    storage.push(JSON.stringify(json));
    
    storage = storage.join();
    
    localStorage.setItem('curriculos', storage);
    
    add();
    
  } else {
    document.body.append("O Navegador não suporta armazenamento local");
  }
  
  nome.value = '';
  cpf.value = '';
  cidade.value = '';
  curriculo.value = '';
});

btnRmv.addEventListener('click', (e) => {
  e.preventDefault();

  let storage = localStorage.getItem("curriculos");
    
  storage.length === 0 ? storage = [] : storage = storage.split(',');
  
  storage = storage.slice(0,storage.length-1);
  
  storage = storage.join();
  
  localStorage.setItem('curriculos', storage);

  add();
});

const add = () => {
  let ul = document.querySelector('ul.list');
  ul.textContent = '';
  
  let storage = localStorage.getItem("curriculos");
  
  if(storage) {
    storage.length === 0 ? storage = [] : storage = storage.split('},');
  

    for(let i of storage) {
      if(i[i.length-1] !== "}") i+='}';
      let dados = JSON.parse(i);
      
      let li = document.createElement('li');
      li.append(` Nome: ${dados.nome}`);
      li.append(` CPF: ${dados.cpf}`);
      li.append(` Cidade: ${dados.cidade}`);
      li.append(` Curriculo: ${dados.curriculo}`);
      
      ul.append(li);

      document.body.append(ul);
    }
  }
}

add();
