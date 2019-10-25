var config = {
    apiKey: "AIzaSyCfYBAz9YWwz1JixjtyKIi25Oe78ODxB-w",
    authDomain: "tedxforms.firebaseapp.com",
    databaseURL: "https://tedxforms.firebaseio.com",
    projectId: "tedxforms",
    storageBucket: "tedxforms.appspot.com",
    messagingSenderId: "586448899666"
};
firebase.initializeApp(config);

window.onload = function () {
    document.getElementById('myregisterform').addEventListener("submit", submitnominateForm);
}

var nom_rec = firebase.database().ref('registration');

function getInput(id) {
    return document.getElementById(id).value;
}


function submitnominateForm(e) {
    e.preventDefault();
    saveNominateRec(new Date().toDateString(), getInput('q1'), getInput('q2'), getInput('q3'), getInput('q4'), getInput('q5'), getInput('q6'), getInput('q7'));
    n_t = getInput('q6');
    frat = getInput('q4');
    var bu_price = 1000;
    var non_bu = 1200;
    var amount = 0;
    if (frat === 'yes') {
        amount = bu_price * n_t;
    }
    else {
        amount = non_bu * n_t;
    }

    pay(getInput('q1'), getInput('q2'), getInput('q3'), amount);
    recSaved();
}
function saveNominateRec(time, name, email, mobile, fraternity, source, n_tickets, size) {
    var newRec = nom_rec.push();
    newRec.set({
        time: time,
        name: name,
        email: email,
        phone: mobile,
        bu_frat: fraternity,
        source: source,
        n_tickets: n_tickets,
        t_shirt_size: size
    });
}



function pay(name, email, contact, amount) {
    var options = {
        "key": "rzp_test_6zUNktRaiVqtaV",
        "amount": amount,
        "currency": "INR",
        "name": "TEDxBennettUniversity",
        "description": "",
        "image": "https://tedxbennettuniversity.in/img/logos/tedxsq.png",
        "order_id": "order_DUNZoGU6lEPTjU",
        "handler": function (response) {
            alert(response.razorpay_payment_id);
        },
        "prefill": {
            "name": name,
            "email": email,
            "contact": contact,
        },
        "notes": {
            "address": "note value"
        },
        "theme": {
            "color": "#F37254"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}

function recSaved() {
    document.getElementById("myregisterform").reset();
    //location.href = './thankyou/index.html';
}