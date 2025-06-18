graph TD
    subgraph Iteración del Usuario
        A[1. Tú, el Usuario] -->|Utiliza el sistema / Proporciona datos| B
        B(2. Nuestro Sistema Predictivo - IA) -->|Genera predicción / Muestra resultados| A
        A -->|Su acción / Opinión genera| C[3. Tu Experiencia / Retroalimentación]
    end

    C -->|Alimenta datos de mejora| D{4. La IA Aprende y Mejora}
    D -->|Refina la IA para futuras interacciones| B
    D --> E[5. ¡Predicciones Siempre Más Precisas!]

    style A fill:#e0ffe0,stroke:#333,stroke-width:2px
    style B fill:#ffe0e0,stroke:#333,stroke-width:2px
    style C fill:#fffacd,stroke:#333,stroke-width:2px
    style D fill:#e6e6fa,stroke:#333,stroke-width:2px
    style E fill:#ccffcc,stroke:#333,stroke-width:2px,font-weight:bold

    linkStyle 0 stroke-width:2px,stroke:gray;
    linkStyle 1 stroke-width:2px,stroke:gray;
    linkStyle 2 stroke-width:2px,stroke:blue;
    linkStyle 3 stroke-width:2px,stroke:green;
    linkStyle 4 stroke-width:2px,stroke:purple;
    linkStyle 5 stroke-width:2px,stroke:darkgreen;
