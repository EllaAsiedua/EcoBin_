# GreenCycle Project - Code Index

## Project Overview
GreenCycle is a React Native mobile application with a Spring Boot backend that focuses on environmental sustainability through waste management, spot adoption, and community engagement.

## Project Structure

```
GreenCycle/
├── Frontend/                 # React Native Expo App
│   ├── app/                 # Main application screens
│   ├── components/          # Reusable UI components
│   ├── assets/             # Images, fonts, etc.
│   ├── lib/                # Utility libraries
│   └── package.json        # Frontend dependencies
└── Backend/                # Spring Boot API
    └── Backend/
        ├── src/main/java/com/greencycle/Backend/
        │   ├── auth/       # Authentication & Security
        │   ├── user/       # User management
        │   ├── dump/       # Dump reporting
        │   ├── bin/        # Bin management
        │   └── search/     # Search functionality
        └── pom.xml         # Backend dependencies
```

## Frontend (React Native + Expo)

### Core Dependencies
- **React Native**: 0.79.3
- **Expo**: ~53.0.11
- **Expo Router**: ~5.1.0 (File-based routing)
- **React Native Paper**: ^5.10.2 (Material Design components)
- **React Native Maps**: 1.20.1 (Map functionality)
- **Expo Camera**: ~16.1.10 (Camera integration)
- **AsyncStorage**: ^2.2.0 (Local storage)

### App Screens (`Frontend/app/`)

#### Authentication & Core
- **`auth.tsx`** (295 lines) - Login/Signup screen with JWT authentication
- **`splash.tsx`** (46 lines) - App loading screen
- **`_layout.tsx`** (126 lines) - Root layout with navigation structure

#### Main Features
- **`home.tsx`** (97 lines) - Main dashboard with stats, favorites, and news
- **`adopt.tsx`** (413 lines) - Spot adoption with map view and dump management
- **`reportdump.tsx`** (511 lines) - Dump reporting with camera and location
- **`search.tsx`** (579 lines) - Global search across dumps, users, marketplace
- **`marketplace.tsx`** (205 lines) - Eco-friendly marketplace
- **`leaderboard.tsx`** (221 lines) - Community leaderboard
- **`profile.tsx`** (197 lines) - User profile and settings

#### Utility Screens
- **`camerascreen.tsx`** (241 lines) - Camera functionality
- **`thankscreen.tsx`** (139 lines) - Success/thank you screen
- **`aboutus.tsx`** (35 lines) - About page
- **`settings.tsx`** (12 lines) - App settings
- **`report.tsx`** (5 lines) - Report redirect
- **`maplist.tsx`** (12 lines) - Map list view

### Components (`Frontend/components/`)

#### Navigation & Layout
- **`TopNavBar.tsx`** (81 lines) - Top navigation bar
- **`BottomNavBar.tsx`** (91 lines) - Bottom tab navigation
- **`CustomFAB.tsx`** (36 lines) - Floating Action Button
- **`TopHeader.tsx`** (21 lines) - Header component

#### Cards & UI Elements
- **`FavoritesCard.tsx`** (130 lines) - Favorites section with add functionality
- **`RecentlyVisitedCard.tsx`** (97 lines) - Recently visited locations
- **`WasteAsAServiceCard.tsx`** (87 lines) - Waste service offerings
- **`Separator.tsx`** (16 lines) - Visual separator component

#### Map & Location
- **`mapviewcomponent.tsx`** (83 lines) - Map view with markers
- **`listviewcomponent.tsx`** (58 lines) - List view of locations
- **`switchheader.tsx`** (68 lines) - View toggle header

#### Utilities
- **`FloatingAddImageButton.tsx`** (67 lines) - Floating add button with image

## Backend (Spring Boot)

### Core Dependencies
- **Spring Boot**: 3.5.3
- **Spring Security**: Authentication & authorization
- **Spring Data JPA**: Database operations
- **PostgreSQL**: Primary database
- **H2**: Development database
- **JWT**: Token-based authentication
- **Algorand SDK**: Blockchain integration

### Package Structure (`Backend/src/main/java/com/greencycle/Backend/`)

