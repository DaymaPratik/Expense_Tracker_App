let name=document.querySelector('#name');
let income=document.querySelector('#income');
let addDetails=document.querySelector('#add-details');
let taxPdisplay=document.querySelector('#taxP-display');
let nettaxdisplay=document.querySelector('#net-tax-display');
let result=document.querySelector('#result');
let taxP=0;






addDetails.addEventListener('click',(e)=>{
    showtaxData();
    e.preventDefault();
    
})
function  showtaxData() {
    if(income.value >= 2000000){
           taxP=20;
    }else if(income.value >= 1500000 && income.value < 2000000){
        taxP=15;
    }else if(income.value >= 1000000 && income.value < 1500000){
        taxP=10;
    }else if(income.value >= 500000 && income.value < 1000000){
        taxP=8;
    }else{
        taxP=5;
    }
    result.classList.remove('hidden');
    result.classList.add('p-[10px]')
    let taxAm=(income.value*taxP)/100;
    taxPdisplay.innerHTML=`As Your Income is above given criteria so your tax percentage is:${taxP}%`
    nettaxdisplay.innerHTML=`The Net Tax amount you have to pay is:${taxAm}`
}





