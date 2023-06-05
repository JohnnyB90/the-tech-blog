// dashboard.js
const editButtons = document.querySelectorAll('.edit-post-btn');
editButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const postId = event.target.getAttribute('data-post-id');
    document.location.replace(`/api/blogposts/${postId}/edit`);
  });
});
