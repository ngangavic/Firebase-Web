// For the JS SDK
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        this.userId = user.uid
        getDetailsData()
        getEducationData()
        getSkillData()
    }
});

function getSkillData() {
    const database = firebase.database();
    var getSkill = database.ref('/porfolio/' + userId + '/skills')
    getSkill.once('value', function (snapshot) {

        var displaySkill = '';
        snapshot.forEach(function (childSnapshot) {
            displaySkill+='<div class="card-body">\n' +
                '                            <div class="row">\n' +
                '                                <div class="col">\n' +
                '                                    <h5 class="mt-4"><b>'+childSnapshot.val().name + '</b><span\n' +
                '                                            class="badge badge-secondary">'+childSnapshot.val().level+'</span></h5>\n' +
                '                                    <div class="progress">\n' +
                '                                        <div class="progress-bar" style="width:70%">'+childSnapshot.val().percentage+'</div>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                                <div class="col">\n' +
                '                                    <h5 class="mt-4">'+childSnapshot.val().description+'</h5>\n' +
                '                                </div>\n' +
                '                                <div class="col">\n' +
                '                                    <div class="btn-group btn-group-sm">\n' +
                '                                        <button class="btn btn-sm btn-warning">Edit</button>\n' +
                '                                        <button class="btn btn-sm btn-danger">Delete</button>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>';
        })
        $("#skill-display").append(displaySkill);
    })
}

function getEducationData() {
    const database = firebase.database();
    var getEducation = database.ref('/porfolio/' + userId + '/education')
    getEducation.once('value', function (snapshot) {

        var displayEducation = '';
        snapshot.forEach(function (childSnapshot) {
displayEducation+='<div class="card-body">\n' +
    '                        <div class="row">\n' +
    '                        <div class="col">\n' +
    '                            <h5 class="mt-4"><b>'+childSnapshot.val().course+'</b></h5>\n' +
    '                        </div>\n' +
    '                            <div class="col">\n' +
    '                                <h6 class="mt-4"><b>'+childSnapshot.val().school+'</b> '+childSnapshot.val().dates+'</h6>\n' +
    '                        </div>\n' +
    '                            <div class="col">\n' +
    '                                <div class="btn btn-group btn-group-sm">\n' +
    '                                <button class="btn btn-sm btn-warning">Edit</button>\n' +
    '                                <button class="btn btn-sm btn-danger">Delete</button>\n' +
    '                                </div>\n' +
    '                            </div>\n' +
    '                        </div>\n' +
    '                    </div>';
        })
        $("#education-display").append(displayEducation);
    })
}

function getDetailsData() {
    const database = firebase.database();
    var getProperty = database.ref('/porfolio/' + userId + '/my-details')
    getProperty.once('value').then(function (snapshot) {
            console.log("DATA:"+snapshot)
            document.getElementById("username").value=snapshot.val().username;
            document.getElementById("email").value=snapshot.val().email;
            document.getElementById("phone").value=snapshot.val().phone;
            document.getElementById("job").value=snapshot.val().job;
            document.getElementById("about-user").value=snapshot.val().about;
        }).catch((error) => {
        alert("Error: " + error.code)
    })
}

function saveProjectData() {
    const ref = firebase.storage().ref("/portfolio/" + userId + "/projects/");

    var newProjectKey = firebase.database().ref('/porfolio/' + userId + '/projects').push().key;

    const image = $('#project-image').get(0).files[0];
    const name = document.getElementById("project-name").value;
    const link = document.getElementById("project-link").value;
    const about = document.getElementById("about-project").value;

    const imageName = (+new Date()) + '-' + image.name;

    const task = ref.child(imageName).put(image);
    task.then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {

            firebase.database().ref('/porfolio/' + userId + '/projects/' + newProjectKey).set({
                name: name,
                link: link,
                about: about,
                imageUrl: url
            }).then(function (result) {
                alert("Saved")
                console.log("WRITE RESULT:" + result)
            })

            console.log(url);
        })
        .catch((error) => {
            alert("Error: " + error.code)
        })
}

