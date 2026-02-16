# Art Flow - Gestão de Acervo de Arte

## Overview
Art Flow is a web-based art collection management system designed as a comprehensive Cultural ERP. Its main purpose is to provide a platform for artists, collectors, and galleries to manage their art portfolios, track logistics, and access market opportunities. The project aims to offer a freemium model with multi-profile support and a premium "Opportunity Center." Key capabilities include managing artworks, collections, exhibitions, sales, and logistics, along with generating dynamic catalogs and certificates of authenticity.

## User Preferences
- Todo o sistema em pt-BR (interface, botões, código)
- Design minimalista, limpo, fundo claro
- Nunca apagar ou sobrescrever código aprovado em etapas anteriores
- Stack: React + Tailwind CSS

## System Architecture
Art Flow is built as a single-page application (SPA) with a frontend developed using React, Tailwind CSS for styling, and `wouter` for client-side routing. The backend is powered by Express.js. The interface language is Brazilian Portuguese (pt-BR).

**UI/UX Decisions:**
- The design emphasizes a minimalist, clean aesthetic with a light background.
- Navigation within the dashboard utilizes an internal state (`paginaAtiva`) to switch content without full page reloads, enhancing user experience.
- `shadcn/ui` is used for UI components, ensuring a consistent and modern look.

**Technical Implementations & Feature Specifications:**
- **User Authentication:** Login and registration functionalities support distinct profiles (Artist, Collector).
- **Multi-profile Support:** The system dynamically adapts menus and functionalities based on the user's profile (Artist, Collector). A `buildMenu(perfil)` function centralizes this logic.
- **Asset Management:** Features include a gallery of artworks, support for collections/series, dynamic catalog generation, and management of certificates of authenticity.
- **Logistics & Tracking:** Comprehensive modules for managing artwork location, exhibitions, representation, consignments, and loans/donations. The "Mapa da Obra" (Artwork Map) provides a visual, geographical representation of artwork locations with interactive pins and status indicators.
- **Commercial & Market Intelligence:** Modules for sales tracking, evaluation requests, and a premium "Opportunity Center" encompassing exhibitions, calls for art, fairs, and public auctions.
- **Freemium Model:**
    - **Free Tier:** Limited to 5 artworks, 1 certificate, and 1 catalog. Features a diagonal watermark on certificates and catalogs.
    - **Premium Tier (R$49,90/mês):** Offers unlimited access, no watermarks, and full access to all modules including advanced commercial and opportunity features. Premium features are indicated by golden "P" seals or crowns.
- **Content Generation:** Dynamic catalog generator allows users to select artworks and create custom catalogs with cover pages and emissor details.
- **Data Persistence:** User profile, submissions, and preferences are stored locally using `localStorage`.

**System Design Choices:**
- **Modular Structure:** The dashboard is organized into distinct functional groups (Perfil, Acervo, Logística, Comercial, Oportunidade, Mercado, Suporte) for clear navigation and scalability.
- **Unified Profile Refactoring:** Artist and Collector profiles were unified to share common functionalities while maintaining profile-specific features and views.
- **Real-time Map Integration:** The "Mapa da Obra" uses Leaflet/OpenStreetMap with real `lat/lng` coordinates, popups displaying artwork details, and interactive legends for filtering.
- **Automated Notifications:** Notifications, such as those for public auctions, are integrated into the "Caixa de Entrada" (Inbox).

## External Dependencies
- **Frontend Framework:** React
- **CSS Framework:** Tailwind CSS
- **UI Component Library:** shadcn/ui
- **Routing Library:** wouter
- **Backend Framework:** Express.js
- **Mapping Service:** Leaflet / OpenStreetMap (for "Mapa da Obra")