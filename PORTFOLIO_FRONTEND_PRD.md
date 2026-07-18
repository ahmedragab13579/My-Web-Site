# 📋 Product Requirements Document (PRD): Dynamic Portfolio & Custom CMS Architecture

## 1. Executive Summary & Architecture Vision
This document outlines the frontend architectural specifications for transforming the static developer portfolio into a **Full-Stack Dynamic Portfolio and Custom Content Management System (CMS)** powered by **ASP.NET Core Web API** and **React Query**. 

The architecture strictly separates presentation from data fetching using a **3-Layer Architecture** (Types $\rightarrow$ Axios Client $\rightarrow$ React Query Hooks) and introduces modular routing via **React Router** to support public detail pages and a secure administrative dashboard.

---

## 2. Layouts Architecture
To ensure a clean separation of concerns between public visitors and the administrative user, the application is divided into two distinct root layouts:

### A. PublicLayout (`/src/layouts/PublicLayout.tsx`)
* **Target Audience:** General visitors, recruiters, and potential clients.
* **Responsibilities:** 
  * Renders the persistent `Header` (with navigation links to `#about`, `#experience`, etc.)[cite: 4] and `Footer`[cite: 3].
  * Manages global UI elements like the Dark/Light theme toggle switch.
  * Wraps public routes using React Router's `<Outlet />`.
* **Included Components:** `Header`, `Footer`, `ThemeToggle`, `ScrollToTop`.

### B. AdminLayout (`/src/layouts/AdminLayout.tsx`)
* **Target Audience:** Authenticated Administrator (Single-tenant).
* **Responsibilities:**
  * Implements a **Protected Route Wrapper** that checks for a valid JWT token in storage/state before rendering.
  * Redirects unauthenticated users immediately to `/admin/login`.
  * Renders the administrative sidebar (`AdminSidebar`) and top navigation bar (`AdminNavbar`).
* **Included Components:** `AdminSidebar`, `AdminNavbar`, `AdminBreadcrumbs`, `LogoutButton`.

---

## 3. Application Routing Matrix
The routing layer is implemented using `createBrowserRouter` from `react-router-dom`.

| Route Path | Layout | Page Component | Access Level | Description |
| :--- | :--- | :--- | :--- | :--- |
| `/` | `PublicLayout` | `HomePage` | **Public** | Single-page landing view combining static and dynamic sections. |
| `/projects` | `PublicLayout` | `ProjectsIndexPage`| **Public** | Filterable catalog of all portfolio projects. |
| `/projects/:slug`| `PublicLayout` | `ProjectDetailPage`| **Public** | Deep dive into a specific project (gallery, markdown, stats). |
| `/blog` | `PublicLayout` | `BlogIndexPage` | **Public** | Archive of all published technical blog articles. |
| `/blog/:slug` | `PublicLayout` | `ArticleDetailPage`| **Public** | Reading page for a specific technical article. |
| `/admin/login` | *None (Standalone)*| `AdminLoginPage` | **Public / Auth** | JWT Authentication form for administrative access. |
| `/admin/dashboard`| `AdminLayout` | `AdminDashboardPage`| **Protected** | High-level analytics, view counters, and recent activity. |
| `/admin/projects`| `AdminLayout` | `AdminProjectsPage`| **Protected** | CRUD management table for portfolio projects. |
| `/admin/articles`| `AdminLayout` | `AdminArticlesPage`| **Protected** | CRUD table and Markdown editor for blog posts. |
| `/admin/skills` | `AdminLayout` | `AdminSkillsPage` | **Protected** | CRUD management for technical skills and categorization. |
| `/admin/experiences`| `AdminLayout` | `AdminExperiencePage`| **Protected** | CRUD timeline manager for career and traineeships. |
| `/admin/messages`| `AdminLayout` | `AdminMessagesPage`| **Protected** | Inbox for contact form submissions and lead management. |
| `/admin/profile` | `AdminLayout` | `AdminProfilePage` | **Protected** | Admin account details and password rotation. |

---

## 4. Pages & Component Breakdown

### A. Public Pages

