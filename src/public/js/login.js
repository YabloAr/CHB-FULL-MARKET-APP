const form = document.getElementById('loginForm')

form.addEventListener('submit', e => {
    e.preventDefault()
    const data = {
        email: form.email.value,
        password: form.password.value
    }
    fetch('api/sessions/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(result => result.json())
        .then(result => {
            if (result.status === 200) {
                Swal.fire({
                    title: `Welcome`,
                    text: result.message,
                    icon: 'success',
                    confirmButtonText: 'Lets go!'
                }).then((button) => {
                    if (button.isConfirmed) {
                        window.location.replace('/')
                    }
                });
            }
            if (result.status === 400) { alert('You are not registered.') }
        })
}
)
