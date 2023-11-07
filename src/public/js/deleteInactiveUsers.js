const deleteInactiveButton = document.getElementById('deleteInactiveUsers')

deleteInactiveButton.addEventListener('click', (e) => {
    e.preventDefault()
    fetch(`/api/users/inactive`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            Swal.fire({
                title: JSON.stringify(data),
                icon: 'success',
                confirmButtonText: 'Ok'
            }).then((button) => {
                if (button.isConfirmed) {
                    window.location.reload()
                }
            })
        })
        .catch(error => {
            console.error('Something went wrong with the fetch, oh the stench of failure...:', error);
        });
});