#### 1. HomePage (`/src/pages/Home.tsx`)
Serves as the primary landing page, combining immutable static content with dynamic database-driven sections.
* **Child Components:**
  * `Hero` *(Static)*: Displays personal introduction and CV download button[cite: 5].
  * `About` *(Static)*: Displays bio, education, and language proficiencies[cite: 8].
  * `FeaturedProjects` *(Dynamic - refactored from `Experience.tsx`)*[cite: 2]: Displays top 3 database projects where `isFeatured == true`.
  * `SkillsSection` *(Dynamic)*[cite: 7]: Displays skills grouped by `SkillCategory`.
  * `Certifications` *(Static / JSON Driven)*[cite: 10]: Displays certificates grid using local JSON data.
  * `BlogPreview` *(Dynamic)*: Displays the latest 3 published technical blog articles.
  * `ContactSection` *(Dynamic)*[cite: 1]: Displays contact info and interactive submission form.
* **Associated Custom Hooks:**
  * `useFeaturedProjects()`
  * `useSkills()`
  * `useLatestArticles(limit: 3)`
  * `useCreateContactMessageMutation()`

#### 2. ProjectsIndexPage (`/src/pages/projects/ProjectsIndex.tsx`)
A dedicated page allowing visitors to explore the complete catalog of projects with filtering capabilities.
* **Child Components:** `ProjectCard`, `ProjectFilters` (by category/tech stack), `Pagination`.
* **Associated Custom Hooks:**
  * `useProjects({ pageNumber, pageSize, skillId, type })`
  * `useSkills()` *(for populating filter dropdowns)*

#### 3. ProjectDetailPage (`/src/pages/projects/ProjectDetail.tsx`)
A detailed case study page for a specific project.
* **Child Components:** `ProjectGallery` (carousel/lightbox), `MarkdownViewer` (renders `FullDescription`), `TechStackBadges`, `ProjectStats` (views & likes counters), `LikeButton`, `ShareLinks`.
* **Associated Custom Hooks:**
  * `useProjectBySlug(slug)`
  * `useIncrementProjectViewsMutation(id)` *(triggered once on mount)*
  * `useLikeProjectMutation(id)`

#### 4. BlogIndexPage (`/src/pages/blog/BlogIndex.tsx`)
An archive listing all published technical articles.
* **Child Components:** `ArticleCard`, `BlogSearchAndFilter`, `Pagination`.
* **Associated Custom Hooks:**
  * `usePublishedArticles({ pageNumber, pageSize })`

#### 5. ArticleDetailPage (`/src/pages/blog/ArticleDetail.tsx`)
A distraction-free reading page for technical blog posts.
* **Child Components:** `ArticleHeader` (author, reading time, date), `MarkdownViewer`, `RelatedProjects` (projects linked via `ArticleSkill`), `LikeButton`.
* **Associated Custom Hooks:**
  * `useArticleBySlug(slug)`
  * `useIncrementArticleViewsMutation(id)`
  * `useLikeArticleMutation(id)`

---

### B. Administrative Dashboard Pages (Protected)

#### 1. AdminLoginPage (`/src/pages/admin/AdminLogin.tsx`)
* **Child Components:** `LoginForm`, `ErrorMessage`.
* **Associated Custom Hooks:** `useLoginMutation()` *(stores JWT in localStorage/state upon success and redirects to `/admin/dashboard`)*.

#### 2. AdminDashboardPage (`/src/pages/admin/AdminDashboard.tsx`)
* **Child Components:** `StatCards` (Total Views, Total Likes, Unread Messages), `TopPerformingChart`, `RecentMessagesList`.
* **Associated Custom Hooks:** `useDashboardSummary()`

#### 3. AdminProjectsPage (`/src/pages/admin/AdminProjects.tsx`)
* **Child Components:** `ProjectsTable`, `ProjectFormModal` (integrates Markdown editor and Image Uploader), `DeleteConfirmModal`.
* **Associated Custom Hooks:**
  * `useAllProjectsAdmin()`
  * `useCreateProjectMutation()`
  * `useUpdateProjectMutation()`
  * `useDeleteProjectMutation()`
  * `useImageUploadMutation()`

#### 4. AdminArticlesPage (`/src/pages/admin/AdminArticles.tsx`)
* **Child Components:** `ArticlesTable`, `ArticleEditorModal` (Title, Slug generator, Summary, Markdown body, Status selector), `DeleteConfirmModal`.
* **Associated Custom Hooks:**
  * `useAllArticlesAdmin()`
  * `useCreateArticleMutation()`
  * `useUpdateArticleMutation()`
  * `useChangeArticleStatusMutation()`
  * `useDeleteArticleMutation()`

