const deletePostHandler = async (event) => {
    event.preventDefault();
  
    // Get the blog post ID
    const postId = event.target.dataset.postId;
  
    try {
      const response = await fetch(`/api/blogposts/${postId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Reload the page to reflect the updated blog post list
        document.location.reload();
      } else {
        alert('Failed to delete blog post');
      }
    } catch (err) {
      console.log(err);
      alert('An error occurred');
    }
  };
  
  // Add click event listener to delete buttons
  const deleteButtons = document.querySelectorAll('.delete-post-btn');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', deletePostHandler);
  });
  