#### Authentication (`auth/`)
- **`AuthController.java`** (79 lines) - Login/register endpoints
- **`JwtUtil.java`** (58 lines) - JWT token utilities
- **`JwtAuthFilter.java`** (65 lines) - JWT authentication filter
- **`SecurityConfig.java`** (40 lines) - Security configuration

#### User Management (`user/`)
- **`UserController.java`** (73 lines) - User CRUD operations
- **`UserService.java`** (45 lines) - User business logic
- **`UserRepository.java`** (9 lines) - User data access
- **`User.java`** (64 lines) - User entity model
- **`WalletService.java`** (29 lines) - Blockchain wallet operations

#### Dump Reporting (`dump/`)
- **`DumpReportController.java`** (50 lines) - Dump report endpoints
- **`DumpReportService.java`** (50 lines) - Dump business logic
- **`DumpReportRepository.java`** (6 lines) - Dump data access
- **`DumpReport.java`** (56 lines) - Dump entity model
- **`DumpReportRequest.java`** (24 lines) - Request DTO
- **`DumpReportResponse.java`** (35 lines) - Response DTO

#### Bin Management (`bin/`)
- **`BinController.java`** (58 lines) - Bin endpoints
- **`BinService.java`** (56 lines) - Bin business logic
- **`BinRepository.java`** (8 lines) - Bin data access
- **`Bin.java`** (51 lines) - Bin entity model
- **`BinReport.java`** (47 lines) - Bin report entity
- **`BinReportController.java`** (58 lines) - Bin report endpoints
- **`IpfsService.java`** (46 lines) - IPFS file storage
- **`MultipartInputStreamFileResource.java`** (20 lines) - File handling

#### Search (`search/`)
- **`SearchController.java`** (66 lines) - Search endpoints
- **`SearchService.java`** (182 lines) - Search business logic
- **`SearchResponse.java`** (36 lines) - Search response DTO
- **`DumpSearchResult.java`** (102 lines) - Dump search results
- **`UserSearchResult.java`** (61 lines) - User search results
- **`MarketplaceSearchResult.java`** (81 lines) - Marketplace search results

## Key Features

### Frontend Features
1. **Authentication**: JWT-based login/signup
2. **Dashboard**: Stats, favorites, recently visited
3. **Spot Adoption**: Map view with dump management
4. **Dump Reporting**: Camera integration with location
5. **Search**: Global search across all entities
6. **Marketplace**: Eco-friendly product marketplace
7. **Leaderboard**: Community engagement
8. **Profile Management**: User settings and wallet

### Backend Features
1. **RESTful API**: Complete CRUD operations
2. **JWT Authentication**: Secure token-based auth
3. **File Storage**: IPFS integration for images
4. **Search Engine**: Multi-entity search
5. **Blockchain Integration**: Algorand wallet support
6. **Database Management**: PostgreSQL with JPA
7. **Security**: Spring Security with CORS

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### User Management
- `GET /api/user/me` - Get current user
- `PUT /api/user/update` - Update user profile

### Dump Reports
- `GET /api/dumps/reports` - Get all dump reports
- `POST /api/dumps/reports` - Create dump report
- `PUT /api/dumps/reports/{id}` - Update dump report

### Bin Management
- `GET /api/bins` - Get all bins
- `POST /api/bins` - Create bin
- `POST /api/bins/reports` - Report bin issue

### Search
- `GET /api/search` - Global search across entities

## Database Schema

### Core Entities
- **User**: id, email, name, wallet_address, created_at
- **DumpReport**: id, user_id, photo_url, description, location, coordinates, status
- **Bin**: id, location, coordinates, status, type
- **BinReport**: id, bin_id, user_id, description, photo_url

## Development Setup

### Frontend
```bash
cd Frontend
npm install
expo start
```

### Backend
```bash
cd Backend/Backend
mvn spring-boot:run
```

## Configuration
- **API URL**: `http://172.20.10.2:8081/api`
- **Database**: PostgreSQL (production), H2 (development)
- **File Storage**: IPFS for decentralized storage
- **Authentication**: JWT tokens with refresh mechanism

## Recent Updates
- Added navigation from favorites plus button to adopt screen
- Implemented comprehensive search functionality
- Integrated camera and location services
- Added blockchain wallet integration
- Implemented IPFS file storage for images 