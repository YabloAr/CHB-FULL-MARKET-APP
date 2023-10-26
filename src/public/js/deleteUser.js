const deleteUserButtons = document.querySelectorAll('#deleteUser')

deleteUserButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the product's ID from a data attribute on the button
        const userId = button.dataset.user;

        // Make a fetch request to add the product to the cart using the productId
        fetch(`http://localhost:8080/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                // Handle the response, e.g., display a success message
                console.log('Usuario borrado');
                console.log('Response is:', data);
                if (data.status === 200) {
                    Toastify({
                        text: "User deleted.",
                        duration: 3000,
                        newWindow: false,
                        close: true,
                        gravity: "bottom", // `top` or `bottom`
                        position: "right", // `left`, `center` or `right`
                        stopOnFocus: true, // Prevents dismissing of toast on hover
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                        },
                        onClick: function () { } // Callback after click
                    }).showToast();
                    window.location.reload()
                } else {
                    alert('Something went wrong with the fetch, oh the stench of failure...' + JSON.stringify(data))
                }
            })
            .catch(error => {
                // Handle any errors
                console.error('Error adding product to cart:', error);
            });
    });
});




