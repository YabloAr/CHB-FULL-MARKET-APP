
const addButton = document.querySelectorAll("#addToCart");

addButton.forEach(button => {
    button.addEventListener("click", () => {
        const pid = button.dataset.pid;
        const cid = button.dataset.cid;
        fetch(`/api/carts/${cid}/products/${pid}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.payload.status === 200) {
                    Toastify({
                        text: "Product added to cart.",
                        duration: 3000,
                        destination: `/carts/${cid}`,
                        newWindow: false,
                        close: true,
                        gravity: "bottom",
                        position: "right",
                        stopOnFocus: true,
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                        },
                        onClick: function () { }
                    }).showToast();
                } else {
                    alert('Something went wrong with the fetch, oh the stench of failure...' + JSON.stringify(data.payload.message))
                }
            })
            .catch((error) => {
                console.error("Fetch catch, Error al agregar al carrito:", error);
            });
    });
});
