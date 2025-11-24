# TypeLab

TypeLab is a professional font testing playground designed for typography enthusiasts and developers. It provides a real-time environment to test and visualize fonts with various properties and settings.

## Features

- **Format Support**: Seamlessly upload and test TTF, WOFF, WOFF2, and OTF font files.
- **Real-time Preview**: Instantly visualize changes as you adjust font settings.
- **Advanced Typography Controls**:
  - Font Size, Weight, and Line Height
  - Letter and Word Spacing
  - Text Transform (Uppercase, Lowercase, Capitalize)
  - Text Direction (LTR / RTL)
  - Text Alignment (Left, Center, Right, Justify)
- **Dark Mode**: Fully optimized interface for both light and dark themes.
- **Responsive Design**: Works smoothly on desktop and mobile devices.

## Tech Stack

- **Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Containerization**: [Docker](https://www.docker.com/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ahmedtijanicom/typelab.git
   cd typelab
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal).

## Docker Support

This project includes Docker configuration for easy deployment and consistent development environments.

To run with Docker Compose:

```bash
docker-compose up --build
```

## License

[MIT](LICENSE)
