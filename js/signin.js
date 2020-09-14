//check if session exist
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (user.emailVerified){
            window.location.replace("dashboard.html");
        }else{
            firebase.auth().currentUser.sendEmailVerification()
            alert("Verify your email. Link sent to your email inbox.")
        }
    }else{
        window.location.replace("p/");
    }
});

// FirebaseUI config.
function displayUI() {

    var uiConfig = {
        signInSuccessUrl: 'dashboard.html',
        signInOptions: [
            // Leave the lines as is for the providers you want to offer your users.
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.EmailAuthProvider.PROVIDER_ID,
            firebase.auth.PhoneAuthProvider.PROVIDER_ID,
            firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
        ],
        // tosUrl and privacyPolicyUrl accept either url string or a callback
        // function.
        // Terms of service url/callback.
        tosUrl: 'tos.html',
        // Privacy policy url/callback.
        privacyPolicyUrl: function () {
            window.location.assign('privacy-policy.html');
        }
    };

// Initialize the FirebaseUI Widget using Firebase.
    var ui = new firebaseui.auth.AuthUI(firebase.auth());
// The start method will wait until the DOM is loaded.
    ui.start('#firebaseui-auth-container', uiConfig);
}