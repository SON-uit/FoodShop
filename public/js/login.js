
const loginForm = document.querySelector('#Loginform');
const regisForm = document.querySelector('#Regform');
//ALERT
const hideAlert = () => {
  const el = document.querySelector('.alert');
  if (el) el.parentElement.removeChild(el);
}
const showAlert = (type, message) => {
  hideAlert();
  const markup = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
  window.setTimeout(hideAlert, 3000);
}
//DISPLAY FORM FOR USER
loginForm.classList.add('hidden');
function login() {
    loginForm.classList.toggle("hidden");
    regisForm.classList.toggle("hidden");
  }
function register() {
  loginForm.classList.toggle("hidden");
  regisForm.classList.toggle("hidden");
}
// HANDLE FORM

const loginUser = async (email, password) => {
  try {
  const response = await axios ({
    method: 'POST',
    url:'http://localhost:3000/api/user/login',
    data: {
      email,
      password,
    }
  })
  if (response.data.status === 'success'){
    showAlert('success', 'Login Successfully');
    window.setTimeout(() => {
      location.assign('/home')
    }, 1000);
  }
  } catch (err) {
    showAlert('failed', err.response.data.message);
  }
}
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = e.target.querySelector('input[name="email"]').value;
  const password = e.target.querySelector('input[name="password"]').value;
  loginUser(email,password);
})
//RESGISTER
const registerUser = async (data) => {
  try {
  const response = await axios ({
    method: 'POST',
    url:'http://localhost:3000/api/user/signup',
    data,
  })
  if (response.data.status === 'success'){
    showAlert('success', 'Register Successfully');
    window.setTimeout(() => {
      location.assign('/home')
    }, 1000);
  }
  } catch (err) {
    showAlert('failed', err.response.data.message);
  }
}
regisForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = e.target.querySelector('input[name="username"]').value;
  const email = e.target.querySelector('input[name="email"]').value;
  const password = e.target.querySelector('input[name="password"]').value;
  const confirmPassword = e.target.querySelector('input[name="confirmPassword"]').value;
  const phone = e.target.querySelector('input[name="phone"]').value;
  const address = e.target.querySelector('input[name="address"]').value;
  registerUser({username, email, password, confirmPassword, phone, address})
})