function toggleSeat(seatId) {
    var seatElement = document.getElementById(seatId);

    if (seatElement.classList.contains('bg-green-400')) {
        deselectSeat(seatId);
    } else {
        selectSeat(seatId);
    }

    calculateTotalPrice();
    
    var yrdtknn = document.getElementById('yrdtk');
    yrdtknn.style.display= "none";
    
    var selectedSeatElement = document.getElementById('selectedseat');
    var selectedSeatCount = parseInt(selectedSeatElement.textContent);
    if (selectedSeatCount === 4) {
        var hideinputfild = document.getElementById("couponform");
        hideinputfild.style.visibility = "visible";
    } else {
        var hideinputfild = document.getElementById("couponform");
        hideinputfild.style.visibility = "hidden";
    }
}

function selectSeat(seatId) {
    var selectedSeatElement = document.getElementById('selectedseat');
    var selectedSeatCount = parseInt(selectedSeatElement.textContent);

    // Check if maximum seats already selected
    if (selectedSeatCount >= 4) {
        alert("Maximum 4 seats can be selected.");
        return;
    }

    var seatElement = document.getElementById(seatId);
    var seatsLeftElement = document.getElementById('seatleft');
    var scpInputElement = document.getElementById('scpinput');

    seatElement.classList.remove('bg-gray-400');
    seatElement.classList.add('bg-green-400');
    seatElement.style.color = 'white';
    seatElement.style.backgroundColor = 'rgb(34 197 94 / var(--tw-bg-opacity))';

    var seatsLeftCount = parseInt(seatsLeftElement.textContent);
    seatsLeftElement.textContent = seatsLeftCount - 1;

    selectedSeatElement.textContent = selectedSeatCount + 1;

    var seatDetails = '<div class="flex justify-between">' +
        '<div class="seattitle">' + seatId + '</div>' +
        '<div class="seatclass">Economy</div>' +
        '<div class="seatprice">550</div>' +
        '</div>';
    
    scpInputElement.innerHTML += seatDetails;
}

function deselectSeat(seatId) {
    var seatElement = document.getElementById(seatId);
    var seatsLeftElement = document.getElementById('seatleft');
    var selectedSeatElement = document.getElementById('selectedseat');
    var scpInputElement = document.getElementById('scpinput');

    seatElement.classList.remove('bg-green-400');
    seatElement.classList.add('bg-green-500');
    seatElement.style.color = 'initial';
    seatElement.style.backgroundColor = '#8080804a';

    var seatsLeftCount = parseInt(seatsLeftElement.textContent);
    seatsLeftElement.textContent = seatsLeftCount + 1;

    var selectedSeatCount = parseInt(selectedSeatElement.textContent);
    selectedSeatElement.textContent = selectedSeatCount - 1;

    var seatDetailsToRemove = '<div class="flex justify-between">' +
        '<div class="seattitle">' + seatId + '</div>' +
        '<div class="seatclass">Economy</div>' +
        '<div class="seatprice">550</div>' +
        '</div>';

    scpInputElement.innerHTML = scpInputElement.innerHTML.replace(seatDetailsToRemove, '');
}

function calculateTotalPrice() {
    var selectedSeatElement = document.getElementById('selectedseat');
    var totalPriceElement = document.getElementById('totalprice');
    var gtotalPriceElement = document.getElementById('grandTotalPrice');
    var selectedSeatCount = parseInt(selectedSeatElement.textContent);
    var totalPrice = selectedSeatCount * 550;

    totalPriceElement.textContent = totalPrice;
    gtotalPriceElement.textContent = totalPrice;
}

document.addEventListener("DOMContentLoaded", function() {
    var submitButton = document.querySelector('.cuppon input[type="submit"]');
    submitButton.addEventListener("click", function(event) {
        event.preventDefault();
        
        var couponInput = document.querySelector('.cuppon input[type="text"]');
        var couponValue = couponInput.value.trim().toUpperCase();
        
        var totalPriceElement = document.getElementById('totalprice');
        var totalPrice = parseFloat(totalPriceElement.textContent);

        var discount = 0;
        if (couponValue === "COUPLE 20") {
            discount = totalPrice * 0.2;
        } else if (couponValue === "NEW15") {
            discount = totalPrice * 0.15;
        }

        if (discount > 0) {
            var distextElement = document.getElementById('distext');
            var distextcouponformElement = document.getElementById('couponform');
            var yrdtknn = document.getElementById('yrdtk');
            var distextbbElement = document.getElementById('grandTotalPrice');
            distextElement.textContent = discount.toFixed(2);
            distextbbElement.textContent = (totalPrice - discount).toFixed(2);
            distextcouponformElement.style.visibility = "hidden";
            yrdtknn.style.display = "block";
        } else {
            alert("Invalid coupon code!");
        }

        couponInput.value = "";
    });
});

function validateForm() {
    var passengerName = document.getElementById('passengerName').value.trim();
    var phoneNumber = document.getElementById('phoneNumber').value.trim();
    var email = document.getElementById('email').value.trim();
    var selectedSeatCount = parseInt(document.getElementById('selectedseat').textContent);

    if (selectedSeatCount === 0) {
        alert("Sit is not selected!");
        return;
    }

    if (passengerName === '') {
        document.getElementById('nameError').textContent = 'Name is Required';
        return;
    } else {
        document.getElementById('nameError').textContent = '';
    }

    if (phoneNumber.length !== 11) {
        document.getElementById('phoneError').textContent = 'Phone number should be 11 digits';
        return;
    } else {
        document.getElementById('phoneError').textContent = '';
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Invalid email format';
        return;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    document.getElementById('header').style.display = 'none';
    document.getElementById('main').style.display = 'none';
    document.getElementById('footer').style.display = 'none';
    document.getElementById('successmessageticket').style.display = 'flex';
}

function reload() {
    location.reload();
}
