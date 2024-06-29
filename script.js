const mainBalance = document.querySelector("#main-bal");
const mainIncome = document.querySelector("#main-inc");
const mainExpenditure = document.querySelector("#main-exp");
const mainSavings = document.querySelector("#main-sav");
const ipTransDescription = document.querySelector("#trans-description");
const ipTransAmount = document.querySelector("#trans-amount");
const ipTranstype = document.querySelector("#trans-type");
const addTransBtn = document.querySelector("#complete-trans");
const transactionTable = document.querySelector("#transaction-table");
const ipTransDate = document.querySelector("#trans-date");

//All these Varibales show the main data on your page.getting there initial values when visited last on this web page
let Minc = JSON.parse(localStorage.getItem("Main-income")) ?? 0;
let Msav = JSON.parse(localStorage.getItem("Main-saving")) ?? 0;
let Mexp = JSON.parse(localStorage.getItem("Main-expenditure")) ?? 0;
let Mbal = JSON.parse(localStorage.getItem("Main-balance")) ?? 0;
let transDetails =JSON.parse(localStorage.getItem("Transaction-Details")) ?? [];
let dataArr = [Minc, Mexp, Mbal, Msav];








const pieChart = document.getElementById("my-chart");

const myChart = new Chart(pieChart, {
  type: "doughnut",
  data: {
    labels: ["Income", "Expenditure", "Balance", "Savings"],
    datasets: [
      {
        label: "",
        data: [0, 0, 0, 0],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(66, 245, 69)",
        ],
        hoverOffset: 4,
      },
    ],
  },
});

function showPieData(dataArr) {
  myChart.data.datasets[0].data = dataArr;
  myChart.update();
}
showPieData(dataArr);






//Show Previously visited Data if user has entered the page again.
function showPrevMainData() {
  mainIncome.innerHTML = Minc;
  mainBalance.innerHTML = Mbal;
  mainExpenditure.innerHTML = Mexp;
  mainSavings.innerHTML = Msav;
}
showPrevMainData(); //Both the method are called to show previous Main data and table data
showTableData();

//Function to show main data if any transaction in done.and store it into loacl storage.
function showMainData() {
  if (ipTranstype.value === "Income") {
    let income = Minc;
    let expenditure = Mexp;
    let savings = Msav; //added line
    income = income + parseFloat(ipTransAmount.value);
    let balance = income - expenditure - savings;
    Minc = income;
    Mbal = balance;
    localStorage.setItem("Main-income", JSON.stringify(Minc));
    localStorage.setItem("Main-balance", JSON.stringify(Mbal));
    mainIncome.innerHTML = Minc;
    mainBalance.innerHTML = Mbal;
  } else if (ipTranstype.value === "Expenditure") {
    let income = Minc;
    let expenditure = Mexp;
    let savings = Msav; //added line
    expenditure = expenditure + parseFloat(ipTransAmount.value);
    let balance = income - expenditure - savings;
    Mexp = expenditure;
    Mbal = balance;
    localStorage.setItem("Main-expenditure", JSON.stringify(Mexp));
    localStorage.setItem("Main-balance", JSON.stringify(Mbal));
    mainExpenditure.innerHTML = Mexp;
    mainBalance.innerHTML = Mbal;
  } else if (ipTranstype.value === "Savings") {
    let income = Minc;
    let expenditure = Mexp;
    let savings = Msav; //added line
    savings = savings + parseFloat(ipTransAmount.value);
    let balance = income - savings - expenditure;
    Msav = savings;
    Mbal = balance;
    localStorage.setItem("Main-saving", JSON.stringify(Msav));
    localStorage.setItem("Main-balance", JSON.stringify(Mbal));
    mainSavings.innerHTML = Msav;
    mainBalance.innerHTML = Mbal;
  }
  showPieData(dataArr);
}

//Event  which call a function that stores data in table and call showMainData function to show main data as well
addTransBtn.addEventListener("click", (e) => {
  e.preventDefault();
  transDetails.push({
    //Pushing each table row item(data) in form of object as array element in the array
    Trans_description: ipTransDescription.value,
    Trans_amount: ipTransAmount.value,
    Trans_type: ipTranstype.value,
    Trans_date: ipTransDate.value,
  });
  localStorage.setItem("Transaction-Details", JSON.stringify(transDetails)); //updating array after push in local storage
  showMainData();
  showTableData();
});


