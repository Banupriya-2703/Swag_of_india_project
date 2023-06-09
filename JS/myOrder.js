updateOrder();

function addToOrder() {
    let products = JSON.parse(localStorage.getItem("MyProducts"));
    console.log(products);
    let cart = JSON.parse(localStorage.getItem("MyCart"));
    // let body = products[index];
    let myOrder = localStorage.getItem("MyOrder");
    let note = "";
    if (myOrder == null) {
        note = [];
        note.push(...cart);
    } else {
        note = JSON.parse(myOrder);
        // note.forEach((ele, index) => {
        //     if (ele.id == body.id) {
        //         body = null;
        //     }
        // })
        note=note.push(...cart);
    }
    localStorage.setItem("MyOrder", JSON.stringify(note));
    updateOrder();
    localStorage.removeItem("MyCart");

}

function updateOrder() {
    let myOrder = localStorage.getItem("MyOrder");
    if (myOrder == []) {
      note = [];
    } else {
      note = JSON.parse(myOrder);
    }
    let cards = '';
    note.forEach((element, index) => {
      cards = cards +
        ` <div class="order-item">
            <div class="sec1">
                <img src="./images/${element.imageName}.png" alt="${element.imageName}" />
            </div>
            <div class="sec2">
                <p class="title">${element.name}</p>
                <p>color : ${element.color}</p>
                <p>soldBy : ${element.soldBy}</p>
            </div>
            <div class="sec3">
                <p class="discounted-price">Rs. ${element.priceAfterDiscount}</p>
            </div>
            <div class="sec4">
                <div>
                    <i class="fa fa-circle-o" aria-hidden="true"></i>
                    <p>Delivery expected by jul 28</p>
                </div>
                <p>Your Order has been placed</p>
                <a href="" target="_blank">Track Your Order</a>
            </div>
        </div>
        <hr>`;
    });
    if (note != 0) {
      document.querySelector('#my-order').innerHTML = cards;
    } else {
      document.querySelector('#my-order').innerHTML = `<div class="order-item">
                                                        <h1>NO ITEMS LEFT</h1>
                                                      </div>`;
    }
  }
  