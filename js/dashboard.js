function logout() {
    firebase.auth().signOut().then(function () {
        window.location.replace("index.html");
    }).catch(function (error) {
        alert("Error"+error)
    });
}