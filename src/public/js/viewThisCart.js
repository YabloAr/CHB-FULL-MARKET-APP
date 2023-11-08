const viewThisCartButton = document.querySelectorAll('#viewThisCart')

viewThisCartButton.forEach(button => {
    button.addEventListener('click', () => {
        // Get the product's ID from a data attribute on the button
        const cartId = button.dataset.cid;

        // Make a fetch request to add the product to the cart using the productId
        fetch(`/api/carts/${cartId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response, e.g., display a success message
                if (data) {
                    Swal.fire({
                        title: 'Here you go chusma.',
                        text: JSON.stringify(data.payload.products),
                        icon: 'info',
                        confirmButtonText: 'Ok'
                    })
                } else {
                    alert('Something went wrong with the fetch, oh the stench of failure...' + JSON.stringify(data))
                }
            })
            .catch(error => {
                // Handle any errors
                console.error('No fetch here partner! Error viewing cart:', error);
            });
    });
});




