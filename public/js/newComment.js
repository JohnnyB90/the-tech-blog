// select the form and the textarea
const commentForm = document.querySelector('#comment-form');
const commentText = document.querySelector('#comment-text');

commentForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  // get the value from the textarea
  const content = commentText.value;

  // send a POST request to your '/newcomment' endpoint
  const response = await fetch('/newcomment', {
    method: 'POST',
    body: JSON.stringify({ content, blogPost_id: blogPostId }),
    headers: { 'Content-Type': 'application/json' },
  });
  
  // clear the textarea
  commentText.value = '';

  if (response.ok) {
    // if the response was successful, do something here
    console.log('Comment posted successfully');
  } else {
    alert('Failed to post comment');
  }
});
