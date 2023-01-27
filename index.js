const nameEl = document.querySelector("#name");
const cardNoEl = document.querySelector("#cardNo");
const monthEl = document.querySelector("#expMonth");
const yearEl = document.querySelector("#expYear");
const cvcEl = document.querySelector("#cvcNo");

const form = document.querySelector('#card-form');
const thank = document.querySelector('#thankyou');

const cardName = document.querySelector(".card-name");
const cardNo = document.querySelector(".card-no");
const month = document.querySelector(".card-mm");
const year = document.querySelector(".card-yy");
const cvc = document.querySelector(".card-cvc");

const isRequired = value => value === '' ? false : true;

const showError = (input, message) => {
    // get the form-field element
    let formField = input.parentElement;

    // add the error class
    formField.classList.remove('success');
    formField.classList.add('error');

    // show the error message
    const error = formField.querySelector('small');
    error.textContent = message;
};

const showSuccess = (input) => {
    // get the form-field element
    let formField = input.parentElement;

    // remove the error class
    formField.classList.remove('error');
    formField.classList.add('success');

    // hide the error message
    const error = formField.querySelector('small');
    error.textContent = '';
}

/*----- Check Name -----*/

const checkName = () => {

    let valid = false;
    const name = nameEl.value.trim();

    if (!isRequired(name)) {
        showError(nameEl, "Can't be blank.");
    } else {
        showSuccess(nameEl);
        valid = true;
    }
    return valid;
}

// change value on card img
nameEl.addEventListener("input", () => {
    cardName.innerHTML = nameEl.value;
});

/*----- Check Card No. -----*/

const isCardNoValid = (val) => {
    return val.length === 19 ? true : false;
};

const checkCardNo = () => {
    let valid = false;
    const cardNo = cardNoEl.value.trim();
    const re = /^([0-9]|\s){19}$/;

    if (!isRequired(cardNo)) {
        showError(cardNoEl, "Can't be blank.");
    } else if (!isCardNoValid(cardNo)) {
        showError(cardNoEl, "You need to enter 16 numbers")
    } else if (!re.test(cardNo)) {
        showError(cardNoEl, "Wrong format, numbers only")
    } else {
        showSuccess(cardNoEl);
        valid = true;
    }
    return valid;
}

// white space every 4 digits
cardNoEl.addEventListener("input", () => cardNoEl.value = cardNoEl.value.replace(/\s/g, '').replace(/([0-9]{4})/g, '$1 ').trim() );

// change value on card img
cardNoEl.addEventListener("input", () => {
    cardNo.innerHTML = cardNoEl.value;
});

/*----- Check Month -----*/

const checkMonth = () => {
    let valid = false;
    const month = monthEl.value.trim();
    const re = /^(1[0-2]|0[1-9])$/;

    if (!isRequired(month)) {
        showError(monthEl, "Can't be blank.");
    } else if (!re.test(month)) {
        showError(monthEl, `Invalid month`)
    } else {
        showSuccess(monthEl);
        valid = true;
    }
    return valid;
}

// change value on card img
monthEl.addEventListener("input", () => {
    month.innerHTML = monthEl.value;
});

/*----- Check Year -----*/

const isYearValid = (year) => {
    const thisYear = new Date().getFullYear().toString().slice(2,4);
    if (year >= thisYear) {
        const re = /^[0-9]{2}$/;
        return re.test(year);
    } else {
        return false;
    }
    
};

const checkYear = () => {
    let valid = false;
    const year = yearEl.value.trim();

    if (!isRequired(year)) {
        showError(yearEl, "Can't be blank.");
    } else if (!isYearValid(year)) {
        showError(yearEl, `Invalid year`)
    } else {
        showSuccess(yearEl);
        valid = true;
    }
    return valid;
}

// change value on card img
yearEl.addEventListener("input", () => {
    year.innerHTML = yearEl.value;
});

/*----- Check CVC -----*/

const checkCvc = () => {
    let valid = false;
    const cvc = cvcEl.value.trim();
    const re = /^[0-9]{3}$/;

    if (!isRequired(cvc)) {
        showError(cvcEl, "Can't be blank.");
    } else if (!re.test(cvc)) {
        showError(cvcEl, `Invalid CVC`)
    } else {
        showSuccess(cvcEl);
        valid = true;
    }
    return valid;
}

// change value on card img
cvcEl.addEventListener("input", () => {
    cvc.innerHTML = cvcEl.value;
});

form.addEventListener('submit', function (e) {
    // prevent the form from submitting
    e.preventDefault();

    // validate forms
    let isNameValid = checkName(),
        isCardValid = checkCardNo(),
        isMonthValid = checkMonth(),
        isYearValid = checkYear(),
        isCvcValid = checkCvc();

    let isFormValid = isNameValid &&
        isCardValid &&
        isMonthValid &&
        isYearValid &&
        isCvcValid;

    // submit to the server if the form is valid
    if (isFormValid) {
        form.style.display = 'none';
        thank.style.display = 'grid';
    }
});

const debounce = (fn, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        // cancel the previous timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // setup a new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

form.addEventListener('input', debounce(function (e) {
    switch (e.target.id) {
        case 'name':
            checkName();
            break;
        case 'cardNo':
            checkCardNo();
            break;
        case 'expMonth':
            checkMonth();
            break;
        case 'expYear':
            checkYear();
            break;
        case 'cvcNo':
            checkCvc();
            break;
    }
}));