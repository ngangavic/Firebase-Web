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