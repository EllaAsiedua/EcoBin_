# GreenCycle Project - Comprehensive Code Index

## 📋 Project Overview
GreenCycle is a comprehensive environmental sustainability mobile application built with React Native (Expo) frontend and Spring Boot backend. The app focuses on waste management, community engagement, and environmental conservation through features like dump reporting, spot adoption, marketplace, and gamified leaderboards.

## 🏗️ Project Architecture

```
GreenCycle/
├── Frontend/                    # React Native Expo App
│   ├── app/                    # Main application screens (16 files)
│   ├── components/             # Reusable UI components (12 files)
│   ├── assets/                 # Images, fonts, static resources
│   ├── lib/                    # Utility libraries
│   └── Configuration Files     # package.json, tsconfig.json, etc.
└── Backend/                    # Spring Boot API
    └── Backend/
        ├── src/main/java/com/greencycle/Backend/
        │   ├── auth/           # Authentication & Security (5 files)
        │   ├── user/           # User Management & Leaderboard (9 files)
        │   ├── dump/           # Dump Reporting System (6 files)
        │   ├── bin/            # Bin Management System (10 files)
        │   └── search/         # Global Search Engine (6 files)
        ├── src/main/resources/ # Configuration & Database
        └── Configuration Files # pom.xml, etc.
```

## 🎯 Frontend (React Native + Expo)

### **Core Technology Stack**
- **React Native**: 0.79.3
- **Expo**: ~53.0.11 (SDK)
- **Expo Router**: ~5.1.0 (File-based routing)
- **TypeScript**: ~5.8.3
- **React Native Paper**: ^5.10.2 (Material Design components)

### **Key Dependencies**
- **Navigation**: Expo Router, React Navigation
- **Maps**: React Native Maps 1.20.1
- **Camera**: Expo Camera ~16.1.10
- **Storage**: AsyncStorage ^2.2.0
- **UI**: React Native Paper, Vector Icons
- **Location**: Expo Location ~18.1.5
- **Web**: React Native Web ~0.20.0

### **App Screens (`Frontend/app/`)**

#### 🔐 Authentication & Core (3 files)
- **`auth.tsx`** (295 lines) - JWT-based login/signup with form validation
- **`splash.tsx`** (46 lines) - App loading screen with branding
- **`_layout.tsx`** (126 lines) - Root layout with navigation structure

#### 🏠 Main Features (8 files)
- **`home.tsx`** (97 lines) - Dashboard with stats, favorites, news feed
- **`adopt.tsx`** (413 lines) - Spot adoption with map view and dump management
- **`reportdump.tsx`** (511 lines) - Dump reporting with camera and location integration
- **`search.tsx`** (579 lines) - Global search across dumps, users, marketplace
- **`marketplace.tsx`** (205 lines) - Eco-friendly product marketplace
- **`leaderboard.tsx`** (451 lines) - Community leaderboard with real-time scoring
- **`profile.tsx`** (197 lines) - User profile, settings, and wallet management
- **`camerascreen.tsx`** (241 lines) - Camera functionality for dump reporting

#### 🔧 Utility Screens (5 files)
- **`thankscreen.tsx`** (139 lines) - Success/thank you screen after actions
- **`aboutus.tsx`** (35 lines) - About page with app information
- **`settings.tsx`** (12 lines) - App settings and preferences
- **`report.tsx`** (5 lines) - Report redirect handler
- **`maplist.tsx`** (12 lines) - Map list view component

### **Components (`Frontend/components/`)**

#### 🧭 Navigation & Layout (4 files)
- **`TopNavBar.tsx`** (81 lines) - Top navigation bar with user info
- **`BottomNavBar.tsx`** (91 lines) - Bottom tab navigation
- **`CustomFAB.tsx`** (36 lines) - Floating Action Button
- **`TopHeader.tsx`** (21 lines) - Reusable header component

#### 🎴 Cards & UI Elements (4 files)
- **`FavoritesCard.tsx`** (130 lines) - Favorites section with add functionality
- **`RecentlyVisitedCard.tsx`** (97 lines) - Recently visited locations
- **`WasteAsAServiceCard.tsx`** (87 lines) - Waste service offerings
- **`Separator.tsx`** (16 lines) - Visual separator component

