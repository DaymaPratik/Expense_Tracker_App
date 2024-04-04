const mainBalance=document.querySelector('#main-bal');
const mainIncome=document.querySelector('#main-inc');
const mainExpenditure=document.querySelector('#main-exp');
const mainSavings=document.querySelector('#main-sav');
const ipTransDescription=document.querySelector('#trans-description');
const ipTransAmount=document.querySelector('#trans-amount');
const ipTranstype=document.querySelector('#trans-type');
const addTransBtn=document.querySelector('#complete-trans');
const transactionTable=document.querySelector('#transaction-table');
const ipTransDate=document.querySelector('#trans-date');
const deleteB=document.querySelector('#delete');
let Pincome=0,Pbalance=0,Psavings=0,Pexpenditure=0;



let count=0;
addTransBtn.addEventListener('click',(e)=>{
e.preventDefault();
 showTableData();
 showMainData();


})
function showTableData(){
    const tableItem=document.createElement('tr');
    transactionTable.appendChild(tableItem);
    count++;
    tableItem.innerHTML=`
    <td class="border-2 border-white text-center">${count}</td>
    <td class="border-2 border-white">${ipTransDescription.value}</td>
    <td class="border-2 border-white">${ipTransAmount.value}</td>
    <td class="border-2 border-white " >${ipTranstype.value}</td>
    <td class="border-2 border-white text-white" >${ipTransDate.value}</td>
    <td class="border-2 border-white" id='delete'><button>X</button></td>
    `
}
function showMainData(){
    if(ipTranstype.value  === 'Income'){
       
        let income=parseFloat(mainIncome.innerHTML);
        let expenditure=parseFloat(mainExpenditure.innerHTML);
        let savings=parseFloat(mainSavings.innerHTML);//added line
        income =income+ parseFloat(ipTransAmount.value);
        Pincome=income;
        let balance=income-expenditure-savings;
        Pbalance=balance;
        mainIncome.innerHTML=`${income}`
        mainBalance.innerHTML=`${balance}`
      
       
    }else if(ipTranstype.value  === 'Expenditure'){
        let income=parseFloat(mainIncome.innerHTML);
        let expenditure=parseFloat(mainExpenditure.innerHTML);
        let savings=parseFloat(mainSavings.innerHTML);//added linie
        expenditure =expenditure+ parseFloat(ipTransAmount.value);
        Pexpenditure=expenditure;
        let balance=income-expenditure-savings;
        Pbalance=balance;
        mainExpenditure.innerHTML=`${expenditure}`;
        mainBalance.innerHTML=`${balance}`;
      
    }else if(ipTranstype.value  === 'Savings'){
        let income=parseFloat(mainIncome.innerHTML);
        let savings=parseFloat(mainSavings.innerHTML);
        let expenditure=parseFloat(mainExpenditure.innerHTML);//added line
        savings=savings+parseFloat(ipTransAmount.value);
        Psvaings=savings;
        let balance=income-savings-expenditure;
        Pbalance=balance;
        mainSavings.innerHTML=`${savings}`;
        mainBalance.innerHTML=`${balance}`
    }
    let dataArr=[Pincome,Pexpenditure,Pbalance,Psavings]
    showPieData(dataArr);
}



const pieChart = document.getElementById('myChart');

    
    const myChart=new Chart(pieChart, {
      type: 'doughnut',
      data:{
        labels: [
          'Income',
          'Expenditure',
          'Balance',
          'Savings'
        ],
        datasets: [{
          label: '',
          data: [0,0,0,0],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(0,0,0)'
          ],
          hoverOffset: 4
        }]
        
      },
     
    });
   

  
    function showPieData(dataArr){
        myChart.data.datasets[0].data=dataArr;
        myChart.update();
    }