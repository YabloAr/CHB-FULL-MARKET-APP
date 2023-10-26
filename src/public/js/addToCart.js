
const addButton = document.querySelectorAll("#addToCart");

addButton.forEach(button => {
    button.addEventListener("click", () => {
        const pid = button.dataset.pid;
        const cid = button.dataset.cid;
        const uid = button.dataset.uid
        fetch(`http://localhost:8080/api/carts/${cid}/products/${pid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response, e.g., display a success message
                console.log(data)
                if (data.payload.status === 200) {
                    Toastify({
                        text: "Product added to cart.",
                        duration: 3000,
                        destination: `http://localhost:8080/carts/${cid}`,
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
                } else {
                    alert('Something went wrong with the fetch, oh the stench of failure...' + JSON.stringify(data.payload.message))
                }
            })
            .catch((error) => {
                // Handle any errors
                console.error("Fetch catch, Error al agregar al carrito:", error);
            });
    });
});
