```mermaid
flowchart TD
    %% Estilos personalizados
    classDef block fill:#ffffff,stroke:#94a3b8,stroke-width:2px,color:#0f172a,font-size:14px;
    classDef highlight fill:#d1fae5,stroke:#10b981,stroke-width:2px,color:#065f46,font-weight:bold;

    %% Bloques
    A[📥 **Entrada de Datos**<br><small>Sensores, Archivos, Sistemas</small>] --> B[🧠 **Procesamiento con IA**<br><small>Modelos Predictivos</small>]
    B --> C[📊 **Resultados Generados**<br><small>Simulaciones, Recomendaciones</small>]
    C --> D[🧑‍💻 **Interacción del Usuario**<br><small>Validaciones, Ajustes, Feedback</small>]
    D --> E[🔁 **Retroalimentación**<br><small>Recolectada automáticamente</small>]
    E --> F[📈 **Mejora del Modelo**<br><small>Entrenamiento Continuo</small>]
    F --> B

    %% Bucle informativo
    E -.->|🧪 Aprendizaje continuo| B

    %% Aplicación de estilos
    class A,B,C,D,E block;
    class F highlight;
