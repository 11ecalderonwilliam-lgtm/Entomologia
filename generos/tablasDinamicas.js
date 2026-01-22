// 1️⃣ Leer query param
const params = new URLSearchParams(window.location.search);
const genero = params.get("genero")?.toLowerCase();

// 2️⃣ Cargar JSON
fetch("../generos/generos.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("No se pudo cargar el JSON");
        }
        return response.json();
    })
    .then(data => {
        if (!genero || !data[genero]) {
            document.querySelector(".contenedor").innerHTML =
                "<h2>Género no encontrado</h2>";
            return;
        }

        const info = data[genero];

        // Título
        document.getElementById("page-title").textContent = genero;
        document.querySelector("#titulo-genero").textContent = genero;

        // Taxonomía
        document.getElementById("subfamilia").textContent = info.subfamilia;
        document.getElementById("tribu").textContent = info.tribu;

        // Tabla
        const tbody = document.getElementById("tabla-especies-body");
        tbody.innerHTML = "";

        info.especies.forEach((esp, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${index + 1}</td>
                <td><em>${esp.especie}</em></td>
                <td>${esp.autor}</td>
                <td>
                  <a href="${esp.imageLink}" target="_blank">Imagen</a>
                </td>
            `;
            tbody.appendChild(row);
        });
    })
    .catch(error => {
        document.querySelector(".contenedor").innerHTML =
            "<p>Error cargando los datos.</p>";
        console.error(error);
    });
