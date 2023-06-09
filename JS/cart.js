//localStorage.clear()
// for country update

function updateCountry() {
  let contacts = new Map()
  contacts.set('INDIA', '+918888888888')
  contacts.set('USA', '+18888888888')
  contacts.set('UK', '+448888888888')
  let countryName = document.getElementById("countriesList").value;
  document.getElementById("number").innerHTML = contacts.get(countryName);
  document.getElementById("nationFlag").src = `images/${countryName}.jpg`;
}

// alternate way for country
// document.getElementById("countriesList").addEventListener('change',()=>{
//   let countryName = document.getElementById("countriesList").value;
//   document.getElementById("number").innerHTML = contacts.get(countryName);
//   document.getElementById("nationFlag").src = `images/${countryName}.jpg`;
// })



// scroll arrow and Fixed navbar

var scrollUp = document.getElementById("scrollUp");
scrollUp.classList.add("hideArrow");
getYPosition = () => {
  var top = window.pageYOffset || document.documentElement.scrollTop;
  return top;
}

document.addEventListener("scroll", () => {
  var scrollAmount = getYPosition();
  scrolled = () => {
    window.scroll({
      top: 0,
      left: 0,
    });
  }
  console.log(scrollAmount);
  if (scrollAmount < 50) {
    document.getElementById("headerSticky").classList.remove("sticky");

  } else {
    document.getElementById("headerSticky").classList.add("sticky");

  }

  if (scrollAmount > 800) {
    scrollUp.classList.remove("hideArrow");
    scrollUp.classList.add("showArrow");
    scrollUp.addEventListener("click", scrolled)
  } else {
    scrollUp.classList.remove("showArrow");
    scrollUp.classList.add("hideArrow");
    scrollUp.removeEventListener("click", scrolled)
  }
})


// adding items to cart

function getPrice() {
  let cart = JSON.parse(localStorage.getItem("MyCart"));
  if (cart.length == 0) {
    document.getElementById("count-cart-amount").innerHTML = `Rs 0`;
  } else {

    // calculate total price after discount

    let temp1 = cart.map(item => {
      return parseFloat(item.priceAfterDiscount) * item.qty;
    }).reduce((prev, next) => {
      return prev + next;
    }, 0)

    // calculate price without discount
    let temp2 = cart.map(item => {
      return parseFloat(item.price) * item.qty;
    }).reduce((prev, next) => {
      return prev + next;
    }, 0)

    document.getElementById("actual-price").innerHTML = `Rs. ${temp2}`;
    document.getElementById("discount-amount").innerHTML = `RS. ${temp2-temp1}`;
    document.getElementById("discounted-price").innerHTML = `Rs. ${temp1}`;
    document.getElementById("sum-total").innerHTML = `Rs. ${temp1+99}`
    document.getElementById("count-cart-amount").innerHTML = temp1;
  }

}

// get total quantity
function getTotalQty() {
  let cart = JSON.parse(localStorage.getItem("MyCart"));
  console.log("hi", cart);
  if (cart.length == 0) {
    document.getElementById("count-cart-items").innerHTML = 0;;
  } else {
    let temp2 = cart.map(item => {
        return item.qty;
      })
      .reduce((prev, next) => {
        return prev + next;
      }, 0)

    document.getElementById("count-cart-items").innerHTML = temp2;
  }
}

fetch("products.json").then(response => response.json())
  .then((data) => {
    let product = data.Products;
    localStorage.setItem("MyProducts", JSON.stringify(product));
  })



function getCartItems() {
  return JSON.parse(localStorage.getItem("MyCart")) || []
}

function addToCart(index) {
  let products = JSON.parse(localStorage.getItem("MyProducts"));
  let body = products[index];
  let mycart = localStorage.getItem("MyCart");
  let note = "";
  if (mycart == null) {
    note = [];
    note.push({
      ...body,
      qty: 1
    });
  } else {
    note = JSON.parse(mycart);
    note.forEach((ele, index) => {
      if (ele.id == body.id) {
        ele.qty += 1;
        body = null;
      }
    })
    if (body != null) {
      note.push({
        ...body,
        qty: 1
      });
    }
  }
  localStorage.setItem("MyCart", JSON.stringify(note));
  updateCart();
}


