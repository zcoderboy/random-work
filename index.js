const cart = []

const addToCart = function(event){
  const parent = Array.prototype.slice.call(event.target.parentNode.children)
  const product = {}
  product.id = event.target.parentNode.dataset.id
  product.image = parent[0].src
  product.name = parent[1].innerText
  product.price = +parent[2].innerText
  product.qty = 1
  const cartItem = document.createElement("div")
  cartItem.classList.add('cart-item')
  cartItem.innerHTML = `
    <img src="${product.image}"/>
    <div>
      <h4>${product.name}</h4>
      <h4>Qte - 1</h4>
      <h4>Prix unitaire - ${product.price} F</h4>
    </div>
  `.trim()
  document.querySelector('.cart').prepend(cartItem)
  cart.push(product)
  const total = cart.reduce(function(acc,value){
    return acc + (value.qty*value.price)
  },0)
  document.getElementsByTagName('s')[0].innerText = `${total}`
  document.querySelector('.cart-total').style.display = 'flex'
  cartItem.addEventListener('click',function(e){
    console.log(e)
    updateItem(e,product,cart.length)
  })
}

const updateItem = function(item,product,position){
  document.querySelector('.item-update').style.display = 'flex'
  item = item.target.tagName.toLowerCase() != "div" ? item.target.parentNode : item.target.children[1]
  console.log(item)
  const parent = document.querySelector('.item-update')
  parent.firstElementChild.src = product.image
  parent.children[1].children[1].addEventListener('click',function(){
    cart[position-1].qty = product.qty + parseInt(parent.children[1].children[0].value)
    if(parent.children[1].children[0].value != ""){
      item.children[1].innerText = `Qte - ${cart[position-1].qty}`
      parent.children[1].children[0].value = ""
      const total = cart.reduce(function(acc,value){
        return acc + (value.qty*value.price)
      },0)
      document.getElementsByTagName('s')[0].innerText = `${total}`
    }
  })
}