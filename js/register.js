
// ====================================================
var elForm = document.querySelector('.js-form');
var elInputE = document.querySelector('.js-inputE');
var elInputN = document.querySelector('.js-inputN');
var elInputT = document.querySelector('.js-inputT');
var elInputP = document.querySelector('.js-inputP');



let elLog = document.querySelector('.js-log');
elLog.addEventListener('click',function(){

   location.replace('login.html')

})

let elReg = document.querySelector('.js-reg');
elReg.addEventListener('click',function(){

   location.replace('index.html')
  
})





elForm.addEventListener('submit',function(evt){
    evt.preventDefault();

    fetch('http://192.168.7.158:5000/user/register',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(
            {
                user_name: elInputN.value,
                email : elInputE.value,
                phone: elInputT.value,
                password:elInputP.value,
            }
        )
    })
    .then((res)=>res.json())
    .then((data)=>{
     console.log(data);
            localStorage.setItem('token',data.token),
            location.replace('index.html')
        
    })
    .catch((err)=>console.log(err))


})