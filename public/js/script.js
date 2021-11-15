let menu = document.querySelector("#menu-bar");
let navbar = document.querySelector(".navbar");

menu.onclick = () => {
  menu.classList.toggle("fa-times");
  navbar.classList.toggle("active");
};

window.onscroll = () => {
  menu.classList.remove("fa-times");
  navbar.classList.remove("active");
  if (window.scrollY > 60) {
    document.querySelector("#scroll-top").classList.add("active");
  } else {
    document.querySelector("#scroll-top").classList.remove("active");
  }
};

function loader() {
  document.querySelector(".loader-container").classList.add("fade-out");
}

function fadeOut() {
  setInterval(loader, 500);
}
window.onload = fadeOut();

/*  Cart   */

function popup() {
  var modal = document.querySelector("#myModal");
  var cartBtn = document.getElementById("cart-btn");
  var close = document.getElementsByClassName("close")[0];
  var close_footer = document.getElementsByClassName("close-footer")[0];
  var order = document.getElementsByClassName("order")[0];
  cartBtn.onclick = function () {
    modal.style.display = "block";
  };
  close.onclick = function () {
    modal.style.display = "none";
  };
  close_footer.onclick = function () {
    modal.style.display = "none";
  };
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
function showCart() {
  var modal = document.querySelector("#myModal");
  modal.style.display = "block";
}
popup();
let Cart = document.querySelector("#cart");
async function addCart(id) {
  try {
    const idProduct = id;
    const response  = await axios({
      method: "GET",
      url: "http://localhost:3000/api/product/addCart/"+ idProduct,
    })
    Cart.innerHTML = "";
    Cart.innerHTML = response.data;
    showCart();
    popup();
  } catch (error) {
    console.log(error)
  }
}
function deleteItems(id) {
  const idProduct = id;
  axios
    .get(`api/product/deleteItem/${idProduct}`)
    .then((response) => {
      Cart.innerHTML = "";
      Cart.innerHTML = response.data;
      showCart();
      popup();
    })
    .catch((error) => console.log(error));
}
function changeQtyItems(el) {
  axios
    .get(`api/product/editQtyItem/${el.id}/qty/${el.value}`)
    .then((response) => {
      Cart.innerHTML = "";
      Cart.innerHTML = response.data;
      showCart();
      popup();
    })
    .catch((error) => console.log(error));
}
//LOG OUT USER
const btnLogout = document.querySelector('.btn-logout');
const logout = async function ()  {
  try {
    const res = await axios({
    method: 'GET',
    url : 'http://localhost:3000/api/user/logout',
    });
    if (res.data.status === 'success') {
    location.assign('/home')
    }
  } catch(err) {
    alert('Try Again');
  }
}
if (btnLogout) {
  btnLogout.addEventListener('click', function (e) {
    e.preventDefault();
    logout();
  })
}
function menuToggle(){
  const toggleMenu = document.querySelector('.list');
  toggleMenu.classList.toggle('active')
}
