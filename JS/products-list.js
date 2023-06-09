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
      document.getElementById("nav").style.marginTop = "0px";
      document.getElementById("nav").style.transition = "marginTop 0.3s";
    } else {
      document.getElementById("headerSticky").classList.add("sticky");
      document.getElementById("nav").style.marginTop = "110px";
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