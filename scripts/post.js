// Firebase References
const dbRefPublications = firebase.database()
  .ref()
  .child('data');

  // Order to the last post
const topUserPostRef = dbRefPublications  
  .child('publications')
  .orderByChild('order');

  // Order to the last comment
const topUserCommentRef = dbRefPublications
  .child('comments');

  //Users
const dbRefUsers = firebase.database()
    .ref()
    .child('users');


// Create the posts
parragraph();
  
function parragraph() {
  // Parragraph List
  topUserPostRef.on('child_added', function(publication) {

    getContentPost(publication);
  });
}

// Create elements
  // Div Container
const publication_container = document.createElement("DIV");
document.body.appendChild(publication_container);
  
  // Post
var container;  // Parragraph
var post; // Post content
var postAuthor; // Post Author

var hr; // Line

  //Comment
var containerComment;  // Parragraph with the comment.
var commentPost;  // Comment
var commentAuthor;
var txtComment;  // For write a comment

/*

  Methods to get comments and posts from Firebase

*/
function getContentPost(publication) {
  container = document.createElement("P");
  post = document.createElement("LABEL");
  postAuthor = document.createElement("LABEL");
  hr = document.createElement("HR"); 

  txtComment = document.createElement("TEXTAREA");

  // Attributes
  postAuthor.setAttribute("class", "author-tag");
  postAuthor.setAttribute("for", publication.key);
  txtComment.setAttribute("class", "comment");
  txtComment.setAttribute("for", publication.key);

  container.appendChild(post);
  container.appendChild(postAuthor);
  publication_container.appendChild(container);

  container.id = "post-container-" + publication.key;
  txtComment.id = "txt-comment-field" + publication.key;

  post.innerHTML = publication.child('content').val();

  postAuthor.innerHTML = "<b>Author: </b>" + "<i>" + publication.child('author').val() + "</i>";

  container.appendChild(hr);

  // Comments
  getCommentPost(publication);

  container.appendChild(txtComment); // Comment text area

  txtComment.addEventListener('keyup', function(e) {
    const text = document.getElementById("txt-comment-field" + publication.key).value;

    if (e.key == "Enter") {
      pushComment(publication, text);
    }
  });
}

function getCommentPost(publication) {
  topUserCommentRef
    .child(publication.key)
    .orderByChild('order')
    .once('value')
    .then(function(snap) {

    if (snap.numChildren() != null) {
      snap.forEach(function(snapshot) {
        const _container = document.getElementById("post-container-" + publication.key);

        containerComment = document.createElement("P");
        commentAuthor = document.createElement("LABEL");
        commentPost = document.createElement("LABEL");

        // Attributes
        containerComment.setAttribute("for", publication.key);
        containerComment.setAttribute("class", "container");
        commentAuthor.setAttribute("class", "comment-author")
        commentPost.setAttribute("class", "comment");

        commentPost.id = "comment-id";

        _container.appendChild(containerComment);
        containerComment.appendChild(commentAuthor);
        containerComment.appendChild(commentPost);

        dbRefUsers
        .child(snapshot.child('uid').val())
        .once('value')
        .then(function(_author) {
          commentAuthor.innerText = _author.child('name').val() + " ";
        });

        commentAuthor.innerText = publication.child('uid').val() + " ";


        commentPost.innerHTML = snapshot.child('comment').val();
      });   
    }
  });
}

function pushComment(publication, comment) {
  const time = new Date().getTime();  // Get the time in milliseconds

  const author = fUser.uid; // Get the user uid

  if (!comment == "") {
    topUserCommentRef.child(publication.key).child(time).child('comment').set(comment);
    topUserCommentRef.child(publication.key).child(time).child('uid').set(author);
    topUserCommentRef.child(publication.key).child(time).child('order').set(time);
  } 
}