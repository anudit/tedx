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
    document.getElementById('mynominateform').addEventListener("submit", submitnominateForm);
}

var nom_rec = firebase.database().ref('nominations');

function getInput(id) {
    return document.getElementById(id).value;
}


function submitnominateForm(e) {
    e.preventDefault();
    saveNominateRec(new Date().toDateString(), getInput('q1'), getInput('q2'), getInput('q3'), getInput('q4'));
    recSaved();
}
function saveNominateRec(time, name, email, nominated_name, reason) {
    var newRec = nom_rec.push();
    newRec.set({
        time: time,
        name: name,
        email: email,
        nominated_name: nominated_name,
        reason: reason
    });
}

function recSaved() {
    document.getElementById("mynominateform").reset();
    location.href = './thankyou/index.html';
}