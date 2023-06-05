document.querySelector('.edit-blogpost-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const url = window.location.pathname;
    const postId = url.substring(url.lastIndexOf('/') + 1);
  
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();
  
    const response = await fetch(`/api/blogposts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to edit post');
    }
  });
