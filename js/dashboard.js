function logout() {
    firebase.auth().signOut().then(function () {
        window.location.replace("index.html");
    }).catch(function (error) {
        alert("Error"+error)
    });
}

function startUp() {
// $("#details").css('display','none')
$("#education").css('display','none')
$("#project").css('display','none')
$("#skills").css('display','none')
$("#testimonials").css('display','none')
}