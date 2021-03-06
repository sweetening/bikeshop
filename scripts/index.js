function renderProduct(product) {
  var slide = document.createElement("div");
    slide.className = "swiper-slide";
  var slideProduct = document.createElement("div");
    slideProduct.className = "slide-product";
    slide.appendChild(slideProduct);
  var slideProductImg = document.createElement("img");
    slideProductImg.src = "https://www.tracksupermarket.com/media/catalog/product/cache/1/small_image/840x/040ec09b1e35df139433887a97daa66f/"+product.productId+",width=378,height=378,backgroundColor=F2F2F2";
    slideProduct.appendChild(slideProductImg);
  var slideProductName = document.createElement("p");
    slideProductName.innerText = product.name;
    slideProductName.className = "slide-product-name";
    slideProduct.appendChild(slideProductName);
  var slideProductPrice = document.createElement("p");
    slideProductPrice.innerText = product.price;
    slideProductPrice.className = "slide-product-price";
    slideProduct.appendChild(slideProductPrice);

  // The above JS renders this HTML:
  //
  //  <div class="swiper-slide">
  //    <div class="slide-product">
  //     <img src="https://www.tracksupermarket.com/media/catalog/product/cache/1/small_image/840x/040ec09b1e35df139433887a97daa66f/3/r/3rensho_aluminum_road_frame_takizawa_blue_10.jpg,width=378,height=378,backgroundColor=F2F2F2" alt="Photo of Product for SliderAPI">
  //     <p class="slide-product-name">3Rensho - Light Blue - 56cm - NJS Track Frame</p>
  //     <p class="slide-product-price">$1581</p>
  //    </div>
  //  </div>

  return slide;
}

function loadProducts(){
  var productsSlider = document.getElementById("products-slider");
  fetch('https://www.https://www.tracksupermarket.com/media/catalog/product/cache/1/small_image/')
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function(data){
          var products = data.articles.map(function(currentItem){
            return {
              name: currentItem.name,
              price: "$"+currentItem.price,
              productId: currentItem.productId
            }
          });
          products.forEach(function(product){
            var slide = renderProduct(product);
            productsSlider.appendChild(slide);
          })
          renderSwiper();
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
  }
function renderSwiper(){
  new Swiper('.swiper-container', {
    slidesPerView: "auto",
    autoHeight: true,
    slidesOffsetBefore: 50,
    slidesOffsetAfter: 50,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
      type: "bullets",
      clickable: false,
    },
    breakpoints: {
      360: {
        slidesPerView: 2,
        slidesPerGroup: 1,
        spaceBetween: 5,
        slidesOffsetBefore: 15,
        slidesOffsetAfter: 15,
      },
      768: {
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 10,
      },
      1024: {
        slidesPerView: 5,
        slidesPerGroup: 5,
        spaceBetween: 20,
      },
    }
  })
}

window.addEventListener("load", function(){
  loadProducts();
});
