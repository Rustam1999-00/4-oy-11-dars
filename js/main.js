var localData = localStorage.getItem('token');

console.log(localData);

if(!localData){
  location.replace('register.html')

}


let elLog = document.querySelector('.js-log');
elLog.addEventListener('click',function(){

   location.replace('login.html')

})

let elReg = document.querySelector('.js-reg');
elReg.addEventListener('click',function(){

   location.replace('register.html')
  
})



var elForm = document.querySelector('.js-form');
var elInput = document.querySelector('.js-input');
var elList = document.querySelector('.js-list');


let renderTodo = (arrey,node)=>{
    node.innerHTML = '';

    arrey.forEach((todo)=>{
        node.innerHTML += `
        <li class="list-group-item d-flex justify-content-between h5" >
            <p class="">${todo.id}  ${todo.todo_value}</p>
            <div>
                <button data-todo-id=${todo.id} class="btn btn-warning js-edit   ">EDIT</button>
                <button data-todo-id=${todo.id} class="btn btn-danger  js-delete  " >DELETE</button>
            </div>
        </li>
        `
    })
   elInput.value = ''
}





async function getTodo() {

const res = await fetch('http://192.168.7.158:5000/todo',{
 headers:{
    // 'Content-Type':'application/json',
    Authorization: localData,
 }
})
const data = await res.json()
renderTodo(data,elList)
console.log(data);
// console.log(localData);

}
getTodo()
console.log(localData);
// console.log(getTodo());


elForm.addEventListener('submit',function(evt){
        evt.preventDefault();
       fetch('http://192.168.7.158:5000/todo',{

       method:'POST',
       headers:{
        'Content-Type':'application/json',
        Authorization: localData
       },
       body:JSON.stringify(
        {
            text:elInput.value
           }
       ),

       }).then((res)=>res.json())
       .then((data)=>{
        if(data){
            getTodo()
        }
       })
       .catch((err)=>console.log(err))
    })

    let renderDelete = (id)=>{
        fetch(`http://192.168.7.158:5000/todo/${id}`,{

        method:'DELETE',
        headers:{
         Authorization: localData

        }
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data){
            getTodo()
        }
    })
    .catch((err)=>console.log(err))
    
    }
    let renderEdit = (id)=>{
        const critePromit = prompt('Yangi so\'z kriting')
        fetch(`http://192.168.7.158:5000/todo/${id}`,{

        method:'PUT',
        headers:{
            'Content-Type':'application/json',
         Authorization: localData

        },
        body:JSON.stringify({
            text: critePromit
        })
    })
    .then((res)=>res.json())
    .then((data)=>{
        if(data){
            getTodo()
        }
    })
    .catch((err)=>console.log(err))
    
    }



    elList.addEventListener('click',function(evt){
        if(evt.target.matches('.js-delete')){
            let todoId = evt.target.dataset.todoId
            renderDelete(todoId)
        };
        if(evt.target.matches('.js-edit')){
            const todoId  = evt.target.dataset.todoId;
            renderEdit(todoId)
        }
    })
    
 