#### 5. AdminSkillsPage (`/src/pages/admin/AdminSkills.tsx`)
* **Child Components:** `SkillsCategoryGrid`, `SkillFormModal` (Name, Category Enum dropdown, Icon URL).
* **Associated Custom Hooks:**
  * `useSkills()`
  * `useCreateSkillMutation()`
  * `useUpdateSkillMutation()`
  * `useDeleteSkillMutation()`

#### 6. AdminMessagesPage (`/src/pages/admin/AdminMessages.tsx`)
* **Child Components:** `MessagesInboxTable`, `MessageDetailModal`, `StatusBadge` (New, Read, Replied).
* **Associated Custom Hooks:**
  * `useContactMessagesAdmin()`
  * `useUpdateMessageStatusMutation()`
  * `useDeleteMessageMutation()`

#### 7. AdminProfilePage (`/src/pages/admin/AdminProfile.tsx`)
* **Child Components:** `AdminInfoCard` (shows `LastLoginAt`), `ChangePasswordForm`.
* **Associated Custom Hooks:**
  * `useAdminProfile()`
  * `useChangePasswordMutation()`

---

## 5. Custom Hooks Matrix (React Query Layer)
All custom hooks must be housed within `/src/hooks/queries/` and `/src/hooks/mutations/` and rely exclusively on the `apiClient` Axios instance.

| Domain | Hook Name | Type | API Endpoint | Refetch / Invalidation Target |
| :--- | :--- | :--- | :--- | :--- |
| **Auth** | `useLoginMutation` | Mutation | `POST /api/auth/login` | N/A (Updates Auth Context) |
| **Auth** | `useChangePasswordMutation`| Mutation | `PUT /api/auth/change-password` | N/A |
| **Dashboard**| `useDashboardSummary` | Query | `GET /api/dashboard/summary` | `['dashboard', 'summary']` |
| **Projects** | `useProjects` | Query | `GET /api/projects` | `['projects', filters]` |
| **Projects** | `useProjectBySlug` | Query | `GET /api/projects/{slug}` | `['projects', slug]` |
| **Projects** | `useCreateProjectMutation` | Mutation | `POST /api/projects` | `['projects']`, `['dashboard']` |
| **Projects** | `useUpdateProjectMutation` | Mutation | `PUT /api/projects/{id}` | `['projects']` |
| **Projects** | `useDeleteProjectMutation` | Mutation | `DELETE /api/projects/{id}` | `['projects']`, `['dashboard']` |
| **Projects** | `useLikeProjectMutation` | Mutation | `POST /api/projects/{id}/like` | `['projects', id]` (Optimistic UI)|
| **Articles** | `usePublishedArticles` | Query | `GET /api/articles` | `['articles', 'published']` |
| **Articles** | `useArticleBySlug` | Query | `GET /api/articles/{slug}` | `['articles', slug]` |
| **Articles** | `useAllArticlesAdmin` | Query | `GET /api/articles/admin` | `['articles', 'admin']` |
| **Articles** | `useCreateArticleMutation` | Mutation | `POST /api/articles` | `['articles']`, `['dashboard']` |
| **Skills** | `useSkills` | Query | `GET /api/skills` | `['skills']` |
| **Skills** | `useCreateSkillMutation` | Mutation | `POST /api/skills` | `['skills']` |
| **Contact** | `useCreateContactMessage` | Mutation | `POST /api/contact` | N/A (Triggers UI Toast) |
| **Contact** | `useContactMessagesAdmin`| Query | `GET /api/contact` | `['contact-messages']` |
| **Uploads** | `useImageUploadMutation` | Mutation | `POST /api/uploads/image` | N/A (Returns Image URL) |

---

## 6. UI/UX & Design System Guidelines
* **Color Palette Consistency:** Maintain the established luxury dark theme utilizing Tailwind classes: `bg-brand-dark`, `text-brand-cream`, and `border-brand-teal`[cite: 3, 5, 8].
* **Loading States (Skeletons):** Never use basic spinning loaders for content sections. Build custom Skeleton UI components (`ProjectCardSkeleton`, `SkillBadgeSkeleton`, `TableSkeleton`) that mirror the exact geometry of the loaded cards using `animate-pulse bg-brand-blue/20`.
* **Optimistic UI Updates:** When a visitor clicks the "Like" button on a project or article, React Query must immediately update the UI count optimistically before the ASP.NET Core backend confirms the mutation, rolling back only if an HTTP error occurs.
* **Error Handling & Toasts:** Implement a global notification system (e.g., `react-hot-toast` or `sonner`) styled with the brand palette to alert administrators of successful CRUD operations or display validation errors returned from the API.