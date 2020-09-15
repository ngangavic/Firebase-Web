function saveDetailsData() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const job = document.getElementById("job").value;
    const about = document.getElementById("about-user").value;

    alert("User data:\n"+username+"\n"+email+"\n"+phone+"\n"+job+"\n"+about)
    firebase.database().ref('/porfolio/' + firebase.auth().currentUser.uid +'/my-details').set({
        username:username,
        email:email,
        phone:phone,
        job:job,
        about:about
    }).then(function (result) {
alert("Message: "+result)
    })
}

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

function showDetails() {
    $("#details").css('display','inline')
    $("#education").css('display','none')
    $("#project").css('display','none')
    $("#skills").css('display','none')
    $("#testimonials").css('display','none')
}

function showEducation() {
    $("#details").css('display','none')
    $("#education").css('display','inline')
    $("#project").css('display','none')
    $("#skills").css('display','none')
    $("#testimonials").css('display','none')
}

function showProjects() {
    $("#details").css('display','none')
    $("#education").css('display','none')
    $("#project").css('display','inline')
    $("#skills").css('display','none')
    $("#testimonials").css('display','none')
}

function showSkills() {
    $("#details").css('display','none')
    $("#education").css('display','none')
    $("#project").css('display','none')
    $("#skills").css('display','inline')
    $("#testimonials").css('display','none')
}

function showTestimonials() {
    $("#details").css('display','none')
    $("#education").css('display','none')
    $("#project").css('display','none')
    $("#skills").css('display','none')
    $("#testimonials").css('display','inline')
}