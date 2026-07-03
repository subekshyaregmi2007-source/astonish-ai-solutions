# Design Documentation - Astonish AI Solutions

## Table of Contents
1. [Wireframes](#wireframes)
2. [Flowcharts](#flowcharts)
3. [Gantt Chart](#gantt-chart)

---

## Wireframes

### 1. Homepage Wireframe

```mermaid
graph TD
    subgraph "Homepage Layout"
        A[Navigation Bar<br/>Logo | Solutions | Industries | Testimonials | Articles | Events | Contact]
        B[Hero Section<br/>Main Heading<br/>Subheading<br/>CTA Buttons]
        C[Statistics Grid<br/>500+ Projects | 98% Success | 50+ Industries]
        D[Services Overview<br/>6 AI Solutions Cards]
        E[Client Logos Section<br/>Trusted Partners]
        F[Call to Action<br/>Get Started Button]
        G[Footer<br/>Links | Social Media | Copyright]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    
    style A fill:#f5f5f5,stroke:#333,stroke-width:1px
    style B fill:#ffffff,stroke:#333,stroke-width:1px
    style C fill:#ffffff,stroke:#333,stroke-width:1px
    style D fill:#ffffff,stroke:#333,stroke-width:1px
    style E fill:#ffffff,stroke:#333,stroke-width:1px
    style F fill:#e0e0e0,stroke:#333,stroke-width:1px
    style G fill:#f5f5f5,stroke:#333,stroke-width:1px
```

### 2. Contact Page Wireframe

```mermaid
graph TD
    subgraph "Contact Page Layout"
        A[Navigation Bar]
        B[Page Header<br/>Contact Us Title]
        C[Contact Form Container]
        D[Name Field - Required]
        E[Email Field - Required]
        F[Phone Field - Required]
        G[Company Field - Required]
        H[Country Dropdown - Required]
        I[Job Title Field - Required]
        J[Job Details Textarea - Required]
        K[Submit Button]
        L[Validation Messages Area]
        M[Footer]
    end
    
    A --> B
    B --> C
    C --> D
    D --> E
    E --> F
    F --> G
    G --> H
    H --> I
    I --> J
    J --> K
    K --> L
    L --> M
    
    style A fill:#f5f5f5,stroke:#333,stroke-width:1px
    style C fill:#ffffff,stroke:#333,stroke-width:1px
    style K fill:#e0e0e0,stroke:#333,stroke-width:1px
    style L fill:#ffffff,stroke:#333,stroke-width:1px
    style M fill:#f5f5f5,stroke:#333,stroke-width:1px
```

### 3. Admin Dashboard Wireframe

```mermaid
graph TD
    subgraph "Admin Dashboard Layout"
        A[Header Bar<br/>Logo | Admin Dashboard | Logout]
        B[KPI Cards Row<br/>Total Inquiries | Unique Countries | Unique Job Titles]
        C[Charts Section]
        D[Bar Chart - Inquiries by Country]
        E[Pie Chart - Job Titles Distribution]
        F[Recent Inquiries Table]
        G[Table Headers<br/>Name | Email | Company | Country | Status | Actions]
        H[Search & Filter Bar<br/>Search | Status Filter | Country Filter]
        I[Action Buttons<br/>View | Edit | Delete | Notes]
        J[Pagination Controls]
    end
    
    A --> B
    B --> C
    C --> D
    C --> E
    E --> H
    H --> F
    F --> G
    G --> I
    I --> J
    
    style A fill:#e0e0e0,stroke:#333,stroke-width:1px
    style B fill:#ffffff,stroke:#333,stroke-width:1px
    style C fill:#ffffff,stroke:#333,stroke-width:1px
    style F fill:#ffffff,stroke:#333,stroke-width:1px
    style H fill:#f5f5f5,stroke:#333,stroke-width:1px
    style I fill:#e0e0e0,stroke:#333,stroke-width:1px
```

---

## Flowcharts

### 1. User Journey - Contact Form Submission

```mermaid
flowchart TD
    Start([User Visits Website]) --> Browse[Browse Pages]
    Browse --> ContactPage[Navigate to Contact Page]
    ContactPage --> ViewForm[View Contact Form]
    ViewForm --> FillForm[Fill Form Fields]
    FillForm --> Submit[Click Submit]
    Submit --> ClientValidation{Client-Side<br/>Validation}
    
    ClientValidation -->|Invalid| ShowErrors[Display Error Messages]
    ShowErrors --> FillForm
    
    ClientValidation -->|Valid| SendRequest[Send POST Request to API]
    SendRequest --> ServerValidation{Server-Side<br/>Validation}
    
    ServerValidation -->|Invalid| ReturnError[Return 400 Error]
    ReturnError --> ShowErrors
    
    ServerValidation -->|Valid| SaveDB[Save to PostgreSQL Database]
    SaveDB --> Success[Show Success Message]
    Success --> ClearForm[Clear Form Fields]
    ClearForm --> End([Form Submission Complete])
    
    style Start fill:#d4edda
    style ClientValidation fill:#fff3cd
    style ServerValidation fill:#fff3cd
    style ShowErrors fill:#f8d7da
    style Success fill:#28a745,color:#fff
    style End fill:#d4edda
```

### 2. Admin Authentication Flow

```mermaid
flowchart TD
    Start([Admin Visits /admin]) --> LoginPage[Display Login Page]
    LoginPage --> EnterCreds[Enter Password]
    EnterCreds --> Submit[Click Login]
    Submit --> ClientCheck{Client-Side<br/>Validation}
    
    ClientCheck -->|Empty| ShowError1[Show: Password Required]
    ShowError1 --> EnterCreds
    
    ClientCheck -->|Valid| SendAuth[POST /api/admin/login]
    SendAuth --> ServerAuth{Verify Password<br/>with bcrypt}
    
    ServerAuth -->|Invalid| Return401[Return 401 Unauthorized]
    Return401 --> ShowError2[Show: Invalid Credentials]
    ShowError2 --> EnterCreds
    
    ServerAuth -->|Valid| GenerateJWT[Generate JWT Token]
    GenerateJWT --> ReturnToken[Return Token to Client]
    ReturnToken --> StoreToken[Store Token in localStorage]
    StoreToken --> Redirect[Redirect to Dashboard]
    Redirect --> LoadDashboard[Load Admin Dashboard]
    LoadDashboard --> FetchData[Fetch Inquiries & Stats]
    FetchData --> DisplayData[Display Data]
    DisplayData --> End([Authenticated Session])
    
    style Start fill:#d4edda
    style ClientCheck fill:#fff3cd
    style ServerAuth fill:#fff3cd
    style ShowError1 fill:#f8d7da
    style ShowError2 fill:#f8d7da
    style GenerateJWT fill:#007bff,color:#fff
    style End fill:#28a745,color:#fff
```

### 3. Inquiry Management Flow

```mermaid
flowchart TD
    Start([Admin on Dashboard]) --> ViewTable[View Inquiries Table]
    ViewTable --> Action{Select Action}
    
    Action -->|Search| Search[Enter Search Term]
    Search --> FilterTable[Filter Table Results]
    FilterTable --> ViewTable
    
    Action -->|Filter Status| SelectStatus[Select Status Filter]
    SelectStatus --> FilterTable
    
    Action -->|Filter Country| SelectCountry[Select Country Filter]
    SelectCountry --> FilterTable
    
    Action -->|View Notes| OpenNotes[Open Notes Dialog]
    OpenNotes --> ViewNotes[Display Existing Notes]
    ViewNotes --> AddNote{Add New Note?}
    AddNote -->|Yes| TypeNote[Type Note Content]
    TypeNote --> SaveNote[POST /api/inquiries/:id/notes]
    SaveNote --> UpdateList[Refresh Notes List]
    UpdateList --> ViewTable
    AddNote -->|No| CloseDialog[Close Dialog]
    CloseDialog --> ViewTable
    
    Action -->|Change Status| OpenStatus[Open Status Dropdown]
    OpenStatus --> SelectNewStatus[Select New Status]
    SelectNewStatus --> UpdateStatus[PUT /api/inquiries/:id]
    UpdateStatus --> OptimisticUpdate[Update UI Immediately]
    OptimisticUpdate --> Sync[Sync with Server]
    Sync --> ViewTable
    
    Action -->|Edit Inquiry| OpenEdit[Open Edit Form]
    OpenEdit --> ModifyFields[Modify Fields]
    ModifyFields --> SaveEdit[PUT /api/inquiries/:id]
    SaveEdit --> UpdateUI[Update Table Row]
    UpdateUI --> ViewTable
    
    Action -->|Delete| Confirm{Confirm Delete?}
    Confirm -->|No| ViewTable
    Confirm -->|Yes| DeleteInquiry[DELETE /api/inquiries/:id]
    DeleteInquiry --> RemoveRow[Remove from Table]
    RemoveRow --> ViewTable
    
    Action -->|Export CSV| ExportCSV[Generate CSV File]
    ExportCSV --> Download[Download CSV]
    Download --> ViewTable
    
    Action -->|Logout| Logout[Clear JWT Token]
    Logout --> End([Redirect to Login])
    
    style Start fill:#d4edda
    style Action fill:#007bff,color:#fff
    style Search fill:#fff3cd
    style OpenNotes fill:#ffc107
    style UpdateStatus fill:#17a2b8,color:#fff
    style DeleteInquiry fill:#dc3545,color:#fff
    style End fill:#6c757d,color:#fff
```

### 4. System Architecture Flow

```mermaid
flowchart LR
    subgraph Client ["Client Layer"]
        Browser[Web Browser]
        React[React 19 SPA]
        ReactQuery[React Query Cache]
    end
    
    subgraph API ["API Layer"]
        Express[Express 5 Server]
        Auth[JWT Auth Middleware]
        Routes[API Routes]
        Validation[Zod Validation]
    end
    
    subgraph Database ["Database Layer"]
        Drizzle[Drizzle ORM]
        PostgreSQL[(PostgreSQL 18)]
    end
    
    Browser --> React
    React --> ReactQuery
    ReactQuery -->|HTTP/REST| Express
    Express --> Auth
    Auth --> Routes
    Routes --> Validation
    Validation --> Drizzle
    Drizzle --> PostgreSQL
    PostgreSQL -->|Query Results| Drizzle
    Drizzle -->|JSON Response| Routes
    Routes -->|API Response| ReactQuery
    ReactQuery --> React
    React --> Browser
    
    style Browser fill:#e1f5ff
    style React fill:#61dafb,color:#000
    style Express fill:#90ee90
    style PostgreSQL fill:#336791,color:#fff
    style Auth fill:#ffc107
    style Validation fill:#ff6b6b,color:#fff
```

---

## Gantt Chart

### Project Development Timeline (8 Weeks)

```mermaid
gantt
    title Astonish AI Solutions - Development Timeline
    dateFormat YYYY-MM-DD
    section Planning
    Requirements Gathering           :done, req, 2026-05-01, 3d
    System Design & Architecture     :done, design, 2026-05-04, 4d
    Database Schema Design           :done, db-design, 2026-05-08, 2d
    
    section Setup
    Project Setup & Dependencies     :done, setup, 2026-05-10, 2d
    Monorepo Configuration           :done, mono, 2026-05-12, 1d
    Development Environment          :done, env, 2026-05-13, 1d
    
    section Backend Development
    Database Schema Implementation   :done, db-impl, 2026-05-14, 3d
    API Endpoints - Health & Auth    :done, api1, 2026-05-17, 2d
    API Endpoints - Public Routes    :done, api2, 2026-05-19, 3d
    API Endpoints - Admin Routes     :done, api3, 2026-05-22, 3d
    OpenAPI Documentation            :done, openapi, 2026-05-25, 2d
    
    section Frontend Development
    UI Component Library Setup       :done, ui, 2026-05-20, 2d
    Public Pages - Home & Solutions  :done, pub1, 2026-05-22, 3d
    Public Pages - Industries & More :done, pub2, 2026-05-25, 3d
    Contact Form Implementation      :done, contact, 2026-05-28, 2d
    Admin Login & Dashboard          :done, admin, 2026-05-30, 4d
    
    section Integration
    API Client Generation            :done, codegen, 2026-06-03, 1d
    Frontend-Backend Integration     :done, integration, 2026-06-04, 3d
    Authentication Flow Testing      :done, auth-test, 2026-06-07, 2d
    Form Validation Testing          :done, valid-test, 2026-06-09, 2d
    
    section Admin Features
    Dashboard Statistics & Charts    :done, stats, 2026-06-11, 3d
    Search & Filter Implementation   :done, search, 2026-06-14, 2d
    Pagination System                :done, pagination, 2026-06-16, 2d
    Status Management                :done, status, 2026-06-18, 2d
    Internal Notes System            :done, notes, 2026-06-20, 2d
    CSV Export Feature               :done, csv, 2026-06-22, 1d
    Edit & Delete Operations         :done, crud, 2026-06-23, 2d
    
    section Testing & Polish
    End-to-End Testing               :done, e2e, 2026-06-25, 3d
    Responsive Design Testing        :done, responsive, 2026-06-28, 2d
    Bug Fixes & Refinements          :done, bugs, 2026-06-30, 2d
    
    section Documentation
    README Documentation             :done, readme, 2026-07-02, 1d
    Code Comments & Cleanup          :done, comments, 2026-07-03, 1d
    
    section Deployment Prep
    Production Build Testing         :active, build, 2026-07-04, 1d
    GitHub Repository Setup          :active, github, 2026-07-05, 1d
    Final Review & Submission        :milestone, 2026-07-06, 0d
```

### Milestone Timeline

```mermaid
gantt
    title Project Milestones
    dateFormat YYYY-MM-DD
    section Key Milestones
    Project Kickoff                  :milestone, m1, 2026-05-01, 0d
    Backend API Complete             :milestone, m2, 2026-05-27, 0d
    Frontend UI Complete             :milestone, m3, 2026-06-03, 0d
    Admin Dashboard Complete         :milestone, m4, 2026-06-25, 0d
    Testing Complete                 :milestone, m5, 2026-07-02, 0d
    Project Submission               :milestone, m6, 2026-07-06, 0d
```

---

## Additional Diagrams

### Entity Relationship Diagram

```mermaid
erDiagram
    INQUIRIES ||--o{ NOTES : has
    
    INQUIRIES {
        int id PK
        string name
        string email
        string phone
        string company
        string country
        string jobTitle
        text jobDetails
        enum status
        timestamp createdAt
        timestamp updatedAt
    }
    
    NOTES {
        int id PK
        int inquiryId FK
        text content
        timestamp createdAt
    }
    
    SOLUTIONS {
        int id PK
        string title
        text description
        string icon
        json features
    }
    
    INDUSTRIES {
        int id PK
        string name
        text description
        string image
        int projectsDelivered
        int year
    }
    
    TESTIMONIALS {
        int id PK
        string clientName
        string company
        string position
        text feedback
        int rating
    }
    
    ARTICLES {
        int id PK
        string title
        text content
        string author
        string category
        timestamp publishedAt
    }
    
    EVENTS {
        int id PK
        string title
        text description
        string location
        string eventType
        date eventDate
        enum status
    }
```

### Component Hierarchy

```mermaid
graph TD
    App[App.tsx] --> Router[React Router]
    
    Router --> PublicPages[Public Pages]
    Router --> AdminPages[Admin Pages]
    
    PublicPages --> Home[Home Page]
    PublicPages --> Solutions[Solutions Page]
    PublicPages --> Industries[Industries Page]
    PublicPages --> Testimonials[Testimonials Page]
    PublicPages --> Articles[Articles Page]
    PublicPages --> Events[Events Page]
    PublicPages --> Contact[Contact Page]
    
    AdminPages --> Login[Admin Login]
    AdminPages --> Dashboard[Admin Dashboard]
    
    App --> Layout[Layout Components]
    Layout --> Navbar[Navbar]
    Layout --> Footer[Footer]
    
    Home --> Hero[Hero Section]
    Home --> Stats[Statistics Grid]
    Home --> Services[Services Overview]
    
    Contact --> ContactForm[Contact Form]
    ContactForm --> FormFields[Form Fields]
    FormFields --> Validation[Zod Validation]
    
    Dashboard --> KPICards[KPI Cards]
    Dashboard --> Charts[Chart Components]
    Dashboard --> InquiryTable[Inquiry Table]
    
    InquiryTable --> SearchBar[Search Bar]
    InquiryTable --> Filters[Filter Dropdowns]
    InquiryTable --> TableRows[Table Rows]
    InquiryTable --> Pagination[Pagination]
    
    TableRows --> Actions[Action Buttons]
    Actions --> NotesDialog[Notes Dialog]
    Actions --> EditDialog[Edit Dialog]
    Actions --> DeleteConfirm[Delete Confirmation]
    
    style App fill:#61dafb,color:#000
    style Router fill:#ca4245,color:#fff
    style Dashboard fill:#007bff,color:#fff
    style InquiryTable fill:#28a745,color:#fff
```

---

## Deployment Architecture

```mermaid
graph TB
    subgraph "Client Device"
        Browser[Web Browser]
    end
    
    subgraph "Frontend Server"
        Vite[Vite Dev Server :3000]
        React[React Application]
    end
    
    subgraph "Backend Server"
        Express[Express API :8080]
        Auth[JWT Authentication]
        Routes[API Endpoints]
    end
    
    subgraph "Database Server"
        PG[PostgreSQL :5432]
        Schema[Database Schema]
    end
    
    Browser -->|HTTP| Vite
    Vite --> React
    React -->|REST API| Express
    Express --> Auth
    Auth --> Routes
    Routes -->|Drizzle ORM| PG
    PG --> Schema
    
    style Browser fill:#e1f5ff
    style Vite fill:#646cff,color:#fff
    style Express fill:#90ee90
    style PG fill:#336791,color:#fff
```

---

## How to View These Diagrams

### Option 1: GitHub (Automatic Rendering)
When pushed to GitHub, all Mermaid diagrams render automatically in the markdown file.

### Option 2: VS Code Extension
Install "Markdown Preview Mermaid Support" extension to view in VS Code.

### Option 3: Online Viewer
Copy diagram code to https://mermaid.live for interactive viewing.

### Option 4: Export as Images
Use Mermaid CLI or online tools to export as PNG/SVG.

---

**Documentation Created:** July 2026  
**Project:** Astonish AI Solutions  
**Author:** Subekshya Regmi  
**Module:** CET333 Product Development
