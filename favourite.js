// Variables for the navbar favorite icon and count
let navbarFavIcon = document.querySelector('.fav-icon');
let navbarFavCount = document.querySelector('.fav-counter');

// Update favorite count display in the navbar
function updateNavbarFavCount() {
    let favoritedCount = Array.from(document.querySelectorAll('.heart-icon')).filter(icon => icon.classList.contains('favorited')).length;
    navbarFavCount.textContent = favoritedCount;
}

// Function to add or remove from favorites
function addToFavorites(element) {
    let heartIcon = element.querySelector('.fa-heart'); // Adjust if necessary
    // let heartIcon = element.querySelector('.blog-heart'); // Adjust if necessary

    // Toggle favorite state
    heartIcon.classList.toggle('favorited');
    heartIcon.classList.add('pop-effect');
    setTimeout(() => {
        heartIcon.classList.remove('pop-effect');
    }, 500);

    // Update favorite counts
    updateProductCount(); // Updates the count in the dialog box
    updateNavbarFavCount(); // Updates the count in the navbar
    updateDialogContent(); // Updates the dialog content
}

// Initialize favorite state and count for all product cards
function initializeProductCards() {
    let wishedProducts = document.querySelectorAll('.heart-icon');
    wishedProducts.forEach(heart => {
        heart.addEventListener('click', function () {
            addToFavorites(heart.closest('.wishlist'));
        });

        if (heart.classList.contains('favorited')) {
            updateProductCount();
            updateNavbarFavCount();
        }
    });
}

// Call initializeProductCards on page load
initializeProductCards();

// Ensure favorite counts are correct on page load
updateNavbarFavCount();

// Dialog box functionality
let mainHeartIcon = document.getElementById('main-heart-icon');
const dialogBox = document.getElementById('dialog-box');
const closeDialog = document.getElementById('close-dialog');
const okayBtn = document.getElementById('okay-btn');

mainHeartIcon.addEventListener('click', () => {
    dialogBox.style.display = 'block';
    dialogBox.classList.add('animate');
    updateDialogContent();
});

closeDialog.addEventListener('click', () => {
    dialogBox.style.display = 'none';
});

okayBtn.addEventListener('click', () => {
    dialogBox.style.display = 'none';
});

let dialogContent = document.createElement('div');
dialogContent.classList.add('dialog-content');
dialogBox.appendChild(dialogContent);

function updateProductCount() {
    let favoritedCount = Array.from(document.querySelectorAll('.heart-icon')).filter(heart => heart.classList.contains('favorited')).length;
    document.querySelector('.count-down').textContent = favoritedCount;
}

function updateDialogContent() {
    dialogContent.innerHTML = ''; // Clear existing content

    let wishedProducts = document.querySelectorAll('.heart-icon');
    wishedProducts.forEach(heart => {
        if (heart.classList.contains('favorited')) {
            let productCard = heart.closest('.card-item');
            let productTitle = productCard.querySelector('.product-name').textContent.trim();
            let productImgElement = productCard.querySelector(`.parent`);
            // let productImgLink = productImgElement.getAttribute('data-url');
            let productImgLink = productImgElement.dataset.url;

            if (productImgElement) {
                // let productImg = productImgElement.src;
                let productUrl = productCard.querySelector('a').href;

                let imgElement = document.createElement('img');
                imgElement.src = productImgLink;

                let pElement = document.createElement('p');
                pElement.textContent = productTitle;

                let divElement = document.createElement('div');
                divElement.className = 'dialog-flex';
                divElement.appendChild(imgElement);
                divElement.appendChild(pElement);

                divElement.addEventListener('click', () => {
                    window.location.href = productUrl;
                });

                dialogContent.appendChild(divElement);
            }
        }
    });
};

// Example of how to handle the navbar favorite icon click (if needed)
navbarFavIcon.addEventListener('click', () => {
    // Custom behavior for clicking the navbar favorite icon
});
