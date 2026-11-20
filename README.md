# Three.js Custom Cakes

This project is a Three.js application that allows users to create and customize virtual cakes. It provides an interactive interface for designing cakes with various geometries, textures, and decorations.

## Project Structure

```
threejs-custom-cakes
├── src
│   ├── index.html        # Main HTML file
│   ├── main.js           # Entry point of the application
│   ├── components
│   │   └── Cake.js      # Cake component for creating and customizing cakes
│   ├── assets
│   │   ├── textures      # Directory for texture files
│   │   └── models        # Directory for 3D model files
│   └── styles
│       └── main.css      # CSS styles for the application
├── package.json          # npm configuration file
├── webpack.config.js     # Webpack configuration file
└── README.md             # Project documentation
```

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**
   ```
   git clone https://github.com/RCRoger/pastis.git
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the application:**
   ```
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to view the application.

## CI and Releases

Every push to `main` runs `.github/workflows/release.yml`: it installs dependencies, validates OpenSpec, builds the project and publishes a GitHub Release tagged `v<package version>.<run number>` with `pastis.zip` (`dist/` + `index.html`) attached. Serve the extracted zip with a static server.

## Features

- Create custom cake geometries using Three.js.
- Apply textures for realistic cake surfaces.
- Add decorations to cakes using 3D models.
- Interactive interface for real-time customization.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.