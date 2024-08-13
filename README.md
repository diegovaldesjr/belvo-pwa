# Belvo PWA

Este proyecto es una aplicación web progresiva (PWA) desarrollada con **Next.js** que se conecta a la API de **Belvo** para obtener información de cuentas bancarias y movimientos, calcular un KPI básico, y mostrar estos datos en una interfaz amigable.


## Requisitos

- Node.js (v14 o superior)
- npm o yarn
- Cuenta en el [sandbox de Belvo](https://developers.belvo.com/docs/sandbox-environment)

## Instalación

### 1. Clona el Repositorio

```bash
git clone https://github.com/diegovaldesjr/https://github.com/diegovaldesjr/belvo-pwa.git
cd belvo-pwa
```

### 2. Configuración

### Configuración del Entorno

Crea un archivo `.env` en la raíz del proyecto, aquí un ejemplo:

```
AUTH_SECRET=your_auth_secret
NEXT_PUBLIC_SITE_URL=your_next_public_site_url
BELVO_BASE_URL=your_belvo_base_url
BELVO_SECRET_ID=your_secret_id
BELVO_SECRET_PASSWORD=your_secret_password
```

### 3. Uso

### Instalar dependencias y Ejecutar

Instala las dependencias:

```bash
npm install
# o
yarn install
```

Inicia el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
```

Esto levantará la **APP** en `http://localhost:3000`