function calculateResults() {
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value) * 12;

    //compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest) / (x-1);

    if(isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        showResults();
        hideLoader()

    } else {
        showError('Check your numbers');
    }
}

function showLoader() {
    document.getElementById('loading').style.display = 'block';
}

//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e) {
    hideResults()
    showLoader();
    setTimeout(calculateResults, 1000);
    e.preventDefault()
});

function clearError() {
    document.querySelector('.alert').remove();
}

function hideLoader() {
    document.getElementById('loading').style.display = 'none';
}

function hideResults() {
    document.getElementById('results').style.display = 'none';
}

function createErrorDiv(error) {
    //create div
    const errorDiv = document.createElement('div');
    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    //add class
    errorDiv.className = 'alert alert-danger';
    //create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));
    //insert error above heading
    card.insertBefore(errorDiv, heading);
}

function showError(error) {
    hideLoader();
    hideResults();
    createErrorDiv(error);
    setTimeout(clearError, 2000);
}

function showResults() {
    document.getElementById('results').style.display = 'block';
}