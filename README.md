flowchart TD
    %% Estilo del diagrama para mayor claridad
    classDef block fill:#ffffff,stroke:#4b5563,stroke-width:2px,color:#111,font-size:14px;
    classDef highlight fill:#d1fae5,stroke:#10b981,stroke-width:2px,color:#065f46,font-weight:bold;

    %% Bloques principales
    A[📥 Entrada de Datos<br><small>Sensores, Archivos, Sistemas</small>] --> B[🧠 Procesamiento con IA<br><small>Modelos Predictivos</small>]
    B --> C[📊 Resultados y Recomendaciones<br><small>Simulaciones, Visualizaciones</small>]
    C --> D[🙋‍♂️ Interacción del Usuario<br><small>Validaciones, Ajustes, Correcciones</small>]
    D --> E[🔁 Retroalimentación Automática<br><small>Recolectada en cada iteración</small>]
    E --> F[📈 Mejora del Modelo<br><small>Entrenamiento continuo</small>]
    F --> B

    %% Etiqueta para bucle
    E -.->|Aprendizaje continuo| B

    %% Clases para estilo visual
    class A,B,C,D,E,F block;
    class F highlight;
