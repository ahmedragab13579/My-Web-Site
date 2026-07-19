# 🌟 Dynamic Developer Portfolio Frontend

A premium, modern, and high-performance developer portfolio built using **React 19**, **TypeScript**, **Vite**, and **Tailwind CSS v4**. Powered by **React Query v5** and **Axios**, the frontend presentation layer is fully decoupled from the backend **ASP.NET Core Web API**, supporting dynamic projects listings, career timelines, skill catalogs, and interactive blog articles with views/likes tracking.

---

## 📖 Table of Contents

- [🚀 Architecture Vision](#-architecture-vision)
- [💻 Tech Stack](#-tech-stack)
- [📂 Directory Structure](#-directory-structure)
- [🎨 Design System & UI Guidelines](#-design-system--ui-guidelines)
- [🖥️ Layouts, Pages, and Components (with Image Placeholders)](#️-layouts-pages-and-components-with-image-placeholders)
- [🔄 Custom Hooks Matrix (React Query)](#-custom-hooks-matrix-react-query)
- [⚙️ Setup and Installation](#️-setup-and-installation)
- [📝 License](#-license)

---

## 🚀 Architecture Vision

This application uses a strict **3-Layer Architecture** to keep presentation clean, performant, and maintainable:

1. **Types Layer (`/src/types`)**: Strong TypeScript models matching the backend API contract.
2. **Axios Client (`/src/BackEndIntegration/apiClient.ts`)**: Decoupled Axios instance configured with base request configurations and unified error handlers.
3. **React Query Hooks (`/src/hooks`)**: Custom query and mutation declarations handling local caching, auto-refetching, and optimistic UI updates for interactive states like liking posts.

---

## 💻 Tech Stack

- **Core**: React 19 (Compiler-enabled), TypeScript, Vite 8
- **Styling**: Tailwind CSS v4 (native `@tailwindcss/vite` plugin), Lucide Icons
- **State Management & Fetching**: React Query v5, Axios 1.18
- **Routing**: React Router DOM 7 (`createBrowserRouter`)
- **Toasts & Feedback**: React Toastify 11

---

## 📂 Directory Structure

```text
src/
├── BackEndIntegration/      # Axios client configuration and endpoints wrapper
├── components/              # Reusable UI components
│   ├── About.tsx
│   ├── Blog.tsx             # Blog preview section for Home page
│   ├── Certifications.tsx  # Certifications layout
│   ├── ChangeColorMode.tsx  # Light/Dark mode switcher
│   ├── Contact.tsx          # Contact details & form submission
│   ├── Experience.tsx       # Work/Trainee experience timeline
│   ├── Footer.tsx           # Standard portfolio footer
│   ├── Header.tsx           # Navigation header
│   ├── Hero.tsx             # Introduction section
│   ├── Icons.tsx            # Theme/social vector icons
│   ├── Projects.tsx         # Projects preview cards grid
│   ├── ScrollToTop.tsx      # View scroll utility
│   ├── Services.tsx         # Services card catalog
│   └── Skills.tsx           # Categorized skills grid
├── context/                 # Context Providers (Theme)
├── data/                    # Local JSON files / assets
├── hooks/                   # Custom Hooks (Queries, Mutations, Helpers)
├── layouts/                 # Root layout container
│   └── PublicLayout.tsx     # Header/Footer wrapper for pages
├── pages/                   # Route Page Components
│   ├── Home.tsx             # Homepage landing template
│   ├── NotFoundPage.tsx     # Catch-all page
│   ├── blog/                # Blog listings and detail pages
│   └── projects/            # Project catalog and detail pages
├── App.tsx                  # Root wrapper with ToastContainer and providers
├── index.css                # Global styles, variables, and Tailwind directives
├── main.tsx                 # App bootstrapping
└── router.tsx               # Route path mapping rules
```

---

## 🎨 Design System & UI Guidelines

- **Color Palette**: Luxury dark theme utilizing variables defined in `index.css` (`bg-brand-dark`, `text-brand-cream`, and `border-brand-teal`).
- **Micro-Animations**: Clean hover transformations, active states, and transition declarations.
- **Loading State Skeletons**: Tailored skeleton frames (`ProjectCardSkeleton`, `SkillsSkeleton`) mirror exact content blocks during fetch states.
- **Optimistic UI Updates**: Instantly increments likes/views client-side upon interaction before the API request completes.

---

## 🖥️ Layouts, Pages, and Components (with Image Placeholders)

### Public Components

These components form the structured interface of the landing pages.

#### 1. Header & Theme Toggle

- **Path**: `/src/components/Header.tsx`, `/src/components/ChangeColorMode.tsx`
- **Features**: Responsive navigations, hash-link scrolling to sections, and dark/light color mode switcher.
  Hero Section
- **Path**: `/src/components/Hero.tsx`
- **Features**: Premium landing greeting, developer description, social integration cards, and CV download.

![Hero Component Placeholder](https://i.suar.me/0p7yr/l)

#### 3. About Section

- **Path**: `/src/components/About.tsx`
- **Features**: Developer summary, educational timeline milestones, and language capability meters.

![About Component Placeholder](https://i.suar.me/zX5qv/l)

#### 4. Services Grid

- **Path**: `/src/components/Services.tsx`
- **Features**: Grid list showcasing key services, hover-responsive borders, and themed category icons.

![Services Component Placeholder](https://i.suar.me/4z9XX/l)

#### 5. Experience Timeline

- **Path**: `/src/components/Experience.tsx`
- **Features**: Interactive, clean timeline showing past positions, duties, dates, and technology links.

![Experience Timeline Placeholder](https://i.suar.me/MpYv3/l)

#### 6. Featured Projects Component

- **Path**: `/src/components/Projects.tsx` (Homepage Section)
- **Features**: Fills a dynamic grid featuring the top projects marked as featured.

![Featured Projects Section Placeholder](https://i.suar.me/Jp5va/l)

#### 7. Skills Board

- **Path**: `/src/components/Skills.tsx`
- **Features**: Technical capabilities grouped dynamically by category enums with graphical bars or badge indicators.

![Skills Component Placeholder](https://i.suar.me/YQ8EX/l)

#### 8. Certifications Component

- **Path**: `/src/components/Certifications.tsx`
- **Features**: Grid listing achievements, license codes, validation links, and provider verification buttons.

![Certifications Grid Placeholder](https://i.suar.me/Zz3EM/l)

#### 9. Blog Preview Section

- **Path**: `/src/components/Blog.tsx` (Homepage Section)
- **Features**: Displays the top 3 latest technical posts with publishing dates and reading times.

![Blog Preview Section Placeholder](https://i.suar.me/mgGEj/l)

#### 10. Contact Section & Submission Form

- **Path**: `/src/components/Contact.tsx`
- **Features**: Contact details card and a message form with active validation, sending inputs to the contact endpoint with success toast alerts.

![Contact Section and Form Placeholder](https://i.suar.me/9zaW3/l)

---

### Pages

The core routes that structure navigation across the portfolio.

#### 1. Projects Index Page

- **Route**: `/projects`
- **Path**: `/src/pages/projects/ProjectsIndex.tsx`
- **Features**: View all projects with category tags filtering, tech-stack queries, and paginated listings.

#### 2. Article Detail Page

- **Route**: `/blog/:slug`
- **Path**: `/src/pages/blog/ArticleDetail.tsx`
- **Features**: High-fidelity reading canvas displaying Markdown contents, author/date headers, like count actions, and related project items.

![Article Detail Page Placeholder](https://i.suar.me/Kp9v8/l)

---

## 🔄 Custom Hooks Matrix (React Query)

All API integration points for dynamic data display and page feedback loop:

| Domain       | Hook Name                 | Type     | API Endpoint                   | Invalidation Target                |
| :----------- | :------------------------ | :------- | :----------------------------- | :--------------------------------- |
| **Projects** | `useProjects`             | Query    | `GET /api/projects`            | `['projects', filters]`            |
| **Projects** | `useProjectBySlug`        | Query    | `GET /api/projects/{slug}`     | `['projects', slug]`               |
| **Projects** | `useLikeProjectMutation`  | Mutation | `POST /api/projects/{id}/like` | `['projects', id]` (Optimistic UI) |
| **Articles** | `usePublishedArticles`    | Query    | `GET /api/articles`            | `['articles', 'published']`        |
| **Articles** | `useArticleBySlug`        | Query    | `GET /api/articles/{slug}`     | `['articles', slug]`               |
| **Articles** | `useLikeArticleMutation`  | Mutation | `POST /api/articles/{id}/like` | `['articles', id]` (Optimistic UI) |
| **Skills**   | `useSkills`               | Query    | `GET /api/skills`              | `['skills']`                       |
| **Contact**  | `useCreateContactMessage` | Mutation | `POST /api/contact`            | None (Triggers Toast)              |

---

## ⚙️ Setup and Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- Package Manager: `npm` (comes bundled with Node.js)

### Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ahmedragab13579/My-Web-Site.git
   cd My-Web-Site
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` (or `.env.local`) file in the root directory:

   ```env
   # The URL pointing to your deployed or local ASP.NET Core API backend
   VITE_API_BASE_URL=https://localhost:7055
   ```

4. **Run the Application Locally**

   ```bash
   npm run dev
   ```

   Open your browser to the URL displayed in the terminal (usually `http://localhost:5173`).

5. **Build for Production**
   Compiles code, runs type-checking via TypeScript, and packages static production assets:
   ```bash
   npm run build
   ```
   Deploy the resulting `dist/` directory contents to Vercel, Netlify, or your static hosting platform of choice.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.
