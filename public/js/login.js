var Loginform = document.getElementById("Loginform");
var Regform = document.getElementById("Regform");
var Indicator = document.getElementById("Indicator");          
    function register(){
      Regform.style.transform = "translateX(0px)";
      Loginform.style.transform = "translateX(0px)";
      Indicator.style.transform = "translateX(100px)";
    }
    function login(){
      Regform.style.transform = "translateX(450px)";
      Loginform.style.transform = "translateX(475px)";
      Indicator.style.transform = "translateX(-10px)";
    }
//DISPLAY FORM FOR USER
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