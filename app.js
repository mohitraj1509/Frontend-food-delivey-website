var swiper = new Swiper(".mySwiper", {
    loop: true,
      navigation: {
        nextEl: " .fa-arrow-right",
        prevEl: " .fa-arrow-left",
      },
    });
    const carticon = document.querySelector('.cart-icon');
    const carttab = document.querySelector('.cart-tab');
    const closebtn = document.querySelector('.close-btn');
    const cardlist = document.querySelector('.card-list');
    const cartlist = document.querySelector('.cart-list');
    const carttotal= document.querySelector('.cart-total');
    const cartvalue = document.querySelector('.cart-value');

    carticon.addEventListener('click',()=>{
         carttab.classList.add('cart-tab-active');

    });
     carticon.addEventListener('dblclick',()=>{
            carttab.classList.remove('cart-tab-active');
        });

    
    closebtn.addEventListener('click',()=>{
        carttab.classList.remove('cart-tab-active');
    });

          const updatetotal = () =>{
            let totalprice=0;
            let totalquantity=0;
            const quantity = parseInt(document.querySelector('.quantity-value').textContent);
            document.querySelectorAll('.item').forEach(item => {
                const price = parseFloat (item.querySelector('.item-total').textContent.replace('$',''));
                totalprice += price;
                totalquantity += quantity;
            });

           carttotal.textContent = `Total: $${totalprice.toFixed(2)}`; 
              cartvalue.textContent = totalquantity;
           
          }


    const showcard =() =>{
        productlist.forEach(product => {
            const ordercard = document.createElement('div');
            ordercard.classList.add('order-card');
            ordercard.innerHTML = `
             <div class="card-image">
                        <img src="${product.image}" >
                    </div>
                    <h4>${product.name}</h4>
                    <h4 class="price">${product.price}</h4>
                    <a href="#" class="btn card-btn">Add to cart</a>  `;
                    cardlist.appendChild(ordercard);

        const cardbtn = ordercard.querySelector('.card-btn');
        cardbtn.addEventListener('click',(e)=>{
            e.preventDefault();
            addtocard(product);
          
        });

    });
}


const addtocard =(product) =>{
  const existingproduct = cartproduct.find(item => item.id === product.id);
  if(existingproduct){
    alert("Product already in your cart");
    return;
  }
    cartproduct.push(product);
    let quantity = 1;
    let price = product.price;


   const cartitem = document.createElement('div');
   cartitem.classList.add('item');
    cartitem.innerHTML = `
    <div class="item-image">
                                <img src="${product.image}" >
                            </div>
                            <div class="item-details">
                                <h4>${product.name}</h4>
                                <h4 class="item-total"> ${product.price}</h4>
                            </div>
                            <div class="flex">
                                <a href="#" class="quantity-btn minus">
                                    <i class="fa-solid fa-minus"></i>
                                </a>
                                <h4 class="quantity-value">${quantity}</h4>
                                 <a href="#" class="quantity-btn plus">
                                    <i class="fa-solid fa-plus"></i>
                                </a>
                            </div>
    `;
    cartlist.appendChild(cartitem);

    updatetotal();
    const plusbtn = cartitem.querySelector('.plus');
    const minusbtn = cartitem.querySelector('.minus');
    const quantityvalue = cartitem.querySelector('.quantity-value');
    const itemtotal = cartitem.querySelector('.item-total');
    plusbtn.addEventListener('click',(e)=>{
        e.preventDefault();
        quantity++;
        quantityvalue.textContent = quantity;
        itemtotal.textContent = `$${(price * quantity).toFixed(2)}`;
        updatetotal();
    });
    minusbtn.addEventListener('click',(e)=>{
        e.preventDefault();
        if(quantity > 1){
            quantity--;
            quantityvalue.textContent = quantity;
            itemtotal.textContent = `$${(price * quantity).toFixed(2)}`;
            updatetotal();
        } 
        
        else {
            cartitem.classList.add('slide-out');
            setTimeout(() => {
                     cartitem.remove();
                     cartproduct = cartproduct.filter(item => item.id !== product.id);

                // cartlist.removeChild(cartitem);
            }, 500); // Match the duration of the CSS transition
            cartlist.removeChild(cartitem);
            cartproduct = cartproduct.filter(item => item.id !== product.id);
            updatetotal();
           
        }
    });

}



    let productlist = [];
    let cartproduct = [];

    const initapp = () => {
        fetch("product.json")
            .then(res => res.json())
            .then(data => {
                productlist = data;
                // Uncomment the next line if renderproduct is defined elsewhere
                // renderproduct(data);
                showcard();
            })
            .catch(error => {
                console.error("Error fetching products:", error);
            });
    };
    initapp();