#### 🗺️ Map & Location (3 files)
- **`mapviewcomponent.tsx`** (83 lines) - Map view with markers and interactions
- **`listviewcomponent.tsx`** (58 lines) - List view of locations
- **`switchheader.tsx`** (68 lines) - View toggle header for map/list

#### 🛠️ Utilities (1 file)
- **`FloatingAddImageButton.tsx`** (67 lines) - Floating add button with image capture

## ⚙️ Backend (Spring Boot)

### **Core Technology Stack**
- **Spring Boot**: 3.5.3
- **Java**: 21
- **Spring Security**: Authentication & authorization
- **Spring Data JPA**: Database operations
- **PostgreSQL**: Primary database
- **H2**: Development database
- **JWT**: Token-based authentication
- **Algorand SDK**: Blockchain integration

### **Key Dependencies**
- **Web**: Spring Boot Starter Web
- **Security**: Spring Boot Starter Security
- **Data**: Spring Boot Starter Data JPA
- **Database**: PostgreSQL 42.6.0, H2
- **JWT**: jjwt 0.9.1
- **Blockchain**: Algorand SDK 2.8.2
- **File Upload**: Multipart support

### **Package Structure (`Backend/src/main/java/com/greencycle/Backend/`)**

#### 🔐 Authentication (`auth/` - 5 files)
- **`AuthController.java`** (79 lines) - Login/register endpoints with JWT
- **`JwtUtil.java`** (58 lines) - JWT token generation and validation
- **`JwtAuthFilter.java`** (65 lines) - JWT authentication filter
- **`SecurityConfig.java`** (42 lines) - Security configuration and CORS
- **`.gitkeep`** - Directory placeholder

#### 👤 User Management (`user/` - 9 files)
- **`UserController.java`** (73 lines) - User CRUD operations and profile management
- **`UserService.java`** (45 lines) - User business logic and registration
- **`UserRepository.java`** (14 lines) - User data access with custom queries
- **`User.java`** (137 lines) - User entity with leaderboard scoring fields
- **`WalletService.java`** (29 lines) - Algorand blockchain wallet operations
- **`LeaderboardController.java`** (91 lines) - Leaderboard API endpoints
- **`LeaderboardService.java`** (160 lines) - Leaderboard business logic and scoring
- **`LeaderboardInitializationService.java`** (42 lines) - Sample data initialization
- **`.gitkeep`** - Directory placeholder

#### 🗑️ Dump Reporting (`dump/` - 6 files)
- **`DumpReportController.java`** (50 lines) - Dump report endpoints with image upload
- **`DumpReportService.java`** (61 lines) - Dump business logic and leaderboard integration
- **`DumpReportRepository.java`** (6 lines) - Dump data access
- **`DumpReport.java`** (56 lines) - Dump entity model
- **`DumpReportRequest.java`** (24 lines) - Request DTO for dump reports
- **`DumpReportResponse.java`** (35 lines) - Response DTO for dump reports

#### 🗂️ Bin Management (`bin/` - 10 files)
- **`BinController.java`** (58 lines) - Bin endpoints and management
- **`BinService.java`** (56 lines) - Bin business logic
- **`BinRepository.java`** (8 lines) - Bin data access
- **`Bin.java`** (51 lines) - Bin entity model
- **`BinReport.java`** (47 lines) - Bin report entity
- **`BinReportController.java`** (58 lines) - Bin report endpoints
- **`BinReportRepository.java`** (8 lines) - Bin report data access
- **`BinReportRequest.java`** (21 lines) - Bin report request DTO
- **`BinReportResponse.java`** (29 lines) - Bin report response DTO
- **`IpfsService.java`** (46 lines) - IPFS file storage for images
- **`MultipartInputStreamFileResource.java`** (20 lines) - File handling utilities

