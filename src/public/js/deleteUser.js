const deleteUserButtons = document.querySelectorAll('#deleteUser')

deleteUserButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Get the product's ID from a data attribute on the button
        const userId = button.dataset.user;

        // Make a fetch request to add the product to the cart using the productId
        fetch(`/api/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    Swal.fire({
                        title: `User ${userId} deleted`,
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    }).then((button) => {
                        if (button.isConfirmed) {
                            window.location.reload()
                        }
                    })
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




