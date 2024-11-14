let isLoggedIn = false; // Variable para almacenar el estado de la sesión (inicia en falso)

// Función para abrir el modal
function openModal() {
    document.getElementById('loginModal').style.display = 'block';
}

// Función para cerrar el modal
function closeModal() {
    document.getElementById('loginModal').style.display = 'none';
}

// Cerrar el modal si se hace clic fuera del contenido
window.onclick = function(event) {
    if (event.target == document.getElementById("loginModal")) {
        closeModal();
    }
}

// Función de inicio de sesión
function login(event) {
    event.preventDefault();  // Prevenir el envío del formulario

    // Aquí puedes agregar la lógica para verificar las credenciales (por ejemplo, con una API o localStorage)
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simulación de login exitoso
    if (username && password) {
        isLoggedIn = true; // Cambiar el estado de la sesión a "loggeado"
        document.getElementById('loginModal').style.display = 'none'; // Cerrar el modal
        showLogoutButton();  // Mostrar el botón de cerrar sesión
    }
}

// Función para mostrar el botón de "Cerrar sesión"
function showLogoutButton() {
    document.getElementById('loginButton').style.display = 'none'; // Ocultar el botón de inicio de sesión
    document.getElementById('logoutButton').style.display = 'inline-block'; // Mostrar el botón de cerrar sesión
}

// Función para cerrar sesión
function logout() {
    isLoggedIn = false; // Cambiar el estado de la sesión a "no loggeado"
    document.getElementById('loginButton').style.display = 'inline-block'; // Mostrar el botón de iniciar sesión
    document.getElementById('logoutButton').style.display = 'none'; // Ocultar el botón de cerrar sesión

    // Aquí puedes agregar más lógica para eliminar las credenciales del usuario si las almacenaste
    // (por ejemplo, eliminar cookies o localStorage)
    // localStorage.removeItem('userToken');
    // sessionStorage.clear(); // Para limpiar el sessionStorage si es que usas sesión
}

//carrito de compras//

 // Obtiene el carrito desde el almacenamiento local
let cart = JSON.parse(localStorage.getItem('cart')) || []; 

 // Función para agregar productos al carrito
function addToCart(productName, productPrice, productImage) {
    const product = {
        name: productName,
        price: productPrice,
        image: productImage
    };

     // Agregar el producto al carrito
    cart.push(product);

     // Actualizar el carrito en el almacenamiento local
    localStorage.setItem('cart', JSON.stringify(cart));

     // Actualizar la vista del carrito
    updateCartView();
}

 // Función para actualizar la vista del carrito
function updateCartView() {
    const cartItems = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total');
    
     cartItems.innerHTML = '';  // Limpiar los elementos actuales del carrito

    let total = 0;

     // Crear los elementos de la lista del carrito
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.classList.add('cart-item');

        li.innerHTML = `
            
            <div class="details">
                <h3>${item.name}</h3>
                <p>Precio unitario: $${item.price.toFixed(2)}</p>
            </div>
            <div class="price">$${item.price.toFixed(3)}</div>
            <button onclick="removeFromCart(${index})">Eliminar</button>
        `;
        cartItems.appendChild(li);
        total += item.price;
    });

     // Mostrar el total del carrito
    totalPriceElement.innerHTML = `Total: $${total.toFixed(3)}`;
}

 // Función para eliminar un producto del carrito
function removeFromCart(index) {
     cart.splice(index, 1);  // Eliminar el producto en el índice dado
     localStorage.setItem('cart', JSON.stringify(cart));  // Actualizar el almacenamiento local
     updateCartView();  // Actualizar la vista del carrito
}

 // Función para vaciar el carrito
function clearCart() {
     cart = [];  // Vaciar el array del carrito
     localStorage.setItem('cart', JSON.stringify(cart));  // Actualizar el almacenamiento local
     updateCartView();  // Actualizar la vista del carrito
}

 // Función para simular el proceso de compra
function checkout() {
    if (cart.length === 0) {
        alert("El carrito está vacío.");
    } else {
        alert("Compra realizada con éxito. ¡Gracias por tu compra!");
         clearCart();  // Vaciar el carrito después de la compra
    }
}

 // Inicializar la vista del carrito al cargar la página
updateCartView();


