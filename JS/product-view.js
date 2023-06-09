let img=document.querySelectorAll('img');
for(let i=1;i<=img.length;i++){
    img[i-1].addEventListener('click',function(){
        document.getElementById("show-image").src=`./images/product${i}.png`;
    });
}

let show=document.getElementById("show-image");

var scrollUp=document.getElementById("scrollUp");
scrollUp.classList.add("hideArrow");
getYPosition=()=>{
  var top=window.pageYOffset || document.documentElement.scrollTop;
  return top;
}

document.addEventListener("scroll",()=>{
  var scrollAmount=getYPosition();
  scrolled=()=>{
    window.scroll({
      top:0,
      left:0,
    });
  }
  if(scrollAmount<50){
    document.getElementById("headerSticky").classList.remove("sticky");
    document.getElementById("breads").style.marginTop="0px";
    document.getElementById("image-gallery").style.bottom="50px";
    document.getElementById("image-gallery").style.transition="bottom 0.1s";
  }
  else{
    document.getElementById("headerSticky").classList.add("sticky");
    document.getElementById("breads").style.marginTop="140px";
    document.getElementById("image-gallery").style.bottom="160px";
  }

  if(scrollAmount>800){
    scrollUp.classList.remove("hideArrow");
    scrollUp.classList.add("showArrow");
    scrollUp.addEventListener("click",scrolled)
  }
  else{
    scrollUp.classList.remove("showArrow");
    scrollUp.classList.add("hideArrow");
    scrollUp.removeEventListener("click",scrolled)
  }
})
let output=document.getElementById("output").innerText;
let count=parseInt(output)
function decreaseCount(){
  if(count>0){
    count=count-1;
    document.getElementById("output").innerText=count;
  }
  else{
    alert("count is zero");
  }
}
function increaseCount(){
  count=count+1;
  document.getElementById("output").innerText=count;
}
