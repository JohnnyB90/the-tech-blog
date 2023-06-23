// select the form and the textarea
const commentForm = document.querySelector('#comment-form');
const commentText = document.querySelector('#comment-text');

commentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

// get the value from the textarea
const content = commentText.value;

// get the ID of the blog post from the URL
const path = window.location.pathname;
console.log('path:', path);
const parts = path.split('/');
console.log('parts:', parts);
const blogPost_id = parts[parts.length - 1];
console.log('blogpost_id:', blogPost_id);

// send a POST request to '/api/comments/newcomment' endpoint
const response = await fetch('/api/comments/newcomment', {
  method: 'POST',
  body: JSON.stringify({ content, blogPost_id }),
  headers: { 'Content-Type': 'application/json' },
});

console.log('Response:', response);

if (response.ok) {
  console.log('Comment posted successfully');
} else {
  console.log('Failed to post comment');
}


  
  
  // clear the textarea
  commentText.value = '';

  if (response.ok) {
    // if the response was successful, do something here
    console.log('Comment posted successfully');
  } else {
    alert('Failed to post comment');
  }
});