function updateCart() {
  let note = getCartItems();
  let cards = '';
  note.forEach((element, index) => {
    let {
      id
    } = element;
    let discount = Math.floor(((parseInt(element.price) - parseInt(element.priceAfterDiscount)) / parseInt(element.price)) * 100);
    cards = cards +
      ` <div class="cart-container" id="${element.id}">
              <div class="cart-item">
                <div class="sec1">
                  <img src="./images/${element.imageName}.png" alt="${element.imageName}" />
                </div>
                <div class="sec2">
                  <div>
                    <p class="title">${element.name}</p>
                    <p class="color">Color: ${element.color}</p>
                    <p class="sold-by">Sold by: ${element.soldBy}</p>
                  </div>
                  <div class="size-qty">
                    <div class="input-group mb-3">
                      <div class="input-group-prepend">
                        <label for="inputGroupSelect01">size :</label>
                      </div>
                      <select id="inputGroupSelect01">
                        <option selected>Choose...</option>
                        <option value="1">Onesize</option>
                        <option value="2">Twosize</option>
                        <option value="3">Threesize</option>
                      </select>
                    </div>
                    <div class="btn-group btn-qty" role="group" aria-label="Basic example">
                      <button type="button" onclick="decreaseQty(${id})">-</button>
                      <p id="quantity">${element.qty}</p>
                      <button type="button" onclick="increaseQty(${id})">+</button>
                    </div>
                  </div>
                </div>
                <div class="sec3">
                  <p class="discounted-price">Rs. ${element.priceAfterDiscount}</p>
                  <p class="price">Rs. ${element.price} <span>(${discount}% Off)</span></p>
                  <p class="delivery">Delivery in 4-6 days</p>
                </div>
              </div>
              <div class="cart-btns">
                <button type="button" class="btn" id="${index}" value="${element.id}" onclick="removeItem(this.id)">Remove</button>
                <div>|</div>
                <button type="button" class="btn">Move To Wishlist</button>
              </div>
            </div>`;
  });
  if (note != 0) {
    document.querySelector('#my-cart').innerHTML = cards;
  } else {
    document.querySelector('#my-cart').innerHTML = `<div class="cart-container">
                                                      <h1>NO ITEMS LEFT</h1>
                                                    </div>`;
    document.getElementById("order").innerHTML = "";
  }
}



// adding coupons
document.getElementById("coupon").onchange = function () {
  var value = document.getElementById("coupon").value;
  document.getElementById("apply-coupon").addEventListener('click', function () {
    document.getElementById("discount-coupon").innerHTML = value;
  })
};


// remove item from cart
function removeItem(index) {
  let note = getCartItems();
  note.splice(index, 1);
  localStorage.setItem("MyCart", JSON.stringify(note));
  updateCart();
  getPrice();
  getTotalQty();
}


function increaseQty(productId) {
  let cart = getCartItems();
  let product = cart.find(item => item.id == productId);
  if (product) {
    product.qty += 1;
  }

  // for (let product of cart) {
  //   if (product.id == productId) {
  //     product.qty += 1;
  //   }
  //   document.getElementById("quantity").innerHTML = product.qty;
  // }
  localStorage.setItem("MyCart", JSON.stringify(cart));
  console.log(product.qty)
  document.querySelector("#quantity").innerHTML = product.qty;
  
  getPrice();
  getTotalQty();
}

function decreaseQty(productId) {
  let cart = getCartItems();
  for (let product of cart) {
    if (product.id == productId) {
      product.qty -= 1;
      if (product.qty < 1) {
        let temp2 = cart.filter(item => item.id != productId);
        localStorage.setItem("MyCart", JSON.stringify(temp2));
      } else {
        document.getElementById("quantity").innerHTML = product.qty;
        localStorage.setItem("MyCart", JSON.stringify(cart));
      }
    }
    updateCart();
    getPrice();
    getTotalQty();
  }
}


updateCart();
getPrice();
getTotalQty();