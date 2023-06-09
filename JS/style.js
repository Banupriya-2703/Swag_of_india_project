
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
    document.getElementById("main").style.marginTop = "100px";
  } else {
    document.getElementById("headerSticky").classList.add("sticky");
    document.getElementById("main").style.marginTop = "220px";
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

// for slide show

let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1
  }
  if (n < 1) {
    slideIndex = slides.length
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}

// tooltips everywhere

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

// fetch data 

let productsListUrl = '/products.json';
async function loadProducts(productsListUrl) {
  fetch(productsListUrl)
    .then(response => response.json())
    .then(data => {
      const products = data.Products;
      let cards = '';
      products.forEach((product,index) => {
        let isNewDiv = '';
        if (product.isNew === 'TRUE') {
          isNewDiv = `<div class="new-product"><span>New</span></div>`;
        }
        let stars = '';
        const ratings = Math.floor(+product.ratings);
        for (let i = 1; i <= 5; i++) {
          if (i <= ratings) {
            stars = stars + '<i class="fa fa-star checked"> </i>';
          } else {
            stars = stars + '<i class="fa fa-star-o"></i>';
          }
        }
        let discount = Math.floor(((parseInt(product.price) - parseInt(product.priceAfterDiscount)) / parseInt(product.price)) * 100);

        cards = cards +
          `<section class="card" id="${product.id}">
                        <img src="./images/${product.imageName}.png" alt="${product.imageName}" class="image"/>
                        <div class="wish-icons">
                            <button id="cart-btn"  onclick="addToCart(${index})" data-toggle="tooltip" data-placement="top" title="add To Cart">
                              <img src="images/cart.png" class="cart">
                            </button>
                            <a href="./product-view.html" target="_blank">
                                <img src="images/view.png" class="view">
                            </a>
                            <button id="wishlist-btn"  onclick="addToWishlist(${index})" data-toggle="tooltip" data-placement="top" title="add To wishlist">
                              <img src="images/wishlist.png" class="love">
                            </button>
                        </div>
                        <div class="details-ratings">
                            <h3 class="text1">${product.name}</h3>
                            <h4>
                                <span class="discounted">Rs ${product.priceAfterDiscount}</span>
                                <span class="actual-price">Rs ${product.price}</span>
                                <span class="discount">(${discount}% Off)</span></h4>
                            </h4>
                            <div class="ratings">
                                ${stars}
                            </div>
                            ${isNewDiv}
                        </div>
                    </section>`;
      });
      document.querySelector('#productsListArea').innerHTML = cards;
    });
}
loadProducts(productsListUrl);
