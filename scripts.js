// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded');
    console.log('Initial cart:', cart);
    console.log('Initial favorites:', favorites);
    console.log('Initial itemQuantity:', itemQuantity);
    console.log('Initial favoritesQuantity:', favoritesQuantity);
});
let products = []; // This could be a global array where all products are added
let cart = [];
let favorites = [];
let itemQuantity;
let favoritesQuantity;

const cartPreviewTrigger = document.getElementById('shopping-cart-preview-trigger');
const cartPreview = document.getElementById('cart-preview');
const closeCartPreview = document.querySelector('.close-cart-preview');

const favoritesCartPreviewTrigger = document.getElementById('fav-cart-preview-trigger');
const favoritesCartPreview = document.getElementById('fav-cart-preview');
const closeFavoritesCartPreview = document.querySelector('.close-fav-cart-preview');

const searchButton = document.getElementById('search-button');
const searchPopup = document.getElementById('search-popup');
const closeButton = document.querySelector('.close-button');

window.onload = function() {
    // Initialize quantities if they don't exist
    if (itemQuantity === undefined) {
        itemQuantity = 0;
    }
    if (favoritesQuantity === undefined) {
        favoritesQuantity = 0;
    }
    
    // Initialize arrays if they don't exist
    if (!Array.isArray(cart)) {
        cart = [];
    }
    if (!Array.isArray(favorites)) {
        favorites = [];
    }
    
    loadCart();
    loadFavorites();
    updateCartPreview();
    updateFavoritesCartPreview();
    loadProductsToIndex();

    // Open cart preview when icon is clicked
    if(cartPreviewTrigger) {
        cartPreviewTrigger.addEventListener('click', function() {
            cartPreview.classList.add('show');
            document.body.classList.add('cart-open'); // Prevent scrolling and add dark background
            // Add this line if not already present
            document.querySelector('.navbar').classList.add('dark'); // Darken navbar if needed
        });
    } else {
        console.error('Element with ID "element-id" not found.');
    }
        
    // Close cart preview when 'X' is clicked
    if(closeCartPreview) {
        closeCartPreview.addEventListener('click', function() {
            cartPreview.classList.remove('show');
            document.body.classList.remove('cart-open'); // Restore scrolling and remove dark background
            // Add this line if not already present
            document.querySelector('.navbar').classList.remove('dark'); // Restore navbar color if needed
        });
    } else {
        console.error('Element with ID "element-id" not found.');
    }

    // Open fav cart preview when icon is clicked
    if(favoritesCartPreviewTrigger) {
        favoritesCartPreviewTrigger.addEventListener('click', function() {
            favoritesCartPreview.classList.add('show');
            document.body.classList.add('fav-cart-open'); // Prevent scrolling and add dark background
            // Add this line if not already present
            document.querySelector('.navbar').classList.add('dark'); // Darken navbar if needed
        });
    } else {
        console.error('Element with ID "element-id" not found.');
    }
    
    // Close fav cart preview when 'X' is clicked
    if(closeFavoritesCartPreview) {
        closeFavoritesCartPreview.addEventListener('click', function() {
            favoritesCartPreview.classList.remove('show');
            document.body.classList.remove('fav-cart-open'); // Restore scrolling and remove dark background
            // Add this line if not already present
            document.querySelector('.navbar').classList.remove('dark'); // Restore navbar color if needed
        });
    } else {
        console.error('Element with ID "element-id" not found.');
    }

    // Show the pop-up when search button is clicked
    searchButton.addEventListener('click', function() {
        searchPopup.style.display = 'flex';
    });
    
    // Close the pop-up when 'X' is clicked
    closeButton.addEventListener('click', function() {
        searchPopup.style.display = 'none';
    });
}

