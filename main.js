
const items = {
  flavors: [
    {id: 1, name: 'Chocolate', img: './assets/chocolates.jpg', price: 3, type: 'scoop'},
    {id: 2, name: 'Blue Berry', img: './assets/blueberry.jpg', price: 3, type: 'scoop'},
    {id: 3, name: 'Mint', img: './assets/mint.jpg', price: 3, type: 'scoop'},
    {id: 4, name: 'Oreo', img: './assets/oreo.jpg', price: 5, type: 'scoop'}
  ],
  containers: [
    {id: 5, name: 'Waffle Cone', img: './assets/waffle.jpg', price: 2, type: 'container'},
    {id: 6, name: 'Cone', img: './assets/cone.webp', price: 1, type: 'container'},
    {id: 7, name: 'Bowl', img: './assets/bowl.jpg', price: 1, type: 'container'}
  ]
}

let cart = []
let total = 0
let wallet = 20

function drawScoops() {
  let template = ''
    items.flavors.forEach(flavor => {
      template += `
      <div class="col-6 g-0 m-1">
        <img class="object-fit p-1 rounded" src="${flavor.img}" alt="" title="${flavor.name}">
        <p>${flavor.name}</p>
        <p>$${flavor.price}</p>
        <button class="btn btn-primary" onclick="addToCart(${flavor.id})" >Add to Order</button>
      </div>`
    });
    document.getElementById('scoops').innerHTML = template
  }

function drawContainers() {
  let template = ''
  items.containers.forEach(container => {
    template += `
      <div class="col-6 g-0 m-1">
        <img class="object-fit p-1 rounded" src="${container.img}" alt="" title="${container.name}">
        <p>${container.name}</p>
        <p>$${container.price}</p>
       <button class="btn btn-primary" onclick="addToCart(${container.id})" >Add to Order</button>
      </div>`
  });
  document.getElementById('containers').innerHTML = template
}

function drawCart() {
  let template = ''
  let subTotal = 0
  cart.forEach((cartItem, index) => {
    template += `
      <div class="col bg-warning d-flex mt-4">
        <p class="m-1">${cartItem.name} ${cartItem.type}</p>
        <p class="m-1">$${cartItem.price}</p>
        <i class="m-1 mdi mdi-close-circle remove-btn" onclick="removeItem(${index})"></i>
      </div>`
    subTotal += cartItem.price
  });
  document.getElementById('cart').innerHTML = template
  // @ts-ignore
  document.getElementById('total').innerText = Math.floor(subTotal)
}

function addToCart(ItemId) {
  if (ItemId < 5) {
    let addFlavor = items.flavors.find(flavor => flavor.id == ItemId)
    total += addFlavor.price
    cart.push(addFlavor)
  } else {
    let addContainer = items.containers.find(container => container.id == ItemId)
    total += addContainer.price
    cart.push(addContainer)
  }
  drawCart()
}

function pay() {
  if (total <= wallet) {
    window.alert('Thank you for you purchase')
  } else {
    window.alert('You appear to be lacking sufficient money for this transaction')
  }
  total = 0
  cart = []
  wallet = Math.floor(Math.random() * 100)
  drawCart()
}

function removeItem(index) {
  
  let toRemove = cart[index]
  total -= toRemove.price
  cart.splice(index,1)

  drawCart()
}

drawScoops()
drawContainers()