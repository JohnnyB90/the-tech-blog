window.onload = function () {
  let editForm = document.querySelector('.edit-blogpost-form');
  let editButtons = document.querySelectorAll('.edit-post-btn');

  if (editForm) {
    editForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const url = window.location.pathname;
      const postId = url.split('/').slice(-2, -1)[0];

      const title = document.querySelector('#title').value.trim();
      const content = document.querySelector('#content').value.trim();

      const response = await fetch(`/api/blogposts/${postId}`, {
        method: 'PUT',
        body: JSON.stringify({
          title,
          content,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit post');
      }
    });
  }

  if (editButtons) {
    editButtons.forEach((button) => {
      button.addEventListener('click', (event) => {
        const postId = event.target.getAttribute('data-post-id');
        document.location.replace(`/api/blogposts/${postId}/edit`);
      });
    });
  }
};
