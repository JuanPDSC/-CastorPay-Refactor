# -CastorPay-Refactor
Proyecto Semestral Arquitectura De Software 

## Descripción del Proyecto
CastorPay cuenta originalmente con un módulo monolítico de procesamiento de pagos donde la clase `ProcesoDePago` superaba las 4,000 líneas de código (antipatrón "El Dios"). Este repositorio documenta el diagnóstico y la propuesta arquitectónica orientada a principios de código limpio y microservicios/componentes desacoplados.

## Punto 1: Diagnóstico y Análisis

### 1. Impacto del antipatrón "El Dios" y la falta de código limpio en DORA y FLOW
* **Tiempo para restaurar el servicio por fallos (DORA):** La alta concentración de responsabilidades (validación, BD, correos y facturación) en una sola clase genera un alto acoplamiento. Aislar un error es complejo y cualquier parche rápido afecta otras áreas, elevando el tiempo medio de restauración (MTTR) a las 8 horas.
* **Tiempo por ciclo (FLOW):** Al ser un monolito masivo, múltiples desarrolladores modifican las mismas líneas simultáneamente, provocando conflictos de fusión (*merge conflicts*) masivos en el control de versiones y triplicando el tiempo por ciclo.

### 2. Afectaciones en la satisfacción, interrupciones y revisión de código (Métricas SPACE)
* **Satisfacción del desarrollador:** Desciende drásticamente por la frustración de trabajar con código legado indescifrable (*código espagueti*).
* **Interrupciones:** Aumentan debido a constantes llamadas de emergencia (*hotfixes*) para solucionar fallos en producción.
* **Revisión de código:** Se vuelve extremadamente lenta y dolorosa debido a *Pull Requests* gigantescos y difíciles de auditar.

## Punto 2: Propuesta Arquitectónica

### 1. Patrón de arquitectura seleccionado
Se propone una **Arquitectura Limpia y Desacoplada basada en Servicios**, aplicando estrictamente el **Principio de Responsabilidad Única (SRP)**:
* *Servicio de Validación:* A cargo exclusivamente de verificar datos y reglas de negocio.
* *Servicio de Transacción / BD:* Gestiona la persistencia y pasarela de pagos.
* *Servicio de Notificaciones:* Envía correos de confirmación de forma independiente.
* *Servicio de Facturación:* Modulo aislado para generar comprobantes fiscales.

### 2. Mejora mediante Código Limpio
* **Funciones pequeñas:** Facilitan la lectura inmediata y reducen la introducción de bugs.
* **Nombres descriptivos:** Aceleran la incorporación de nuevos desarrolladores y las revisiones.
* **Bajo acoplamiento:** Permite modificar o escalar un servicio individual sin romper el resto del sistema.

## Punto 3: Monitoreo de Indicadores

| Marco | Indicador Seleccionado | Estado Actual (Crisis) | Proyección Post-Refactorización |
| :--- | :--- | :--- | :--- |
| **DORA** | **Tiempo medio de restauración (MTTR)** | ~8 horas por fallo en producción. | **< 30 minutos**, gracias al aislamiento de fallos por componentes. |
| **FLOW** | **Tiempo por ciclo (Cycle Time)** | Triplicado por conflictos en Git. | **Reducción significativa**, permitiendo desarrollo paralelo sin bloqueos. |
| **SPACE** | **Satisfacción y Bienestar** | Crítica / Baja por estrés continuo. | **Alta**, al trabajar con código mantenible y flujos predecibles. |

## Estructura del Repositorio
* `index.html`: Interfaz web de simulación del módulo de pagos.
* `styles.css`: Estilos limpios y organizados.
* `app.js`: Lógica estructurada bajo el principio de separación de responsabilidades.
