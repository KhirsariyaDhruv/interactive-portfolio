# Kinetic Sentinel OS - Interactive Developer Portfolio

A highly interactive, terminal-inspired developer portfolio designed to mimic a secure operating system environment. Built with a custom vanilla frontend and a PHP/MySQL backend, this portfolio features a unique intro sequence, window-based navigation, and a full-fledged administrative dashboard.

## 🌟 Features

* **Terminal Intro Sequence:** A simulated secure login terminal with custom ASCII art that welcomes users before granting them access to the main interface.
* **OS-Style Interface:** A desktop-like experience featuring movable, draggable, and minimizable windows ("Folders") for different sections of the portfolio.
* **Dynamic Projects Database:** Projects are fetched dynamically from a MySQL backend and rendered as interactive cards.
* **Circular Certificates Gallery:** A custom-built, 3D-style circular gallery to showcase certifications and achievements.
* **Visitor Tracking System:** Automatically logs visitor access times, IP addresses, browser types, and their terminal login names to the database.
* **Admin Dashboard:** A secure backend interface to monitor visitor analytics, manage the projects database, and view incoming contact messages.
* **Fully Responsive:** Seamlessly transitions from a complex desktop OS layout to a mobile-friendly stacked view.

## 🛠️ Technology Stack

* **Frontend:** HTML5, CSS3 (Vanilla, Custom Variables), JavaScript (ES6)
* **Backend:** PHP (PDO)
* **Database:** MySQL
* **UI/UX:** Custom "Hacker/Cybersecurity" aesthetic with dynamic DOM manipulation for window management.

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   cd YOUR_REPO_NAME
   ```

2. **Database Configuration**
   * Ensure you have a local server environment (like XAMPP, MAMP, or WAMP) running.
   * Create a new MySQL database named `portfolio_db`.
   * Import the provided `database_setup.sql` file into your MySQL server to set up the necessary tables (`visitor_logs`, `projects`, `messages`, `certificates`, etc.).
   * Update `api/db_connect.php` with your database credentials if they differ from the default XAMPP settings (`root` / no password).

3. **Running the Project**
   * Place the project folder in your local web server's document root (e.g., `htdocs` for XAMPP).
   * Open your browser and navigate to `http://localhost/portfolio`.

## 📁 File Structure Highlights

* `index.html` - The main portfolio entry point and OS interface.
* `terminal-intro.js` - Handles the initial secure login sequence.
* `folder.js` & `folder.css` - Logic and styling for the draggable window system.
* `admin.html` & `admin.js` - The backend dashboard interface.
* `api/` - Contains all PHP endpoints for database interactions (fetching projects, tracking visitors, etc.).

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
