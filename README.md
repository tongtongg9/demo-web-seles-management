# Web Sales Management

This project is a web-based sales management application. It uses modern web technologies such as React, TypeScript, and Vite for development and build processes.

## Getting Started

### Installation

1. Clone the repository:

    ```sh
    git clone <repository-url>
    cd web-seles-management
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Start the json-server:

    ```sh
    npm run serve
    ```

4. Build the project:

    ```sh
    npm run build
    ```

5. Start the preview server:

    ```sh
    npm run preview
    ```

6. Open the browser and navigate to `http://localhost:4173` to view the application.

7. Sign in with the default users.
    - admin:
        ```
        email: admin1@admin.com
        password: @123456
        ```
    - sales analyst:
        ```
        email: sales1@sales.com
        password: @123456
        ```

### Available Scripts

In the project directory, you can run:

-   `npm run dev`: Starts the development server using Vite.
-   `npm run build`: Builds the project using TypeScript and Vite.
-   `npm run lint`: Runs ESLint to check for linting errors.
-   `npm run preview`: Previews the production build using Vite.
-   `npm run serve`: Starts a JSON server to serve the `db/db.json` file on port 5000.

### Project Structure

-   `src/`: Contains the source code of the application.
-   `public/`: Contains the public assets.
-   `db/`: Contains the JSON database file for the JSON server.
