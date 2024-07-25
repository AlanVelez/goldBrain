import React from "react";
import Sidebar from "../components/Layout/Sidebar";

const Help = () => {
  return (
    <div className="flex flex-row min-h-screen w-full">
      <Sidebar />
      <div className="w-4/5 flex-1 container mx-auto px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">
          Modulo de apoyo - Goldbrain
        </h1>
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Índice</h2>
          <ol className="list-decimal list-inside ml-4">
            <li>
              <a
                href="#introduccion"
                className="text-yellow-500 hover:underline"
              >
                Introducción
              </a>
            </li>
            <li>
              <a href="#registro" className="text-yellow-500 hover:underline">
                Registro e Inicio de Sesión
              </a>
            </li>
            <li>
              <a href="#explorar" className="text-yellow-500 hover:underline">
                Explorar y Buscar Cursos
              </a>
            </li>
            <li>
              <a
                href="#visualizacion"
                className="text-yellow-500 hover:underline"
              >
                Visualización de Cursos y Videos
              </a>
            </li>
            <li>
              <a href="#comunidad" className="text-yellow-500 hover:underline">
                Interacción con la Comunidad
              </a>
            </li>
            <li>
              <a href="#perfil" className="text-yellow-500 hover:underline">
                Gestión de Perfil
              </a>
            </li>
            <li>
              <a href="#asesorias" className="text-yellow-500 hover:underline">
                Solicitar Asesorías
              </a>
            </li>
            <li>
              <a href="#soporte" className="text-yellow-500 hover:underline">
                Soporte Técnico
              </a>
            </li>
          </ol>
        </div>
        <div className="mb-8" id="introduccion">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">
            1. Introducción
          </h2>
          <p>
            GoldBrain es una plataforma educativa en línea diseñada para
            facilitar el acceso a contenido de calidad en diversas áreas del
            conocimiento. En GoldBrain, creemos que la educación debe ser
            accesible para todos, sin importar las barreras geográficas,
            económicas o sociales. Nuestra misión es proporcionar una plataforma
            que empodere a los estudiantes a tomar control de su aprendizaje, a
            desarrollar nuevas habilidades y a alcanzar sus metas académicas y
            profesionales. A través de esta guía, aprenderás a navegar por la
            plataforma, inscribirte en cursos, interactuar con la comunidad y
            gestionar tu perfil.
          </p>
        </div>
        <div className="mb-8" id="registro">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">
            2. Registro e Inicio de Sesión
          </h2>
          <h3 className="text-xl font-bold text-gray-700 mb-2">Registro</h3>
          <p>
            Para registrarte en GoldBrain, sigue estos pasos:
            <ol className="list-decimal list-inside ml-4">
              <li>
                Visita la Página de Registro: Navega a la página de registro
                desde la página principal. Aquí encontrarás un formulario que te
                pedirá información básica para crear tu cuenta.
              </li>
              <li>
                Completa el Formulario de Registro: Ingresa tu correo
                electrónico, nombre, apellido, nombre de usuario, contraseña y
                cualquier otra información requerida. Asegúrate de que tu
                contraseña sea segura y fácil de recordar.
              </li>
              <li>
                Accede a tu Cuenta: Una vez que hayas verificado tu correo,
                podrás iniciar sesión con tu nombre de usuario y contraseña.
                Felicitaciones, ya eres miembro de GoldBrain.
              </li>
            </ol>
          </p>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Inicio de Sesión
          </h3>
          <p>
            Para iniciar sesión en tu cuenta de GoldBrain:
            <ol className="list-decimal list-inside ml-4">
              <li>
                Visita la Página de Inicio de Sesión: Navega a la página de
                inicio de sesión desde la página principal. Este es el primer
                paso para acceder a tus cursos y a la comunidad de GoldBrain.
              </li>
              <li>
                Ingresa tus Credenciales: Introduce tu nombre de usuario y
                contraseña. Si olvidaste tu contraseña, puedes hacer clic en
                "Olvidé mi contraseña" para recuperarla.
              </li>
              <li>
                Haz Clic en Iniciar Sesión: Una vez que hayas ingresado tus
                credenciales, serás redirigido a tu panel de usuario donde
                podrás ver tus cursos y acceder a todas las funcionalidades de
                la plataforma.
              </li>
            </ol>
          </p>
        </div>
        <div className="mb-8" id="explorar">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">
            3. Explorar y Buscar Cursos
          </h2>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Navegar por la Página Principal
          </h3>
          <p>
            En la página principal de GoldBrain, encontrarás una lista de cursos
            destacados y populares. Esta sección está diseñada para ayudarte a
            descubrir nuevos cursos que podrían interesarte. Puedes desplazarte
            hacia abajo para ver más opciones y explorar diferentes categorías.
          </p>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Utilizar la Barra de Búsqueda
          </h3>
          <p>
            La barra de búsqueda te permite encontrar cursos específicos
            rápidamente:
            <ol className="list-decimal list-inside ml-4">
              <li>
                Introduce Palabras Clave: Escribe palabras clave relacionadas
                con el curso que estás buscando en la barra de búsqueda ubicada
                en la parte superior de la página. Puedes buscar por nombre de
                curso, temas específicos o palabras clave relacionadas.
              </li>
              <li>
                Filtra los Resultados: Utiliza los filtros disponibles para
                refinar tu búsqueda por categoría, calificación, fecha de
                actualización y más. Esto te ayudará a encontrar cursos que se
                ajusten exactamente a tus necesidades.
              </li>
              <li>
                Selecciona un Curso: Haz clic en el curso que te interese para
                ver más detalles. Serás redirigido a la página de detalles del
                curso donde encontrarás información más específica sobre el
                contenido del curso, el instructor y las evaluaciones de otros
                estudiantes.
              </li>
            </ol>
          </p>
        </div>
        <div className="mb-8" id="visualizacion">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">
            4. Visualización de Cursos y Videos
          </h2>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Acceder a los Detalles del Curso
          </h3>
          <p>
            Una vez que hayas encontrado un curso de interés:
            <ol className="list-decimal list-inside ml-4">
              <li>
                Haz Clic en el Curso: Accede a la página de detalles del curso
                haciendo clic en el nombre del curso. Aquí, podrás obtener una
                visión general del contenido del curso, incluyendo la
                descripción del curso, los objetivos de aprendizaje y los
                requisitos previos.
              </li>
              <li>
                Revisa la Información del Curso: En la página de detalles del
                curso, encontrarás la descripción del curso, requisitos,
                calificación, última actualización y lista de videos
                disponibles. Esta información te ayudará a decidir si el curso
                es adecuado para ti.
              </li>
            </ol>
          </p>
          <h3 className="text-2xl font-bold text-yellow-500 mb-4">
            Reproducir Videos del Curso
          </h3>
          <p>
            Para comenzar a aprender:
            <ol className="list-decimal list-inside ml-4">
              <li>
                Selecciona un Video: Haz clic en el video que deseas reproducir
                desde la lista de reproducción del curso. Cada curso puede
                contener varios videos organizados en módulos o lecciones.
              </li>
              <li>
                Usa el Reproductor de Video: Utiliza los controles del
                reproductor para reproducir, pausar y ajustar el volumen del
                video. También puedes cambiar la calidad del video y activar los
                subtítulos si están disponibles.
              </li>
              <li>
                Explora la Lista de Reproducción: Navega por los videos
                relacionados en la lista de reproducción lateral. Esto te
                permite moverte fácilmente entre las diferentes lecciones del
                curso sin perder el ritmo.
              </li>
            </ol>
          </p>
        </div>
        <div className="mb-8" id="comunidad">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">
            5. Interacción con la Comunidad
          </h2>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Dejar Comentarios y Likes
          </h3>
          <p>
            Interactúa con otros estudiantes y el instructor del curso:
            <ol className="list-decimal list-inside ml-4">
              <li>
                Comenta en un Video: Desplázate hasta la sección de comentarios
                debajo del video y escribe tu comentario. Puedes hacer
                preguntas, compartir tus pensamientos o proporcionar
                retroalimentación sobre el contenido del curso.
              </li>
              <li>
                Dale Like a un Video: Haz clic en el botón de like para expresar
                tu apoyo o aprecio por el contenido. Esto también ayuda a otros
                estudiantes a identificar los videos más útiles y populares.
              </li>
            </ol>
          </p>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Solicitar Asesorías
          </h3>
          <p>
            Si necesitas ayuda adicional:
            <ol className="list-decimal list-inside ml-4">
              <li>
                Haz Clic en el Botón de Asesoría: En la página del curso o del
                video, haz clic en el botón para solicitar una asesoría. Este
                botón generalmente se encuentra en la parte inferior de la
                página.
              </li>
              <li>
                Completa la Solicitud: Proporciona detalles sobre la asesoría
                que necesitas y envía la solicitud. Puedes especificar las áreas
                donde necesitas más ayuda o hacer preguntas específicas.
              </li>
              <li>
                Espera la Respuesta del Instructor: El instructor se pondrá en
                contacto contigo para coordinar la asesoría. Asegúrate de
                revisar tu correo electrónico y las notificaciones dentro de la
                plataforma para no perderte ninguna actualización.
              </li>
            </ol>
          </p>
        </div>
        <div className="mb-8" id="perfil">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">
            6. Gestión de Perfil
          </h2>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            Editar Información del Perfil
          </h3>
          <p>
            Mantén tu perfil actualizado para una mejor experiencia:
            <ol className="list-decimal list-inside ml-4">
              <li>
                Accede a tu Perfil: Haz clic en tu nombre de usuario o foto de
                perfil en la esquina superior derecha y selecciona "Perfil".
                Aquí puedes ver y editar toda tu información personal.
              </li>
              <li>
                Edita tu Información: Actualiza tu nombre, apellido, nombre de
                usuario, teléfono, biografía y foto de perfil. Mantener tu
                perfil actualizado te ayuda a conectarte mejor con otros
                estudiantes e instructores.
              </li>
              <li>
                Guarda los Cambios: Haz clic en "Guardar" para aplicar las
                actualizaciones. Tus cambios se reflejarán inmediatamente en tu
                perfil.
              </li>
            </ol>
          </p>
        </div>
        <div className="mb-8" id="asesorias">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">
            7. Solicitar Asesorías
          </h2>
          <p>
            Si necesitas ayuda personalizada, puedes solicitar una asesoría:
            <ol className="list-decimal list-inside ml-4">
              <li>
                Accede a la Página del Curso o Video: Desde la lista de
                reproducción o la página de detalles del curso. Aquí encontrarás
                la opción de solicitar asesorías si estás inscrito en el curso.
              </li>
              <li>
                Haz Clic en el Botón de Solicitud de Asesoría: Ubicado en la
                parte inferior de la página. Este botón te permitirá iniciar el
                proceso de solicitud de asesoría.
              </li>
              <li>
                Completa el Formulario de Solicitud: Proporciona detalles sobre
                la asesoría que necesitas. Cuanta más información proporciones,
                mejor podrá ayudarte el instructor.
              </li>
              <li>
                Envía la Solicitud: Espera la confirmación del instructor para
                coordinar la asesoría. Revisa tu correo y las notificaciones en
                la plataforma para obtener actualizaciones sobre tu solicitud.
              </li>
            </ol>
          </p>
        </div>
        <div className="mb-8" id="soporte">
          <h2 className="text-2xl font-bold text-yellow-500 mb-4">
            8. Soporte Técnico
          </h2>
          <p>
            Si tienes algún problema técnico, por favor contacta con nuestro
            equipo de soporte a través de la sección de soporte en la
            plataforma. Estamos aquí para ayudarte con cualquier problema que
            puedas encontrar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;