#### 🔍 Search (`search/` - 6 files)
- **`SearchController.java`** (66 lines) - Search endpoints with global search
- **`SearchService.java`** (182 lines) - Search business logic across entities
- **`SearchResponse.java`** (36 lines) - Search response DTO
- **`DumpSearchResult.java`** (102 lines) - Dump search result model
- **`UserSearchResult.java`** (61 lines) - User search result model
- **`MarketplaceSearchResult.java`** (81 lines) - Marketplace search result model

### **Configuration & Resources**

#### 📁 Resources (`Backend/src/main/resources/`)
- **`application.properties`** (22 lines) - Main application configuration
- **`schema.sql`** (39 lines) - Database schema initialization

#### 🧪 Test Configuration (`Backend/src/test/`)
- **`TestConfig.java`** (18 lines) - Test configuration with mock services
- **`BackendApplicationTests.java`** (13 lines) - Application context tests
- **`application.properties`** (test) - Test-specific configuration

## 🎮 Key Features & Functionality

### **Frontend Features**
1. **🔐 Authentication System**
   - JWT-based login/signup
   - Secure token storage with AsyncStorage
   - Form validation and error handling

2. **📊 Dashboard & Analytics**
   - Real-time statistics display
   - User activity tracking
   - Progress indicators

3. **🗺️ Map Integration**
   - Interactive map with markers
   - Location-based services
   - GPS integration for dump reporting

4. **📸 Camera & Media**
   - Photo capture for dump reports
   - Image upload to IPFS
   - Media handling and storage

5. **🔍 Global Search**
   - Multi-entity search (dumps, users, marketplace)
   - Real-time search results
   - Advanced filtering options

6. **🏆 Leaderboard System**
   - Real-time scoring algorithm
   - Dynamic badge generation
   - Community competition features

7. **🛒 Marketplace**
   - Eco-friendly product listings
   - User-generated content
   - Transaction management

8. **👤 User Management**
   - Profile customization
   - Achievement tracking
   - Wallet integration

### **Backend Features**
1. **🔐 Security & Authentication**
   - JWT token management
   - Role-based access control
   - Secure password hashing

2. **🗄️ Database Management**
   - PostgreSQL integration
   - JPA entity management
   - Automatic schema updates

3. **📁 File Storage**
   - IPFS integration for decentralized storage
   - Image upload and management
   - File validation and processing

4. **🔍 Search Engine**
   - Multi-entity search capabilities
   - Advanced filtering and sorting
   - Real-time search results

5. **🏆 Leaderboard Algorithm**
   - Activity-based scoring system
   - Dynamic badge generation
   - Real-time ranking updates

6. **💰 Blockchain Integration**
   - Algorand wallet generation
   - Token management
   - Blockchain transactions

7. **📊 Analytics & Reporting**
   - User activity tracking
   - Performance metrics
   - Data aggregation

## 🗄️ Database Schema

### **Core Entities**

#### **User Entity**
```sql
users (
  id BIGINT PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR NOT NULL,
  name VARCHAR NOT NULL,
  wallet_address VARCHAR,
  total_score INTEGER DEFAULT 0,
  dumps_reported INTEGER DEFAULT 0,
  spots_adopted INTEGER DEFAULT 0,
  marketplace_sales INTEGER DEFAULT 0,
  cleanup_sessions INTEGER DEFAULT 0,
  cycle_tokens_earned INTEGER DEFAULT 0,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

#### **DumpReport Entity**
```sql
dump_reports (
  id BIGINT PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  photo_url VARCHAR,
  report_type VARCHAR,
  description TEXT,
  location VARCHAR,
  latitude DOUBLE,
  longitude DOUBLE,
  created_at TIMESTAMP
)
```

#### **Bin Entity**
```sql
bins (
  id BIGINT PRIMARY KEY,
  location VARCHAR,
  latitude DOUBLE,
  longitude DOUBLE,
  status VARCHAR,
  type VARCHAR
)
```

#### **BinReport Entity**
```sql
bin_reports (
  id BIGINT PRIMARY KEY,
  bin_id BIGINT REFERENCES bins(id),
  user_id BIGINT REFERENCES users(id),
  description TEXT,
  photo_url VARCHAR,
  created_at TIMESTAMP
)
```

## 🔌 API Endpoints

### **Authentication**
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### **User Management**
- `GET /api/user/me` - Get current user profile
- `PUT /api/user/me` - Update user profile

### **Dump Reports**
- `GET /api/dumps/reports` - Get all dump reports
- `POST /api/dumps/report/image` - Submit dump report with image

### **Bin Management**
- `GET /api/bins` - Get all bins
- `POST /api/bins` - Create new bin
- `POST /api/bins/reports` - Report bin issue

### **Leaderboard**
- `GET /api/leaderboard` - Get global leaderboard
- `GET /api/leaderboard/me` - Get current user stats
- `POST /api/leaderboard/update-score` - Update user score

### **Search**
- `GET /api/search` - Global search across entities

## 🏆 Leaderboard Scoring Algorithm

### **Score Calculation**
```
Total Score = (Dumps Reported × 10) + 
              (Spots Adopted × 25) + 
              (Marketplace Sales × 5) + 
              (Cleanup Sessions × 50) + 
              (Cycle Tokens × 2)
