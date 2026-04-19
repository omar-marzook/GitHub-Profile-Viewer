# GitHub Profile Viewer

A clean, lightweight web application that interfaces with the **GitHub REST API** to fetch and display repository data dynamically. Built with vanilla JavaScript, modular ES Modules architecture, and powered by Vite for fast development and optimized production builds.

---

## 🚀 Features

- **Real-time Data Fetching:** Pulls live repository data from the GitHub REST API using the Fetch API.
- **Dynamic Repository Cards:** Automatically generates cards for each public repo with name, language, stars, visibility, and last updated date.
- **Language Filter:** Dynamically populated dropdown to filter repositories by programming language.
- **Stars & Date Sorting:** Sort repositories by star count or last updated date in ascending or descending order — filters and sorts chain together seamlessly.
- **Repository Stats Summary:** Displays total repo count, total stars, and a language breakdown — all computed with `reduce`.
- **Bookmark Repositories:** Save repositories to `localStorage` and highlight them persistently across filter and sort operations.
- **ES Modules Architecture:** Codebase split across `api.js`, `render.js`, `storage.js`, and `main.js` for separation of concerns.
- **Responsive Design:** Mobile-friendly CSS layout designed for clarity and readability.

---

## 🛠️ Technical Stack

- **HTML5:** Semantic structure for the profile and repository interface.
- **CSS3:** Custom styling for repository card layouts and grid systems.
- **JavaScript (ES6+):** Async/await, ES Modules, optional chaining, nullish coalescing, array methods.
- **GitHub REST API:** Source of truth for user and repository metadata.
- **Vite:** Development server with hot module replacement (HMR) and optimized production bundling.

---

## 📦 Installation & Setup

1. **Clone the repository:**
```bash
   git clone https://github.com/omar-marzook/github-profile-viewer.git
```

2. **Navigate to the project directory:**
```bash
   cd github-profile-viewer
```

3. **Install dependencies:**
```bash
   npm install
```

4. **Start the development server:**
```bash
   npm run dev
```

5. **Build for production:**
```bash
   npm run build
```

6. **Preview the production build locally:**
```bash
   npm run preview
```

---

## 🔧 How It Works

1. **Request:** A `GET` request is sent to `https://api.github.com/users/{username}/repos` via `api.js`.
2. **Process:** The JSON response is parsed, and stats are computed using `reduce` across the dataset.
3. **Render:** `render.js` injects repository cards into the DOM, populates the language filter, and displays the stats summary.
4. **Filter & Sort:** `main.js` manages state and runs all active filters and sorts together through a single `applyFiltersAndSort` pipeline on every change.
5. **Bookmarks:** `storage.js` handles reading and writing bookmark IDs to `localStorage`. Highlights persist across filter and sort re-renders once activated.

---

## 📁 Project Structure