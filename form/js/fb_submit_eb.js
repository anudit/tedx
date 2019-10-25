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
    document.getElementById('myebform').addEventListener("submit", submitnominateForm);
}

var nom_rec = firebase.database().ref('early_bird');

function getInput(id) {
    return document.getElementById(id).value;
}

var reg_no = "TDXBU";
function submitnominateForm(e) {
    e.preventDefault();

    console.log(reg_no);
    saveNominateRec(new Date().toDateString(), getInput('q1'), getInput('q2'), getInput('q3'), getInput('q4'), getInput('q5'), getInput('q6'));
    Email.send({
        SecureToken: "e55b83e5-0d79-4ec3-9fd3-d921a95e85ec",
        To: getInput('q2'),
        From: "tedx@bennett.edu.in",
        Subject: "This is the subject",
        Body: "And this is the body"
    }).then(
        message => alert("message")
    );


    recSaved();
}
function saveNominateRec(time, name, email, mobile, size, source, n_tickets) {
    var newRec = nom_rec.push();
    newRec.set({
        time: time,
        name: name,
        email: email,
        phone: mobile,
        size: size,
        source: source,
        n_tickets: n_tickets
    });
}





function recSaved() {
    document.getElementById("myebform").reset();
    //location.href = './thankyou/index.html';
}