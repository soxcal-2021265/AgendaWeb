// Maneja el login
function login() {
    const correo = document.getElementById('username').value.trim();
    const contra = document.getElementById('password').value.trim();

    // Caso 1: Escribió algo en el correo
    if (correo !== "") {
        // Validamos que también haya escrito la contraseña
        if (contra !== "") {
            localStorage.setItem('usuarioLogueado', correo);
            localStorage.setItem('passwordLogueado', contra);
            window.location.href = "Contactos.html";
        } else {
            // Si el correo tiene texto pero la contra no, lanzamos alerta y NO pasamos
            alert("Si ingresas un correo, debes ingresar también la contraseña.");
        }
    } 
    // Caso 2: No escribió absolutamente nada (campos vacíos)
    else {
        localStorage.removeItem('usuarioLogueado');
        localStorage.removeItem('passwordLogueado');
        // Como no escribió nada, lo dejas pasar al perfil vacío
        window.location.href = "Contactos.html";
    }
}

// Esta parte se encarga de mostrar o no el nombre al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    const spanNombre = document.getElementById('nombre-usuario');
    const spanPass = document.getElementById('pass-usuario');

    const usuario = localStorage.getItem('usuarioLogueado');
    const password = localStorage.getItem('passwordLogueado');

    // Si existe el elemento del nombre
    if (spanNombre) {
        // Si hay algo guardado lo ponemos, sino (por si acaso) ponemos Invitado
        spanNombre.textContent = usuario ? usuario : "Invitado";
    }

    // Si existe el elemento de la contraseña
    if (spanPass) {
        // Si hay contraseña la ponemos, sino ponemos un texto vacío o guiones
        spanPass.textContent = password ? password : "";
    }
});

// Función para cerrar sesión
function logout() {
    localStorage.removeItem('usuarioLogueado');
    window.location.href = "Login.html";
}