// Storage optimization and error handling utilities
const StorageHandler = {
    // Check available space in localStorage
    checkStorageSpace() {
        let total = 0;
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                total += localStorage[key].length;
            }
        }
        return {
            used: total,
            remaining: 5242880 - total // Approximately 5MB limit
        };
    },

    // Compress image data before storage
    compressImageData(imageUrl) {
        // If it's already a relative path, return as is
        if (imageUrl.startsWith('images/')) {
            return imageUrl;
        }
        // If it's a data URL, store only the relative path
        return imageUrl.replace(/^data:image\/(png|jpg|jpeg);base64,.*$/, 'images/product-placeholder.png');
    },

    // Save data with error handling and compression
    saveData(key, data) {
        try {
            // Deep clone the data to avoid modifying the original
            const compressedData = JSON.parse(JSON.stringify(data));
            
            // Compress images in the data
            if (Array.isArray(compressedData)) {
                compressedData.forEach(item => {
                    if (item.productImage || item.image) {
                        item.productImage = this.compressImageData(item.productImage || item.image);
                    }
                });
            }

            const serializedData = JSON.stringify(compressedData);
            
            // Check if we have enough space
            const spaceNeeded = serializedData.length;
            const { remaining } = this.checkStorageSpace();
            
            if (spaceNeeded > remaining) {
                throw new Error('Storage quota would be exceeded');
            }

            localStorage.setItem(key, serializedData);
            return true;
        } catch (error) {
            console.error(`Error saving ${key}:`, error);
            if (error.name === 'QuotaExceededError' || error.message === 'Storage quota would be exceeded') {
                // Try to free up space by cleaning old data
                this.cleanupStorage();
                // Try saving again
                try {
                    localStorage.setItem(key, JSON.stringify(data));
                    return true;
                } catch (retryError) {
                    console.error('Failed to save even after cleanup:', retryError);
                    return false;
                }
            }
            return false;
        }
    },

    // Clean up storage when needed
    cleanupStorage() {
        // Remove any old or temporary data
        const keysToPreserve = ['cart', 'favorites', 'iQuantity', 'fQuantity'];
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key) && !keysToPreserve.includes(key)) {
                localStorage.removeItem(key);
            }
        }
    }
};

// Modified update preview functions
function updateCartPreview() {
    console.log('Updating cart preview with cart:', cart);
    let cartPreviewItems = document.getElementById('cart-preview-items');
    let cartPreviewTotal = document.getElementById('cart-preview-total');
    const cartFooter = document.querySelector('.cart-footer');
    
    if (!cartPreviewItems || !cartPreviewTotal) {
        console.error('Missing cart preview elements');
        return;
    }

    cartPreviewItems.innerHTML = ''; // Clear the preview display
    let total = 0;

    if (cart.length === 0) {
        // Cart is empty, show the empty message
        cartPreviewItems.innerHTML = '<p style="text-align: left; margin-left: 30px; font-size: 20px;">Nessun prodotto nel carrello!</p>';
        cartFooter.style.display = 'none'; // Hide the footer with subtotal and buttons
    } else {
        // Cart has items, display them
        cartFooter.style.display = 'block'; // Show footer if there are items
        cart.forEach((item, index) => {
            let itemPrice = parseFloat(item.price);  // Convert price to a number
            if (!isNaN(itemPrice)) {
                let itemTotal = item.price * item.quantity;
                total += itemTotal;
                // Uncomment for debugging console.log("pI ", item.productImage, " pN ", item.productName, " pId ", item.productId, " p ", item.price);
                cartPreviewItems.innerHTML += `
                <li style="display: flex; align-items: flex-start;">
                    <img src="${item.productImage}" style="width: 90px; height: 90px;">
                    <div style="margin-left: 10px; display: flex; flex-direction: column; width: 100%;">
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <span style="margin-bottom: 5px; margin-left: 10px;">${item.productName}</span>
                            <button onclick="removeFromCart(${index})" id="remove-item" style="background: none; border: none; font-size: 20px; font-weight: bold; cursor: pointer; margin-right: 35px;">&times;</button>
                        </div>
                        <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                            <span style="margin-left: 10px;">${item.quantity} x ${itemPrice.toFixed(2)} €</span>
                        </div>
                    </div>
                </li>`;
            } else {
                console.error('Price is not a valid number for product:', item.productName);
            }
        });
    }        

    cartPreviewTotal.textContent = `${total.toFixed(2)} €`;

    // Show the cart preview
    document.getElementById('cart-preview').style.display = 'block';
}

/*// Function to update cart UI
function updateCartUI() {
    let cartItems = document.getElementById('cart-items');
    let cartTotal = document.getElementById('cart-total');

    if (!cartItems || !cartTotal) {
        console.error('Required elements are missing from the HTML.');
        return;
    }

    cartItems.innerHTML = ''; // Clear the existing cart items
    let total = 0;

    cart.forEach((item, index) => {
        let itemTotal = item.price * item.quantity;
        total += itemTotal;

        // Create a list item for each cart product with a "Remove" button
        cartItems.innerHTML += `
            <li>
                <img src="${item.productImage}" style="width: 100px; height: 100px">
                ${item.productName} - Quantity: ${item.quantity} - Total: €${itemTotal.toFixed(2)}
                <button onclick="removeFromCart(${index})">Remove</button><br>
            </li>`;
    });

    // Update the total price
    cartTotal.textContent = `€${total.toFixed(2)}`;
} */

