var elForm = document.querySelector('.js-form');
var elInputE = document.querySelector('.js-inputE');
var elInputP = document.querySelector('.js-inputP');


let elLog = document.querySelector('.js-log');
elLog.addEventListener('click',function(){

   location.replace('index.html')

})

let elReg = document.querySelector('.js-reg');
elReg.addEventListener('click',function(){

   location.replace('register.html')
  
})



elForm.addEventListener('submit',function(evt){
    evt.preventDefault();

fetch('http://localhost:5000/user/login',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
        
    },
    body:JSON.stringify({
        email: elInputE.value,
        password: elInputP.value,
    })
})
.then((res)=>res.json())
.then((data)=>{
    console.log(data.page);
    if(data.token){
      localStorage.setItem('token',data.token),
      location.replace('index.html')
    }
})
.catch((err)=>console.log(err))

})