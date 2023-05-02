let cartsWrap = $('.carts')
// ! ADD CART
let cartTemp = $('#cart').content
function printCarts(){
    cartsWrap.innerHTML = ''
    for (let i = 0; i < card.length; i++) {
        let cartTempClone = cartTemp.cloneNode(true)
        cartTempClone.querySelector('.cart-item1 img').src = card[i].src
        cartTempClone.querySelector('.text').textContent = card[i].text
        cartTempClone.querySelector('.cart-item1__info h3').textContent = card[i].name
        cartTempClone.querySelector('.address').textContent = card[i].address
        cartTempClone.querySelector('.cost').textContent = `$${card[i].price}`
        cartTempClone.querySelector('.total-brooms input').value = card[i].total
        cartsWrap.appendChild(cartTempClone)
    }
    $('.choose-all').addEventListener('click', () => {
        if(card.length != 0){
            if($('.choose-all input').checked){
                $$('.cart-item1 input').forEach(e=> {
                    e.checked = true
                })
                $('.form-total').textContent = card.length
                let pr = 0
                for (let i = 0; i < card.length; i++) {
                    pr+=card[i].price * card[i].total
                }
                $('.form-price').textContent = pr
            }
            else{
                $$('.cart-item1 input').forEach(e=> {
                    e.checked = false
                })
                $('.form-total').textContent = 0
                $('.form-price').textContent = 0
            }
        }
    })
    $$('.inc').forEach((e, index) => {
        e.addEventListener('click', () => {
            if($$('.cart-item1 input')[index].checked){
                $('.form-price').textContent = parseInt($('.form-price').textContent) - (card[index].price * card[index].total)
            }
            $$('.totalInp')[index].value++
            card[index].total = $$('.totalInp')[index].value
            if($$('.cart-item1 input')[index].checked){
                $('.form-price').textContent = parseInt($('.form-price').textContent) + (card[index].price * card[index].total)
            }
        })
    });
    $$('.dec').forEach((e, index) => {
        e.addEventListener('click', () => {
            if(!($$('.totalInp')[index].value <= 1)){
                if($$('.cart-item1 input')[index].checked){
                    $('.form-price').textContent = parseInt($('.form-price').textContent) - (card[index].price * card[index].total)
                }
                $$('.totalInp')[index].value--
                card[index].total = $$('.totalInp')[index].value
                if($$('.cart-item1 input')[index].checked){
                    $('.form-price').textContent = parseInt($('.form-price').textContent) + (card[index].price * card[index].total)
                }
            }
        })
    });
    $$('.totalInp').forEach(e => {
        e.addEventListener('keyup', () => {
            for (let i = 0; i < card.length; i++) {
                if(e.dataset.id == card[i].id){
                    $$('.cart-item1 input').forEach(el => {
                        if(el.dataset.id == e.dataset.id){
                            if(el.checked){
                                $('.form-price').textContent = parseInt($('.form-price').textContent) - (card[i].price * card[i].total)
                            }
                        }
                    })
                    if(e.value.length > 3){
                        e.value = e.value.slice(0,3);
                    }
                    card[i].total = e.value
                    $$('.cart-item1 input').forEach(el => {
                        if(el.dataset.id == e.dataset.id){
                            if(el.checked){
                                $('.form-price').textContent = parseInt($('.form-price').textContent) + (card[i].price * card[i].total)
                            }
                        }
                    })
                }
            }
        })
    });
    
    // $$('.delete-cart').forEach(e => {
    //     e.addEventListener('click', () => {
    //         for (let i = 0; i < card.length; i++) {
    //             if(card[i].id == e.dataset.id){
    //                 card.splice(i, 1)
    //             }
    //         }
    //         $('.form-total').textContent = 0
    //         $('.form-price').textContent = 0
    //         localStorage.setItem('SorgoWebCard00100', JSON.stringify(card))
    //         printCarts()
    //     })
    // });
    if($('.cart-item1 input')){
        $$('.cart-item1 input').forEach((e, index)=> {
            e.addEventListener('click', () => {
                for (let i = 0; i < card.length; i++) {
                    if(e.dataset.id == card[i].id){
                        if(e.checked){
                            $('.form-total').textContent = parseInt($('.form-total').textContent) + 1
                            $('.form-price').textContent = parseInt($('.form-price').textContent) + (card[i].price * card[i].total)
                        }else{
                            $('.form-total').textContent = parseInt($('.form-total').textContent) - 1
                            $('.form-price').textContent = parseInt($('.form-price').textContent) - (card[i].price * card[i].total)
                        }
                    }
                }
            })
        })
    }
    $('.total-cart h3>span').textContent = card.length
}

if(card.length != 0){
    printCarts()
}