// Update the preview when a product is added
// Modified add functions with optimized storage
function addToCart(productImage, productName, productId, price) {
    console.log('Adding to cart:', { productImage, productName, productId, price });
    
    try {
        let existingItem = cart.find(item => item.productId === productId);
        
        if (existingItem) {
            existingItem.quantity++;
            itemQuantity++;
        } else {
            const newItem = {
                productImage: StorageHandler.compressImageData(productImage),
                productName,
                productId,
                price: parseFloat(price),
                quantity: 1
            };
            cart.push(newItem);
            itemQuantity++;
        }
        
        saveCart();
        updateCartPreview();
    } catch (error) {
        console.error('Error in addToCart:', error);
        alert('Failed to add item to cart. Please try again.');
    }
}

// Function to save cart to local storage
// Modified save functions using the new handler
function saveCart() {
    console.log('Saving cart to localStorage:', cart);
    const success = StorageHandler.saveData('cart', cart);
    if (success) {
        StorageHandler.saveData('iQuantity', itemQuantity);
        loadCart();
    } else {
        alert('Failed to save cart. Storage space might be full.');
    }
}

// Function to load cart from local storage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    const savedQuantity = localStorage.getItem('iQuantity');
    if (savedCart && savedQuantity) {
        cart = JSON.parse(savedCart);
        itemQuantity = JSON.parse(savedQuantity);
    } else {
        cart = [];
        itemQuantity = 0;
    }

    // Show items quantity
    document.getElementById('cart-count').innerText = itemQuantity;
}

function removeFromCart(index) {
    let numberOfDlt = cart[index].quantity;
    itemQuantity -= numberOfDlt;
    cart.splice(index, 1); // Remove the item at the given index
    saveCart();            // Save the updated cart to localStorage
    // updateCartUI();         // Update the cart UI
    updateCartPreview();    // Update the cart preview
}

function emptyCart() {
    cart = []; // Clear the cart array
    itemQuantity = 0;
    saveCart(); // Save the empty cart to localStorage
    updateCartUI(); // Update the cart UI to reflect the empty cart
}

// Add event listeners for 'Add to Cart' buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            let productImage = this.getAttribute('product-image');
            let productName = this.getAttribute('product-name');
            let productId = this.getAttribute('data-product-id');
            let price = parseFloat(this.getAttribute('data-price'));
            addToCart(productImage ,productName, productId, price);
        });
    });

    // Only load cart on the cart page
    if (document.body.classList.contains('cart-page')) {
        loadCart();
    }
});

// Trigger showCartPreview on Add to Cart click without toggling visibility
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        // Your existing logic for adding items to cart
        //showCartPreview(); // Ensure it only opens without toggling it off
    });
});

/* Favorites cart */
function updateFavoritesCartPreview() {
    console.log('Updating favorites preview with favorites:', favorites);
    let favoritesCartPreviewItems = document.getElementById('fav-cart-preview-items');

    if (!favoritesCartPreviewItems) {
        console.error('Missing favorites preview elements');
        return;
    }

    favoritesCartPreviewItems.innerHTML = ''; // Clear the preview display

    if (favorites.length === 0) {
        // favCart is empty, show the empty message
        favoritesCartPreviewItems.innerHTML = '<p style="text-align: left; margin-left: 30px; font-size: 20px;">Nessun prodotto è stato aggiunto alla lista dei desideri!</p>';
    } else {
        // favCart has items, display them
        favorites.forEach((item, index) => {
            favoritesCartPreviewItems.innerHTML += `
            <li>
                <img src="${item.productImage}" style="width: 90px; height: 90px">
                <div style="width: 100%; height: 90px;">
                    <div style="text-align: left; text-align: top; margin-left: 20px; justify-content: space-between;">${item.productName}<br>
                    ${item.price.toFixed(2)} €
                    </div> 
                    <button onclick="addToCart('${item.productImage}', '${item.productName}', '${item.productId}', '${item.price.toFixed(2)}')" id="add-to-cart-from-fav" style="margin-top: 0px; margin-left: 10px;">Buy
                    <img src="images/shopping-cart-icon.png" style="height: 30px; width: 30px;"></button>
                    <button onclick="removeFromFavorites(${index})" id="remove-item" style="margin-top: 0px; margin-left: 140px; ">&times;</button> 
                </div>
            </li>`;
        });
    }

    // Show the cart preview
    document.getElementById('fav-cart-preview').style.display = 'block';
}

