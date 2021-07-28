const amountinput = document.querySelector("#amount");
const cashdiv = document.querySelector("#cash");
const cashinput = document.querySelector("#cash-given");
const resultoutput = document.querySelector(".result");
const btnnext = document.querySelector("#btn-next");
const btncal = document.querySelector("#btn-cal");
const err = document.querySelector(".error");
const reset = document.querySelector("#reset");
const retun = document.querySelector(".change")
const currencies = [2000, 500, 100, 20, 10, 5, 1];
const curr = [{ note: 2000, available: true },
    { note: 500, available: true },
    { note: 100, available: true },
    { note: 20, available: true },
    { note: 10, available: true },
    { note: 5, available: true },
    { note: 1, available: true }
]




btnnext.addEventListener("click", () => {

    if (amountinput.value > 0) {
        btnnext.style.display = "none";
        cashdiv.style.display = "block"

    } else {
        showError("Amount must be greater than 0")
    }
})

btncal.addEventListener("click", () => {
    const amount = parseInt(amountinput.value);
    const cash = parseInt(cashinput.value);
    resultoutput.innerHTML = "";
    if (amount > 0 && cash > 0) {

        if (amount <= cash) {
            let diff = cash - amount;
            calculateCurrency(diff);
        } else {
            showError("Less cash recieved");
        }

    } else {
        console.log(cashinput.value);
        showError("Input cash or amount is not correct");
    }
});


reset.addEventListener("click", () => {
    amountinput.value = "";
    cashinput.value = "";
    btnnext.style.display = "block";
    cashdiv.style.display = "none";
    retun.style.display = "none";
    resultoutput.style.display = "none";
})

function calculateCurrency(diff) {
    resultoutput.innerHTML = "";
    retun.innerHTML = "";
    let change = diff;
    if (diff > 0) {

        for (let i = 0; i < curr.length; i++) {
            let count = 0;
            if (curr[i].available) {
                count = Math.floor(diff / curr[i].note);
                diff = diff - count * curr[i].note;
            }
            if (count) resultoutput.innerHTML += `<div class="container">&#8377 ${curr[i].note} X  <span>   ${count}</span></div>`
        }
        retun.innerHTML += `<p>Return change | &#8377 ${change}</p>`;
        if (diff > 0) {
            retun.innerHTML += `<p>No change available</p>`
        }
    } else {
        showError("Cash given equal bill amount");
    }
    resultoutput.style.display = "grid";
    retun.style.display = "block";
}

function showError(msg, input) {
    err.innerHTML = `<p>${msg}</p>`;
    err.style.display = "block"
    setTimeout(() => { err.style.display = "none" }, 2000);
}