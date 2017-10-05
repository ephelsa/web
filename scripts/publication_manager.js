// Get elements
const preview = document.getElementById('preview');

const txtNotice = document.getElementById('txtNotice');
const btnNewContent = document.getElementById('btnNewContent');  


// Buttons events
btnNewContent.addEventListener('click', async function(e) {
  var dbRefData = firebase.database()
    .ref()
    .child('data')
    .child('publications');  

    createNotice(dbRefData);
});

/*  This function is only to set the values in firebaseio   */
function createNotice(dbRefData) {
  var time = new Date().getTime();  // Get the time in milliseconds
  var notice = txtNotice.value;  // Get the value of notice

  var author = fUser.displayName; // Get the name 

  if (author == null) {
    author = fUser.email;
  }

  if (notice === "") {
    preview.innerHTML = "Please, write something...";

  } else {
    dbRefData.child(time).child('content').set(notice);  // Set the notice on firebase
    dbRefData.child(time).child('author').set(author);  // Set the fUser on firebase
    dbRefData.child(time).child('order').set(-time);  // Set the order. Is negative becase is ascend.
    dbRefData.child(time).child('uid').set(fUser.uid); // Set the UID.

    // To show the preview
    dbRefData.on('child_added', function(notice) {
      preview.innerHTML = notice.child('content').val();

      txtNotice.value = "";
    });
  }
}
