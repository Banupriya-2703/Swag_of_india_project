function updateCountry() {
    let contacts = new Map()
    contacts.set('INDIA', '+918888888888')
    contacts.set('USA', '+18888888888')
    contacts.set('UK', '+448888888888')
    let countryName = document.getElementById("countriesList").value;
    document.getElementById("number").innerHTML = contacts.get(countryName);
    document.getElementById("nationFlag").src = `images/${countryName}.jpg`;
}

// using eventlistener.....
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


updateWishlist();

function getWishlistItems() {
    return JSON.parse(localStorage.getItem("MyWishlist")) || []
}


function addToWishlist(index) {
    let products = JSON.parse(localStorage.getItem("MyProducts"));
    let body = products[index];
    let myWishlist = localStorage.getItem("MyWishlist");
    let note = "";
    if (myWishlist == null) {
        note = [];
        note.push(body);
    } else {
        note = JSON.parse(myWishlist);
        note.forEach((ele, index) => {
            if (ele.id == body.id) {
                body = null;
                alert("already in wishlist");
            }
        })
        if (body != null) {
            note.push(body);
        }
    }
    localStorage.setItem("MyWishlist", JSON.stringify(note));
    updateWishlist();
}


function updateWishlist() {
    let note = getWishlistItems();
    let cards = '';
    note.forEach((element, index) => {
        let stars = '';
        const ratings = Math.floor(+element.ratings);
        for (let i = 1; i <= 5; i++) {
            if (i <= ratings) {
                stars = stars + '<i class="fa fa-star checked"> </i>';
            } else {
                stars = stars + '<i class="fa fa-star-o"></i>';
            }
        }
        let discount = Math.floor(((parseInt(element.price) - parseInt(element.priceAfterDiscount)) / parseInt(element.price)) * 100);
        cards = cards +
            `<div class="wishlist-item">
                <div class="sec1">
                    <img src="./images/${element.imageName}.png" alt="${element.imageName}"/>
                </div>
                <div class="sec2">
                    <p class="title">${element.name}</p>
                    <div class="ratings">
                        ${stars}
                        <p>(2850)</p>
                    </div>
                    <div class="wishlist-price">
                        <p class="discounted-price">Rs. ${element.priceAfterDiscount}</p>
                        <p class="price">Rs.${element.price} </p>
                        <p id="percent">(${discount}% Off)</p>
                    </div>
                    <div class="input-group mb-3">
                        <select id="inputGroupSelect01">
                            <option selected>Select pack of...</option>
                            <option value="1">2 packs</option>
                            <option value="2">3 packs</option>
                            <option value="3">4 packs</option>
                        </select>
                    </div>
                    <div class="btn-group" role="group" aria-label="Basic example">
                        <button type="button" id="wishlist-to-cart" onclick="addToCart(${index})" >Add to Cart</button>
                        <div>|</div>
                        <button type="button" id="wishlist-remove" onclick="removeWishlistItem(${index})">Remove from wishlist</button>
                    </div>
                </div>
            </div>
            <hr>`;
    });
    if (note != 0) {
        console.log("hi")
        document.querySelector('#my-wishlist').innerHTML = cards;
    } else {
        document.querySelector('#my-wishlist').innerHTML = `<div class="wishlist-item">
                                                        <h1>NO ITEMS LEFT</h1>
                                                      </div>`;
    }
}


// get total quantity

function getWishlistQty() {
    let myWishlist = getWishlistItems();
    if (myWishlist.length == 0) {
        document.getElementById("count-wishlist-items").innerHTML = `(0 items)`;
    } else {
        let total_items = myWishlist.map(item => {
            return 1;
        }).reduce((prev, next) => {
            return prev + next;
        }, 0)

        document.getElementById("count-wishlist-items").innerHTML = `(${total_items} items)`;
    }
}

getWishlistQty();



// function customFunc(id){
//     let products = JSON.parse(localStorage.getItem("MyProducts"));
//     let wishlistItems=getWishlistItems();
//     let body=wishlistItems.find(item=>item.id==id);
//     let index1=0;
//     for(let i=0;i<products.length;i++){
//         if(products[i].id==body.id){
//             index1=i;
//         }
//     }
//     console.log(index1);
//    addToCart(index1);
// }

function removeWishlistItem(index) {
    let note = getWishlistItems();
    note.splice(index, 1);
    localStorage.setItem("MyWishlist", JSON.stringify(note));
    updateWishlist();
    getWishlistQty();
}