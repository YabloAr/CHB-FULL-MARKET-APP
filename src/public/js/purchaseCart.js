const purchaseButton = document.getElementById('purchaseCart')

purchaseButton.addEventListener('click', () => {
    const cid = purchaseButton.dataset.purchasecartid;


    fetch(`http://localhost:8080/api/tickets/${cid}/purchase`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response, e.g., display a success message
            console.log('Ticket created');
            console.log('Response is:', data);
            // if (data.status === 200) {
            //     Toastify({
            //         text: "User deleted.",
            //         duration: 3000,
            //         newWindow: false,
            //         close: true,
            //         gravity: "bottom", // `top` or `bottom`
            //         position: "right", // `left`, `center` or `right`
            //         stopOnFocus: true, // Prevents dismissing of toast on hover
            //         style: {
            //             background: "linear-gradient(to right, #00b09b, #96c93d)",
            //         },
            //         onClick: function () { } // Callback after click
            //     }).showToast();
            // window.location.reload()
            //         } else {
            //             alert('Something went wrong with the fetch, oh the stench of failure...' + JSON.stringify(data))
            // }
        })
        .catch(error => {
            // Handle any errors
            console.error('Fetch catch, Error creating the ticket', error);
        });
});





