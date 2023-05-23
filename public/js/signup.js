const signupFormHandler = async (event) => {
    event.preventDefault();
    console.log("click")
  
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    
    if (username && password) {
      console.log('fetching');
      const response = await fetch('/api/users/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to sign up');
      }
    }
  };
  
  document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);
  