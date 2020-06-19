function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)

    // create XMLHttprequest instance and store it a variable
    var xhttp = new XMLHttpRequest();

    // fired when event state is changed
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            showUser(JSON.parse(this.responseText));
        }
        else if (this.readyState == 4) {
            noSuchUser(user);
        }
    };
    // initiates a request
    xhttp.open("GET", "https://api.github.com/users/" + user, true);
    // send response to the server
    xhttp.send();
}

function showUser(user) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    // display user name
    $("#profile_name").text("Username:"+user.login)
    $("#profile_name").css('color', 'black');
    //display profile picture
    $("#user_github_image").append('<img src="'+user.avatar_url+'" width="300px" height="300px"/>')
    //display user details
    var info = $("#user_github_info").text("Name: "+user.name +"\n Github ID: "+user.id +"\n Github URL: "+user.html_url +"\n Followers: "+user.followers +"\n Following: "+user.following)
    info.html(info.html().replace(/\n/g,'<br/>'));
}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    // display the message
    $("#profile_name").text("No profile found")
        $("#profile_name").css('color', 'red');

}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
   // when DOM is ready below html elements are empty
        $("#profile_name").html("")
        $("#user_github_image").html("")
        $("#user_github_info").html("")
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information
            getGithubInfo(username);
        }
    })

});
