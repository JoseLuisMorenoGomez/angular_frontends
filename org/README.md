# Organigrama con Angular y D3

Este proyecto implementa un organigrama interactivo utilizando Angular y la biblioteca D3 para visualización de datos.

## Descripción

El organigrama se construye a partir de datos jerárquicos almacenados en un servicio GraphQL. Utiliza la biblioteca D3 para representar los nodos de manera visual y Angular para la gestión de componentes y servicios.

## Funcionalidades

- **Visualización Jerárquica:** Muestra una representación jerárquica de la estructura organizativa.
- **Interactividad:** Permite hacer clic en los nodos para ver información detallada y abrir una ventana modal con detalles adicionales.

## Estructura del Proyecto

- **`src/app/org-chart`:** Contiene los archivos relacionados con el organigrama.
  - **`org-chart.component.ts`:** Componente principal del organigrama.
  - **`org-chart.service.ts`:** Servicio para obtener datos del organigrama.
  - **`org-chart-data.service.ts`:** Servicio para obtener datos de GraphQL.
  - **`org-selected-node.service.ts`:** Servicio para gestionar el nodo seleccionado.
  - **`node-popup`:** Componentes relacionados con la ventana modal.

## Instalación

1. Clona este repositorio: `git clone https://github.com/JoseLuisMorenoGomez/angular_frontends.git`
2. Instala las dependencias: `npm install`
3. Inicia la aplicación: `ng serve`

## Configuración de GraphQL

Asegúrate de configurar correctamente la conexión GraphQL en `org-chart-data.service.ts` para que la aplicación pueda obtener los datos necesarios.

## Contribuciones

Las contribuciones son bienvenidas. Si encuentras un error o tienes alguna mejora, ¡abre un problema o envía una solicitud de extracción!

## Licencia

Este proyecto está bajo la [Licencia MIT](LICENSE).
