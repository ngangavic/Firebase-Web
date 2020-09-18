firebase.auth().onAuthStateChanged(user => {
    if (user) {
        this.userId = user.uid
        getDetailsData()
        getProjectsData()
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

function  getProjectsData() {
    const database = firebase.database();
    var getProject = database.ref('/porfolio/' + userId + '/projects')
    getProject.once('value', function (snapshot) {

        var project = '';
        snapshot.forEach(function (childSnapshot) {
            project+='<div class="item row">\n' +
                '                            <div class="col-md-4 col-12">\n' +
                '                                <img alt="project name"\n' +
                '                                     class="img-fluid project-image rounded shadow-sm" src="' + childSnapshot.val().imageUrl + '"/>\n' +
                '                            </div>\n' +
                '                            <div class="desc col-md-8 col-12">\n' +
                '                                <h3 class="title">' + childSnapshot.val().name + '</h3>\n' +
                '                                <p class="mb-2">' + childSnapshot.val().about + '</p>\n' +
                '                                <p><a class="more-link" href="' + childSnapshot.val().link + '"\n' +
                '                                      target="_blank"><i class="fas fa-external-link-alt"></i>Go to repo</a></p>\n' +
                '                            </div><!--//desc-->\n' +
                '                        </div>';
        })
        $("#projects-content").append(project);
    })
}