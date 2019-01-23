var config = {
    apiKey: "AIzaSyCfYBAz9YWwz1JixjtyKIi25Oe78ODxB-w",
    authDomain: "tedxforms.firebaseapp.com",
    databaseURL: "https://tedxforms.firebaseio.com",
    projectId: "tedxforms",
    storageBucket: "tedxforms.appspot.com",
    messagingSenderId: "586448899666"
};
firebase.initializeApp(config);
var ip = "";
window.onload = function () {
    document.getElementById('mypartnerform').addEventListener("submit", submitpartnerForm);
    $.getJSON('https://api.ipify.org/?format=json', function (data) {
        ip = data['ip'];
    });
}

var par_rec = firebase.database().ref('partners');

function getInput(id) {
    return document.getElementById(id).value;
}

function submitpartnerForm(e) {
    e.preventDefault();
    savePartnerRec(ip, new Date().toDateString(), getInput('q1'), getInput('q2'), getInput('q3'), getInput('q4'));
    recSaved();
}

function savePartnerRec(ip, time, name, email, partner_name, reason) {
    var newRec = par_rec.push();
    newRec.set({
        ip: ip,
        time: time,
        name: name,
        email: email,
        partner_name: partner_name,
        reason: reason
    });
}
function recSaved() {
    document.getElementById("mypartnerform").reset();
    location.href = './thankyou/index.html';
}