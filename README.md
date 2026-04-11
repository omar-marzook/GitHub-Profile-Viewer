# GitHub Profile Viewer

A clean, lightweight web application that interfaces with the **GitHub REST API** to fetch and display repository data dynamically. This project focuses on efficient asynchronous data handling and modern UI presentation using vanilla JavaScript.

-----

## 🚀 Features

  * **Real-time Data Fetching:** Utilizes the Fetch API to pull live data from GitHub.
  * **Dynamic Component Rendering:** Automatically generates repository cards for each project in a user's profile.
  * **ES6+ Implementation:** Leveraging modern JavaScript syntax (Arrow functions, Template Literals, Destructuring) for clean, maintainable code.
  * **Responsive Design:** A simple, mobile-friendly CSS layout designed for clarity and readability.

-----

## 🛠️ Technical Stack

  * **HTML5:** Semantic structure for the profile interface.
  * **CSS3:** Custom styling for repository card layouts and grid systems.
  * **JavaScript (ES6+):** Logic for API integration and DOM manipulation.
  * **GitHub API:** Source of truth for user and repository metadata.

-----

## 📦 Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/omar-marzook/github-profile-viewer.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd github-profile-viewer
    ```
3.  **Open the project:**
    Simply open `index.html` in your preferred web browser.

-----

## 🔧 How It Works

1.  **Request:** The application sends a `GET` request to the GitHub API endpoint.
2.  **Process:** The JSON response is parsed and logged to the console for verification.
3.  **Render:** JavaScript iterates through the repository array to inject HTML cards into the DOM.

-----

## 📝 License

This project is open-source and available under the [MIT License](https://www.google.com/search?q=LICENSE).