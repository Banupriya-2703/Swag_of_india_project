// get products data
let productsListUrl = '/products.json';
async function loadProducts(productsListUrl) {
    fetch(productsListUrl)
        .then(response => response.json())
        .then(data => {
            const products = data.Products;
            console.log(products);
            let total=products.length;
            document.getElementById("total").innerText=`(${total})`
            let cards = '';
            products.forEach(product => {
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
                let discount=Math.floor(((parseInt(product.price)-parseInt(product.priceAfterDiscount))/parseInt(product.price))*100);
                
                cards = cards +
                    `<section class="card" id="${product.id}">
                        <img src="./images/${product.imageName}.png" alt="${product.imageName}" class="image"/>
                        <div class="wish-icons">
                            <button id="cart-btn" onclick="addToCart()" data-toggle="tooltip" data-placement="top" title="add To Cart">
                                <a href="./cart.html" target="_blank">
                                    <img src="images/cart.png" class="cart">
                                </a>
                            </button>
                            <a href="" target="_blank">
                                <img src="images/view.png" class="view">
                            </a>
                            <a href="" target="_blank">
                                <img src="images/wishlist.png" class="love">
                            </a>
                        </div>
                        <div class="details-ratings">
                            <h3>${product.name}</h3>
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