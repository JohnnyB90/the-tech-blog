const newPostFormHandler = async (event) => {
    event.preventDefault();
    
    const title = document.querySelector('#title').value.trim();
    const content = document.querySelector('#content').value.trim();

    const formData = new FormData(event.target);
    
    try {
      const response = await fetch('/api/blogposts', {
        method: 'POST',
        body: formData,
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    } catch (err) {
      console.log(err);
    }
};
  document.querySelector('#newPostForm').addEventListener('submit', newPostFormHandler);