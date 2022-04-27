const baseURL = 'http://localhost:3000';
const btnOrder = document.querySelector('button[id="order"]');
const modal = document.querySelector(".modalOrdered")
let paymentMethod = document.querySelectorAll('input[name="payment"]');
const paymentStatus = document.querySelector(".paymentStatus") ||undefined;
const stripe = Stripe('pk_test_51JnaLtJt3syRX2Q1kCKuInEtG21T3YGdKaGgssabRDAC888LbFp869sswrQHT8LIOdBu5x8Hpbh1Cpbp5XAU3YGl00s3xAKzD4')
const showOrdered = function () {
    modal.classList.add('open')
}
const checkoutStripe = async function() {
  //1 get session from api
  const session = await axios(`${baseURL}/api/checkout/checkout-session`)
  //2 create checkout form
  await stripe.redirectToCheckout({
    sessionId: session.data.session.id
  })
}
paymentMethod.forEach(el => {
  el.addEventListener('change', function (e) {
    e.preventDefault();
      if (e.target.checked) {
        if (e.target.value === 'banking') {
          checkoutStripe();
        }
      }
  })
})
//Alert payment status success OR failed
const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};
const showAlert = (type) => {
  hideAlert();
  let message = type === 'success' ? 'Thanh toan thanh cong' :' Thanh toan that bai'
  const markup = `<div class="alert alert--${type}">${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 3000);
};
if (paymentStatus) {
  showAlert(paymentStatus.value);
}
const order = async function (data) {
  try {
    const response = await axios({
        url: `${baseURL}/api/checkout/createCheckout`,
        method: 'POST',
        data,
    })
    if (response.data.status === 'success') {
       showOrdered();
       window.setTimeout(() => {
         location.assign('/home')
       }, 5000);
    }
  } catch (error) {
    alert(error);
  }
}
btnOrder.addEventListener('click', function(e) {
  e.preventDefault();
  const username = document.querySelector('input[name="username"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const phone = document.querySelector('input[name="phone"]').value;
  const address = document.querySelector('textarea[name="address"]').value;
  const message = document.querySelector('textarea[name="message"]').value || 'No message';
  const date = document.querySelector('input[name="date"]').value;
  const payment = paymentStatus ? 'banking' : 'cod';
  if ( paymentStatus && paymentStatus.value === 'failed') {
      showAlert(paymentStatus.value);
    }else {
      order({username,email,phone,address,message,date,payment});
  }
})


