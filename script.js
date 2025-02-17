document.addEventListener('DOMContentLoaded', () => {
    const cartItems = [];
    const totalPriceElement = document.getElementById('totalPrice');
    const cartItemsElement = document.getElementById('cartItems');
    const orderForm = document.getElementById('orderForm');

    const calculateTotalPrice = () => {
        let totalPrice = 0;
        cartItems.forEach(item => {
            let itemPrice = item.price * item.quantity;

            if (item.addOns.length > 0) {
                item.addOns.forEach(addOn => {
                    itemPrice += parseFloat(addOn.price) * addOn.quantity;
                });
            }

            totalPrice += itemPrice;
        });
        totalPriceElement.textContent = `RM ${totalPrice.toFixed(2)}`;
    };

    const updateCart = () => {
        cartItemsElement.innerHTML = '';
        cartItems.forEach((item, index) => {
            const li = document.createElement('li');
            let itemDescription = `${item.name} - RM ${item.price.toFixed(2)} x ${item.quantity}`;

            if (item.addOns.length > 0) {
                itemDescription += ' (';
                item.addOns.forEach((addOn, addOnIndex) => {
                    if (addOnIndex > 0) itemDescription += ', ';
                    itemDescription += `${addOn.name} x ${addOn.quantity} (+RM ${(parseFloat(addOn.price) * addOn.quantity).toFixed(2)})`;
                });
                itemDescription += ')';
            }

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-item');
            removeButton.dataset.index = index;
            removeButton.addEventListener('click', removeItem);
            
            li.textContent = itemDescription;
            li.appendChild(removeButton);
            cartItemsElement.appendChild(li);
        });
        calculateTotalPrice();
    };

    const removeItem = (event) => {
        const index = event.target.dataset.index;
        cartItems.splice(index, 1);
        updateCart();
    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const menuItem = event.target.closest('.menuItem');
            const itemName = menuItem.getAttribute('data-name');
            const itemPrice = parseFloat(menuItem.getAttribute('data-price'));
            const itemQuantity = parseInt(menuItem.querySelector('.quantity').value, 10);
            
            const addOns = Array.from(menuItem.querySelectorAll('.addon-quantity')).map(input => {
                return {
                    name: input.name.replace('Qty', ''),
                    price: input.getAttribute('data-price'),
                    quantity: parseInt(input.value, 10)
                };
            }).filter(addOn => addOn.quantity > 0);
            
            const existingItem = cartItems.find(item => item.name === itemName && JSON.stringify(item.addOns) === JSON.stringify(addOns));
            if (existingItem) {
                existingItem.quantity += itemQuantity;
                existingItem.addOns = addOns;
            } else {
                cartItems.push({ name: itemName, price: itemPrice, quantity: itemQuantity, addOns: addOns });
            }

            updateCart();
        });
    });

    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const meja = document.getElementById('meja').value;
        const special = document.getElementById('special').value;
        const totalPrice = totalPriceElement.textContent;

        let orderDetails = cartItems.map(item => {
            let details = `${item.name} - RM ${item.price.toFixed(2)} x ${item.quantity}`;
            if (item.addOns.length > 0) {
                details += ' (';
                details += item.addOns.map(addOn => `${addOn.name} x ${addOn.quantity} (+RM ${(parseFloat(addOn.price) * addOn.quantity).toFixed(2)})`).join(', ');
                details += ')';
            }
            return details;
        }).join('\n');

        const orderData = {
            name,
            meja,
            special,
            order: orderDetails,
            total: totalPrice
        };

        const googleScriptURL = 'https://script.google.com/macros/s/AKfycbxsHGEFw9QBkvgMwQJINA6E8z-LtECIT04TLKKkyINv/dev'; // Replace with your actual Google Apps Script URL
        fetch(googleScriptURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
            alert('Order sent to Google Sheets successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to send order to Google Sheets.');
        });
    });

    updateCart();
});


    
 // Function to open the popup
 function openPopup() {
    document.getElementById('popup').style.display = 'block';
}

// Function to close the popup
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

// Open the popup after 3 seconds
window.onload = function() {
    setTimeout(openPopup, 1000);
    typeWriter();
};



const orderForm = {
    item: 'Item name',
    quantity: 5,
    name: 'John Doe',
    contact: 'john.doe@example.com'
  };

  //snow effect

  const snowContainer = document.getElementById('snow-container');
const numberOfSnowflakes = 100; // Adjust the number of snowflakes

for (let i = 0; i < numberOfSnowflakes; i++) {
    const snowflake = document.createElement('div');
    snowflake.classList.add('snowflake');
    snowflake.style.left = `${Math.random() * 100}vw`;
    snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`; // Vary the speed of falling snowflakes
    snowflake.style.animationDelay = `${Math.random() * 2}s`; // Stagger the start time of snowflakes
    snowContainer.appendChild(snowflake);
}

function addItem() {
    // Simulate adding an item (you can replace this with your actual item adding logic)
    console.log('Item added');

    // Show the success message
    const successMessage = document.getElementById('success-message');
    successMessage.style.opacity = 1;

    // Hide the success message after 3 seconds
    setTimeout(() => {
        successMessage.style.opacity = 0;
    }, 3000);
}

const text = "Selamat Datang Ke Restoran Ayam Gepuk Ngences";
    const typewriterElement = document.getElementById('typewriter');
    let index = 0;

    function typeWriter() {
      if (index < text.length) {
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 100); // Adjust the delay for typing speed
      }
    }

const audio = document.getElementById('background-music');

function togglePlay() {
    if (audio.paused) {
        audio.play();
    } else {
        audio.pause();
    }
}

function stopMusic() {
    audio.pause();
    audio.currentTime = 0; // Reset to the beginning
}

function changeVolume(volume) {
    audio.volume = volume;
}