function saveSkillsData() {
    const name = document.getElementById("skill-name").value;
    const percentage = document.getElementById("skill-percentage").value;
    const description = document.getElementById("skill-description").value;
    const level = $('#skill-level').val();

    alert("Skills: \n" + name + "\n" + percentage + "\n" + description + "\n" + level)

    var newSkillsKey = firebase.database().ref('/porfolio/' + userId + '/skills').push().key;
    firebase.database().ref('/porfolio/' + userId + '/skills/' + newSkillsKey).set({
        name: name,
        percentage: percentage,
        description: description,
        level: level
    }).then(function (result) {
        alert("Saved")
        console.log("WRITE RESULT:" + result)
    })

}

function saveTestimonialData() {
    const name = document.getElementById("testimonial-name").value;
    const company = document.getElementById("testimonial-company").value;
    const text = document.getElementById("testimony-text").value;

    alert("Testimonial data: \n" + name + "\n" + company + "\n" + text)

    var newTestKey = firebase.database().ref('/porfolio/' + userId + '/testimonial').push().key;
    firebase.database().ref('/porfolio/' + userId + '/testimonial/' + newTestKey).set({
        name: name,
        company: company,
        text: text
    }).then(function (result) {
        alert("Saved")
        console.log("WRITE RESULT:" + result)
    })

}

function saveEducationData() {
    const course = document.getElementById("course").value;
    const school = document.getElementById("school").value;
    const dates = document.getElementById("dates").value;

    alert("Education data:\n" + course + "\n" + school + "\n" + dates)

    // const uid=firebase.auth().currentUser.uid
    try {
        var newEduKey = firebase.database().ref('/porfolio/' + userId + '/education').push().key;
        firebase.database().ref('/porfolio/' + userId + '/education/' + newEduKey).set({
            course: course,
            school: school,
            dates: dates
        }).then(function (result) {
            console.log("WRITE RESULT:" + result)
        })
    } catch (e) {
        alert("Error: " + e.toString())
    }

}

function saveDetailsData() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const job = document.getElementById("job").value;
    const about = document.getElementById("about-user").value;

    alert("User data:\n" + username + "\n" + email + "\n" + phone + "\n" + job + "\n" + about)
    firebase.database().ref('/porfolio/' + userId + '/my-details').set({
        username: username,
        email: email,
        phone: phone,
        job: job,
        about: about
    }).then(function (result) {
        console.log("WRITE RESULT:" + result)
        alert("Message: " + result)
    })
}

function logout() {
    firebase.auth().signOut().then(function () {
        window.location.replace("index.html");
    }).catch(function (error) {
        alert("Error" + error)
    });
}

function startUp() {
// $("#details").css('display','none')
    $("#education").css('display', 'none')
    $("#project").css('display', 'none')
    $("#skills").css('display', 'none')
    $("#testimonials").css('display', 'none')
}

function showDetails() {
    $("#details").css('display', 'inline')
    $("#education").css('display', 'none')
    $("#project").css('display', 'none')
    $("#skills").css('display', 'none')
    $("#testimonials").css('display', 'none')
}

function showEducation() {
    $("#details").css('display', 'none')
    $("#education").css('display', 'inline')
    $("#project").css('display', 'none')
    $("#skills").css('display', 'none')
    $("#testimonials").css('display', 'none')
}

function showProjects() {
    $("#details").css('display', 'none')
    $("#education").css('display', 'none')
    $("#project").css('display', 'inline')
    $("#skills").css('display', 'none')
    $("#testimonials").css('display', 'none')
}

function showSkills() {
    $("#details").css('display', 'none')
    $("#education").css('display', 'none')
    $("#project").css('display', 'none')
    $("#skills").css('display', 'inline')
    $("#testimonials").css('display', 'none')
}

function showTestimonials() {
    $("#details").css('display', 'none')
    $("#education").css('display', 'none')
    $("#project").css('display', 'none')
    $("#skills").css('display', 'none')
    $("#testimonials").css('display', 'inline')
}