```

### **Badge System**
- 🏆 **Top Cleaner**: 10+ dumps reported
- 🌳 **Spot Adopter**: 1+ spots adopted
- 🛒 **Marketplace Seller**: 5+ marketplace sales
- 🧹 **Cleanup Champion**: 3+ cleanup sessions
- 💰 **Token Collector**: 100+ cycle tokens earned

## 🚀 Development Setup

### **Frontend Setup**
```bash
cd Frontend
npm install
expo start
```

### **Backend Setup**
```bash
cd Backend/Backend
mvn clean compile
mvn spring-boot:run
```

### **Database Setup**
- PostgreSQL database required
- H2 in-memory database for development
- Automatic schema initialization

### **Environment Configuration**
- **API URL**: `http://172.20.10.2:8081/api`
- **Database**: PostgreSQL (production), H2 (development)
- **File Storage**: IPFS for decentralized storage
- **Authentication**: JWT tokens with refresh mechanism

## 📈 Recent Updates & Improvements

### **Latest Features Added**
1. **Real Leaderboard System** - Replaced dummy data with actual scoring algorithm
2. **Enhanced User Scoring** - Added comprehensive activity tracking
3. **Dynamic Badge System** - Automatic badge generation based on achievements
4. **Improved Error Handling** - Better error messages and debugging tools
5. **Database Schema Updates** - Added leaderboard scoring fields
6. **Security Enhancements** - Proper endpoint protection and authentication

### **Technical Improvements**
1. **Code Organization** - Better separation of concerns
2. **Error Handling** - Comprehensive error management
3. **Performance** - Optimized database queries and API responses
4. **Testing** - Added test configuration and mock services
5. **Documentation** - Comprehensive code documentation

## 🔧 Configuration Files

### **Frontend Configuration**
- **`package.json`** - Dependencies and scripts
- **`tsconfig.json`** - TypeScript configuration
- **`app.json`** - Expo configuration
- **`babel.config.js`** - Babel configuration

### **Backend Configuration**
- **`pom.xml`** - Maven dependencies and build configuration
- **`application.properties`** - Spring Boot configuration
- **`schema.sql`** - Database schema initialization

## 📊 Project Statistics

### **Code Metrics**
- **Total Files**: 50+ source files
- **Frontend Lines**: ~3,500+ lines of TypeScript/React Native
- **Backend Lines**: ~2,000+ lines of Java/Spring Boot
- **Components**: 12 reusable UI components
- **Screens**: 16 main application screens
- **API Endpoints**: 15+ REST endpoints

### **Technology Distribution**
- **Frontend**: React Native, Expo, TypeScript
- **Backend**: Spring Boot, Java 21, PostgreSQL
- **Database**: PostgreSQL (production), H2 (development)
- **Authentication**: JWT tokens
- **File Storage**: IPFS
- **Blockchain**: Algorand

This comprehensive code index provides a complete overview of the GreenCycle project structure, enabling developers to understand the codebase architecture, locate specific functionality, and contribute effectively to the project. 