//Shows table Data after every transaction added and and create a delete button to delete table data and update it on table and local storage  
function showTableData() {
  let count = 1;
  transactionTable.innerHTML = `
      <td class="border-white  border-b-2 py-[7px] px-[3px] ">Sr.No</td>
      <td class="border-white border-b-2 text-left text-wrap break-words py-[7px] px-[3px]">Description</td>
      <td class="border-white border-b-2 py-[7px] px-[3px]">Amount</td>
      <td class="border-white border-b-2 py-[7px] px-[3px]">Type</td>
      <td class="border-white border-b-2 py-[7px] px-[3px]">Date</td>
      <td class="border-white  border-b-2 py-[7px] px-[3px]"><button>Delete</button></td>
      `;

  transDetails.forEach((item, idx) => {
    const tableItem = document.createElement("tr");
    transactionTable.appendChild(tableItem);
    tableItem.classList.add('table-row')
    tableItem.innerHTML = `
      <td class="border-white border-b-2 text-center py-[7px] px-[3px]">${count}</td>
      <td class="border-white  text-left border-b-2 py-[7px] px-[3px]">${item.Trans_description}</td>
      <td class="border-white border-b-2 py-[7px] px-[3px]">${item.Trans_amount}</td>
      <td class="border-white border-b-2 px-[3px] py-[7px]" >${item.Trans_type}</td>
      <td class="border-white border-b-2 text-white py-[7px] px-[3px]" >${item.Trans_date}</td>
      <td id='delete' class="border-white border-b-2 "><button class=""><span class=" rounded-[5px] text-[20px] px-[5px] transition ease-in duration-200 bg-[#f60000] hover:bg-[black] hover:text-white delete-btn text-black w-[20px]" >X</sapn></button></td>
  `;
    count++;
    const deletebtn = tableItem.querySelector(".delete-btn");
    deletebtn.addEventListener("click", (e) => {
      let deltetdArr = transDetails.splice(idx, 1);
      //   console.log(deltetdArr);
      // console.log(deltetdArr[0].Trans_type);
      //Upadating now main data on the basis of deleted taansaction ojn the table
      function upadteMainData() {
        let tapu = deltetdArr[0].Trans_type; //Type of transcation property in object return by
        if (tapu === "Income") {
          let tableAmt = deltetdArr[0].Trans_amount;
          Minc -= parseFloat(tableAmt);
          Mbal -= parseFloat(tableAmt);
          localStorage.setItem("Main-income", JSON.stringify(Minc));
          localStorage.setItem("Main-balance", JSON.stringify(Mbal));
          mainIncome.innerHTML = Minc;
          mainBalance.innerHTML = Mbal;
        } else if (tapu === "Savings") {
          let tableAmt = deltetdArr[0].Trans_amount;
          Msav -= parseFloat(tableAmt);
          Mbal += parseFloat(tableAmt);
          localStorage.setItem("Main-saving", JSON.stringify(Msav));
          localStorage.setItem("Main-balance", JSON.stringify(Mbal));
          mainSavings.innerHTML = Msav;
          mainBalance.innerHTML = Mbal;
        } else if (tapu === "Expenditure") {
          let tableAmt = deltetdArr[0].Trans_amount;
          Mexp -= parseFloat(tableAmt);
          Mbal += parseFloat(tableAmt);
          localStorage.setItem("Main-expenditure", JSON.stringify(Mexp));
          localStorage.setItem("Main-balance", JSON.stringify(Mbal));
          mainExpenditure.innerHTML = Mexp;
          mainBalance.innerHTML = Mbal;
        }
      }
      upadteMainData();
      showPieData(dataArr);
      localStorage.setItem("Transaction-Details", JSON.stringify(transDetails));
      showTableData();
      e.preventDefault();
    });
  });
}



























// let count = 0;
// addTransBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   showTableData();
//   showMainData();
// });
// function showTableData() {
//   const tableItem = document.createElement("tr");
//   transactionTable.appendChild(tableItem);
//   count++;
//   tableItem.innerHTML = `
//     <td class="border-2 border-white text-center">${count}</td>
//     <td class="border-2 border-white">${ipTransDescription.value}</td>
//     <td class="border-2 border-white">${ipTransAmount.value}</td>
//     <td class="border-2 border-white " >${ipTranstype.value}</td>
//     <td class="border-2 border-white text-white" >${ipTransDate.value}</td>
//     <td class="border-2 border-white" id='delete'><button>X</button></td>
//     `;
// }
// function showMainData() {
//   if (ipTranstype.value === "Income") {
//     let income = parseFloat(mainIncome.innerHTML);
//     let expenditure = parseFloat(mainExpenditure.innerHTML);
//     let savings = parseFloat(mainSavings.innerHTML); //added line
//     income = income + parseFloat(ipTransAmount.value);
//     Pincome = income;
//     let balance = income - expenditure - savings;
//     Pbalance = balance;
//     mainIncome.innerHTML = `${income}`;
//     mainBalance.innerHTML = `${balance}`;
//   } else if (ipTranstype.value === "Expenditure") {
//     let income = parseFloat(mainIncome.innerHTML);
//     let expenditure = parseFloat(mainExpenditure.innerHTML);
//     let savings = parseFloat(mainSavings.innerHTML); //added linie
//     expenditure = expenditure + parseFloat(ipTransAmount.value);
//     Pexpenditure = expenditure;
//     let balance = income - expenditure - savings;
//     Pbalance = balance;
//     mainExpenditure.innerHTML = `${expenditure}`;
//     mainBalance.innerHTML = `${balance}`;
//   } else if (ipTranstype.value === "Savings") {
//     let income = parseFloat(mainIncome.innerHTML);
//     let savings = parseFloat(mainSavings.innerHTML);
//     let expenditure = parseFloat(mainExpenditure.innerHTML); //added line
//     savings = savings + parseFloat(ipTransAmount.value);
//     Psavings = savings;
//     let balance = income - savings - expenditure;
//     Pbalance = balance;
//     mainSavings.innerHTML = `${savings}`;
//     mainBalance.innerHTML = `${balance}`;
//   }
//   let dataArr = [Pincome, Pexpenditure, Pbalance, Psavings];
//   showPieData(dataArr);
// }
