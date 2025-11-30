Actividad 4 – Utilizando sistemas de control de versiones# ASISTEM

Aplicación de Asistente para gerencia y asesores de ventas, ayuda Alos asesores a ordenar sus clientes de manera que sepan quien ya llamaron y quienes están interesados, las citas que tiene agendadas sea para recoger documentos u otra clase de visita documental

Casos de Uso
Inicio y Cierre de Sesión
Actor
Usuario registrado

Descripción
El usuario ingresa su correo y contraseña.
Si las credenciales coinciden con las almacenadas en localStorage, se inicia una sesión y se redirige al dashboard.
El cierre de sesión limpia los datos almacenados de sesión y devuelve al usuario a la página de login.

Precondición
El usuario debe estar registrado en el sistema.

Postcondición
Se genera o elimina una sesión activa.

Flujo Principal
El usuario accede a login.html.
Ingresa email y contraseña.
Se validan los datos usando localStorage.
Si son válidos → redirección a dashboard.html.
Al cerrar sesión se eliminan los datos de la sesión activa.

Criterios de Aceptación
No avanzar al dashboard si los datos son incorrectos.
Mantener la sesión mientras el usuario no la cierre.
Mostrar mensaje de error si las credenciales son inválidas.

 Creación de Tarjetas de Tareas
Actor
Usuario autenticado

Descripción
El usuario puede crear una tarjeta ingresando título, descripción, fecha límite y estado (por hacer, en progreso o completada).
Los datos se almacenan en localStorage y se muestran visualmente en el dashboard.

Precondición
El usuario debe haber iniciado sesión.

Postcondición
Se crea una tarjeta visible en la interfaz.

Flujo Principal
El usuario hace clic en “Nueva tarea”.
Se abre un formulario de creación.
Ingresa los datos requeridos.
La tarjeta se guarda y se muestra en el dashboard.
Criterios de Aceptación
Ningún campo obligatorio debe quedar vacío.
La tarjeta debe aparecer inmediatamente luego de crearse.
Los datos deben persistir en localStorage.
CU03 – Edición de Tareas
Actor
Usuario autenticado

Descripción
El usuario puede modificar una tarjeta existente: título, descripción, fecha o estado.
Los cambios se guardan en localStorage y se actualizan visualmente en la interfaz.

Precondición
La tarea debe existir previamente.

Postcondición
La tarjeta se actualiza y se refleja en la interfaz.

Flujo Principal
El usuario selecciona una tarjeta existente.
Hace clic en “Editar”.
Modifica los datos.
Guarda los cambios y se actualiza la tarjeta.
Criterios de Aceptación
Los cambios deben guardarse correctamente.
La vista debe actualizarse automáticamente.
No se permite guardar una tarjeta sin título.
CU04 – Eliminación de Tareas
Actor
Usuario autenticado

Descripción
Permite eliminar una tarjeta de tarea de forma permanente.
La lista de tareas debe actualizarse y los datos deben eliminarse de localStorage.

Precondición
La tarjeta debe existir.

Postcondición
La tarjeta se elimina del sistema y desaparece de la interfaz.

Flujo Principal
Usuario selecciona una tarjeta.
Presiona “Eliminar”.
Se solicita confirmación.
La tarea se elimina definitivamente.
Criterios de Aceptación
La eliminación debe ser irreversible.
Debe pedirse confirmación antes de borrar.
No deben quedar datos residuales en localStorage.
CU05 – Interfaz Responsiva y Amigable
Actor
Usuario (web o móvil)

Descripción
El sistema debe adaptarse a distintos tamaños de pantalla (PC, tablet o móvil) utilizando CSS (Flexbox, Grid y media queries).
La experiencia debe ser intuitiva, ordenada y fácil de usar.

Precondición
El usuario debe acceder desde un navegador.

Postcondición
La interfaz se adapta correctamente al dispositivo utilizado.

Criterios de Aceptación
Menú adaptable para pantallas pequeñas.
Formularios y botones accesibles en dispositivos móviles.
Tarjetas organizadas automáticamente según el ancho disponible.
Tipografía legible en todos los dispositivos
