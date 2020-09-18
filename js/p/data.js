firebase.auth().onAuthStateChanged(user => {
    if (user) {
        this.userId = user.uid
        getDetailsData()
    }

})

function getDetailsData() {
    const database = firebase.database();
    var getProperty = database.ref('/porfolio/' + userId + '/my-details')
    getProperty.once('value').then(function (snapshot) {
        console.log("DATA:" + snapshot.username)
        document.getElementById("username").innerHTML = snapshot.val().username;
        document.getElementById("user-email").innerHTML = snapshot.val().email;
        document.getElementById("user-phone").innerHTML = snapshot.val().phone;
        // document.getElementById("job").value = snapshot.val().job;
        document.getElementById("about-user").innerHTML = snapshot.val().job;
        document.getElementById("about-content").innerHTML = snapshot.val().about;
    }).catch((error) => {
        alert("Error: " + error.code)
    })
}