/* //Function to update fav-cart UI
function updateFavCartUI() {
    let favCartItems = document.getElementById('fav-cart-items');

    if (!favCartItems) {
        console.error('Required elements are missing from the HTML.');
        return;
    }

    favCartItems.innerHTML = ''; // Clear the existing fav cart items

    cart.forEach((item, index) => {

        // Create a list item for each cart product with a "Remove" button
        favCartItems.innerHTML += `
            <li>
                <img src="${item.productImage}" style="width: 100px; height: 100px">
                ${item.productName} - Quantity: ${item.quantity} - Total: €${itemTotal.toFixed(2)}
                <button onclick="removeFromCart(${index})">Remove</button><br>
            </li>`;
    });

    // Update the total price
    favCartTotal.textContent = `€${total.toFixed(2)}`;
} */

    function addToFavorites(productImage, productName, productId, price) {
        console.log('Adding to favorites:', { productImage, productName, productId, price });
        
        try {
            let existingItem = favorites.find(item => item.productId === productId);
            
            if (existingItem) {
                alert('This product is already in your favorites');
                return;
            }
            
            const newItem = {
                productImage: StorageHandler.compressImageData(productImage),
                productName,
                productId,
                price: parseFloat(price),
                quantity: 1
            };
            favorites.push(newItem);
            favoritesQuantity++;
            
            saveFavorites();
            updateFavoritesCartPreview();
        } catch (error) {
            console.error('Error in addToFavorites:', error);
            alert('Failed to add item to favorites. Please try again.');
        }
    }

// Function to save favorites to local storage
function saveFavorites() {
    console.log('Saving favorites to localStorage:', favorites);
    const success = StorageHandler.saveData('favorites', favorites);
    if (success) {
        StorageHandler.saveData('fQuantity', favoritesQuantity);
        loadFavorites();
    } else {
        alert('Failed to save to favorites. Storage space might be full.');
    }
}

// Function to load favorites from local storage
function loadFavorites() {
    const savedFavCart = localStorage.getItem('favorites');
    const savedFavQuantity = localStorage.getItem('fQuantity');
    if (savedFavCart && savedFavQuantity) {
        favorites = JSON.parse(savedFavCart);
        favoritesQuantity = JSON.parse(savedFavQuantity);
    } else {
        favorites = [];
        favoritesQuantity = 0;
    }

    // Show favorites quantity
    document.getElementById('fav-count').innerText = favoritesQuantity;
}

function removeFromFavorites(index) {
    let numberOfDlt = favorites[index].quantity;
    favoritesQuantity -= numberOfDlt;
    favorites.splice(index, 1); // Remove the item at the given index
    saveFavorites();            // Save the updated fav cart to localStorage
    updateFavoritesCartPreview();    // Update the fav cart preview
}

// Add event listeners for 'Add to Fav' buttons
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.add-to-favorites').forEach(button => {
        button.addEventListener('click', function() {
            let productImage = this.getAttribute('product-image');
            let productName = this.getAttribute('product-name');
            let productId = this.getAttribute('data-product-id');
            let price = parseFloat(this.getAttribute('data-price'));
            addToFavorites(productImage ,productName, productId, price);
        });
    });

    /* Only load cart on the cart page
    if (document.body.classList.contains('fav-cart-page')) {
        loadFavorites();
    }*/
});

// Trigger showFavCartPreview on AddFav to Cart click without toggling visibility
document.querySelectorAll('.add-to-favorites').forEach(button => {
    button.addEventListener('click', () => {
        // Your existing logic for adding items to cart
        //showFavoritesCartPreview(); // Ensure it only opens without toggling it off
    });
});

const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
});

function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update();
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const section_2 = document.getElementById("horizontal");
let box_items = gsap.utils.toArray(".horizontal__item");

