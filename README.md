```markdown
# Praveen Portfolio

Welcome to the **Praveen Portfolio** repository – a modern, responsive portfolio built with Next.js, Tailwind CSS, and shadcn UI components. This project showcases my work, skills, education, and projects along with an integrated chatbot for interactive queries.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Components Overview](#components-overview)
- [SEO & Accessibility](#seo--accessibility)
- [Customization](#customization)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Responsive Design:** Mobile-first design using Tailwind CSS, ensuring the portfolio looks great on all devices.
- **Dark/Light Theme Toggle:** Integrated with [next-themes](https://github.com/pacocoursey/next-themes) for seamless theme switching.
- **Chatbot Integration:** A floating ChatWidget that allows visitors to query about projects, skills, and education with fuzzy matching (powered by [Fuse.js](https://fusejs.io/)).
- **Dynamic Projects Section:** Filter projects by keywords (e.g., Python, React, NodeJs, NextJS, AI) with a "Load More" feature to prevent overwhelming scrolling.
- **Smooth Scrolling & Navigation:** Fixed ScrollUpButton and a mobile-responsive NavBar with a hamburger menu.
- **SEO Optimized:** Metadata including Open Graph and Twitter Card data for better search engine and social media integration.
- **Modern UI Components:** Leveraging shadcn UI components for a consistent design system.

## Tech Stack

- **Next.js** – React framework for server-side rendering and static site generation.
- **React** – UI library for building the user interface.
- **Tailwind CSS** – Utility-first CSS framework for rapid UI development.
- **shadcn UI** – A component library to build polished UI components.
- **next-themes** – For theme (dark/light mode) switching.
- **Fuse.js** – Lightweight fuzzy-search library for chatbot data querying.
- **React Icons** – Icon library for UI elements.
- **Vercel** – (Optional) For seamless deployment and hosting.

## Installation

1. **Clone the repository:**

   ```bash
   git clone [https://github.com/yourusername/praveen-portfolio.git](https://github.com/yourusername/praveen-portfolio.git)
   cd praveen-portfolio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Up Static Assets:**

   - Place your PDF resume in the `/public/pdf/` folder.
   - Place any image assets (e.g., hero images, skill icons) in the `/public/assets/` folder.

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Visit `http://localhost:3000` to see the portfolio in action.

## Usage

**Navigation:**

- Use the NavBar to quickly jump between Home, Education, Skills, Projects, and Contact sections.

**Theme Toggle:**

- Switch between dark and light themes using the sun/moon icon available in the NavBar.

**Chatbot:**

- Click the floating chat icon (displayed in the bottom-left on larger screens) to ask questions about projects, education, and skills. The chatbot leverages Fuse.js to search through your JSON data and return relevant results.

**Projects Filtering & Load More:**

- In the Projects section, filter projects by keywords (Python, React, NodeJs, NextJS, AI) and click "Load More" to reveal additional projects in increments of 7.

**Scroll Up:**

- Use the fixed ScrollUpButton at the bottom-right to quickly return to the top of the page.

## Components Overview

**NavBar:**

- A responsive navigation bar with a hamburger menu on mobile and theme toggling.

**HomeSection:**

- Displays a welcome message, download resume button, and profile image. Integrated ChatWidget between sections for easy access.

**Education, Skills, Projects, Contact:**

- Sections to showcase your education, skills, project details, and contact information respectively. Projects section includes filtering and "Load More" functionality.

**ChatWidget & ChatModal:**

- A floating chatbot component that processes user queries and searches through JSON data (projects, education, skills) using Fuse.js.

**ScrollUpButton:**

- A fixed button that appears after scrolling down and enables smooth scrolling back to the top.

## SEO & Accessibility

**Metadata:**

- The project uses metadata for SEO optimization, including title, description, keywords, Open Graph, and Twitter Cards. See the metadata export in `globals.css` or your root layout file.

**Smooth Scrolling:**

- CSS property `scroll-behavior: smooth` is set globally for a better user experience.

**Accessible Navigation:**

- All interactive elements (buttons, links) include proper `aria-labels` and focus styles for improved accessibility.

## Customization

**Fonts:**

- You can switch between Google Fonts like Outfit, Inter, or Montserrat by updating the font import in your root layout.

**Theme & Styling:**

- Modify Tailwind CSS classes or extend the configuration in `tailwind.config.js` for custom themes and animations.

**Data Updates:**

- Update JSON files in the `/data/` folder (e.g., `projects.json`, `skills.json`, `education.json`) to modify the content displayed in the portfolio.

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request if you have suggestions or improvements.

## License

This project is licensed under the MIT License.
```
