
const crypto = require("crypto");
const axios = require("axios");
function createSign(rawSignature, secretKey) {
  var signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");
  return signature;
}
module.exports.getCheckoutMomo = async (req, res) => {
  const cart = req.session.cart;
  const partnerCode = process.env.MOMO_PARTNER_CODE;
  const accessKey = process.env.MOMO_ACCESSKEY;
  const secretkey = process.env.MOMO_SECRETKEY;
  const requestId = partnerCode + new Date().getTime();
  const orderId = `Order${new Date().getTime().toString()}`;
  const orderInfo = "pay with MoMo";
  const redirectUrl = `${req.protocol}://${req.get('host')}/checkout/?paymentStatus=success`;
  const ipnUrl = redirectUrl;
  //var ipnUrl = redirectUrl = "https://webhook.site/454e7b77-f177-4ece-8236-ddf1c26ba7f8";
  const amount = cart.totalPrice;
  const requestType = "captureWallet";
  const extraData = ""; //pass empty value if your merchant does not have stores

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  var rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  //console.log("--------------------RAW SIGNATURE----------------");
  //console.log(rawSignature);
  //signature
  const signature = createSign(rawSignature, secretkey);
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: "en",
  });
  try {
    const response = await axios({
      url: "/v2/gateway/api/create",
      method: "POST",
      baseURL: " https://test-payment.momo.vn",
      data: requestBody,
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });
    return res.status(200).send(response.data);
  } catch (e) {
    console.log(e.message);
  }
};