gsap.to(box_items, {
  xPercent: -100 * (box_items.length - 1),
  ease: "sine.out",
  scrollTrigger: {
    trigger: section_2,
    pin: true,
    scrub: 3,
    snap: 1 / (box_items.length - 1),
    end: "+=" + section_2.offsetWidth
  }
});

function reloadPage() {  
    window.scrollTo(0, 0); // Scrolls to the top setTimeout(() => {
    location.reload();
}

function openPage(page) {
    window.location.href = page;  // This will redirect the user to the provided page
}

document.addEventListener("DOMContentLoaded", function() {
    const navLinks = document.querySelectorAll(".navbar a"); // Assuming links are inside the navbar
    const currentPage = window.location.pathname.split("/").pop(); // Get current page name

    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});

document.getElementById('italian-icon').addEventListener('click', function() {
    var dropdown = document.getElementById('language-dropdown');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
});

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.language-icon')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
};

function openDatabase() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('ProductsDatabase', 1);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('products')) {
                db.createObjectStore('products', { keyPath: 'id' });
            }
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

// Function to display products on index.html
function displayProductsOnIndexPage(products) {
    const productContainer = document.getElementById('product-container');
    if (!productContainer) {
        console.error('Product container not found');
        return;
    }
    
    productContainer.innerHTML = '';  // Clear existing products

    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-item');
        productDiv.innerHTML = `            
            <div class="product-item">
                <a href="product.html">
                    <img src="${product.image}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p>Price: ${product.price.toFixed(2)} €</p>
                </a>
                <div class="product-actions">
                    <button class="add-to-favorites" 
                        product-name="${product.name}" 
                        product-image="${product.image}" 
                        data-product-id="${product.id}" 
                        data-price="${product.price}">
                        <img id="add-to-fav-img" src="images/favorites-icon.png" alt="Add to Favorites">
                    </button>
                    <button class="add-to-cart" 
                        product-name="${product.name}" 
                        product-image="${product.image}" 
                        data-product-id="${product.id}" 
                        data-price="${product.price}">
                        <img id="add-to-cart-img" src="images/shopping-cart-icon.png" alt="Add to Cart">
                    </button>
                </div>
            </div>
        `;
        productContainer.appendChild(productDiv);
        
        // Add event listeners to the newly created buttons
        const favButton = productDiv.querySelector('.add-to-favorites');
        const cartButton = productDiv.querySelector('.add-to-cart');
        
        favButton.addEventListener('click', function(e) {
            e.preventDefault();
            const productImage = this.getAttribute('product-image');
            const productName = this.getAttribute('product-name');
            const productId = this.getAttribute('data-product-id');
            const price = parseFloat(this.getAttribute('data-price'));
            addToFavorites(productImage, productName, productId, price);
        });
        
        cartButton.addEventListener('click', function(e) {
            e.preventDefault();
            const productImage = this.getAttribute('product-image');
            const productName = this.getAttribute('product-name');
            const productId = this.getAttribute('data-product-id');
            const price = parseFloat(this.getAttribute('data-price'));
            addToCart(productImage, productName, productId, price);
        });
    });
}

// Updated function to load products - remove the duplicate display call
function loadProductsToIndex() {
    openDatabase().then((db) => {
        const transaction = db.transaction('products', 'readonly');
        const store = transaction.objectStore('products');
        const request = store.getAll();

        request.onsuccess = (event) => {
            const products = event.target.result;
            displayProductsOnIndexPage(products); // Only call this once
        };

        request.onerror = (event) => {
            console.error('Error loading products:', event.target.error);
        };
    }).catch((error) => {
        console.error('Error opening the database:', error);
    });
}

// Updated initialization code
document.addEventListener('DOMContentLoaded', function() {
    loadProductsToIndex();
    loadCart();
    loadFavorites();
    updateCartPreview();
    updateFavoritesCartPreview();

    // Cart preview handlers
    const cartPreviewTrigger = document.getElementById('shopping-cart-preview-trigger');
    const favoritesCartPreviewTrigger = document.getElementById('fav-cart-preview-trigger');
    
    if (cartPreviewTrigger) {
        cartPreviewTrigger.addEventListener('click', function() {
            document.getElementById('cart-preview').classList.add('show');
            document.body.classList.add('cart-open');
        });
    }
    
    if (favoritesCartPreviewTrigger) {
        favoritesCartPreviewTrigger.addEventListener('click', function() {
            document.getElementById('fav-cart-preview').classList.add('show');
            document.body.classList.add('fav-cart-open');
        });
    }
});