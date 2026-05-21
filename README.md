# CU Campus - University Services Portal

A full-stack web application for managing university campus workflows including complaint management, gate pass requests, mess information, and campus food ordering.

## 🌐 Live Demo

**Try it out now!** The application is deployed and live:

- 🎨 **Frontend (Vercel)**: https://cu-campus-frontend.vercel.app
- ⚙️ **Backend API (Railway)**: https://cu-campus-backend-production.up.railway.app
- 💾 **Database (Railway MySQL)**: Integrated into Railway project, production data stored

---

## 📋 Overview

CU Campus is a centralized digital platform that simplifies student life at Chitkara University by consolidating multiple campus services into a single, intuitive portal. Students can lodge complaints, request gate passes, check mess menus, and order food from campus vendors—all without visiting multiple offices.

### Key Features

- ✅ **Complaint Management**: Multi-category complaint submission with real-time status tracking
- ✅ **Gate Pass Workflow**: Request, approve, and reject gate passes with role-based permissions
- ✅ **Mess Information**: View hostel mess menus, timings, and complaint interface
- ✅ **Food Ordering**: Browse campus vendors, add items to cart, checkout with billing
- ✅ **Authentication**: Secure JWT-based login with role-based access control
- ✅ **Role-Based Access**: Three tiers—Student, Warden, Admin—with distinct permissions

---

## 🛠️ Tech Stack

### Backend
- **Language**: Java 17
- **Framework**: Spring Boot 3.3.x
- **Database**: MySQL 8.0
- **Authentication**: JWT (JSON Web Tokens)
- **ORM**: Spring Data JPA with Hibernate
- **Migrations**: Flyway (database versioning)
- **Build Tool**: Maven

### Frontend
- **Framework**: React 18.3
- **Styling**: Bootstrap 5.3
- **HTTP Client**: Axios
- **Routing**: React Router v6
- **Forms**: React Hook Form
- **Notifications**: React Toastify
- **Icons**: React Icons
- **Build Tool**: npm

### DevOps & Testing
- **Database Testing**: TestContainers + MySQL
- **Testing Framework**: JUnit 5
- **API Testing**: MockMvc

---

## 📋 Prerequisites

Before you begin, ensure you have installed:

- **Java 17** or higher ([Download](https://www.oracle.com/java/technologies/downloads/#java17))
- **Maven 3.8+** ([Download](https://maven.apache.org/download.cgi))
- **Node.js 16+** ([Download](https://nodejs.org/))
- **MySQL 8.0** ([Download](https://www.mysql.com/downloads/))
- **Git** ([Download](https://git-scm.com/))

### Verify Installation

```bash
java -version
mvn -version
node -version
npm -version
mysql --version
```

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/Vishvas0419/CU_Campus.git
cd "CU Campus Main"
```

### 2. Database Setup

```bash
# Create MySQL database and user
mysql -u root -p

mysql> CREATE DATABASE cu_campus;
mysql> CREATE USER 'cu_user'@'localhost' IDENTIFIED BY 'cu_password';
mysql> GRANT ALL PRIVILEGES ON cu_campus.* TO 'cu_user'@'localhost';
mysql> FLUSH PRIVILEGES;
mysql> EXIT;
```

### 3. Backend Setup

```bash
cd backend

# Create .env file (or set environment variables)
# Copy from example:
# cp .env.example .env

# Install dependencies and run
mvn clean install
mvn spring-boot:run
```

**Backend runs on**: `http://localhost:8080`

### 4. Frontend Setup (in a new terminal)

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

**Frontend runs on**: `http://localhost:3000`

---

## 🔧 Configuration

### Backend Configuration

**File**: `backend/src/main/resources/application.yml`

```yaml
spring:
  datasource:
    url: ${DB_URL:jdbc:mysql://localhost:3306/cu_campus}
    username: ${DB_USERNAME:cu_user}
    password: ${DB_PASSWORD:cu_password}
    driver-class-name: com.mysql.cj.jdbc.Driver

  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false

  flyway:
    enabled: true
    locations: classpath:db/migration

app:
  jwt:
    secret: ${JWT_SECRET:your-secret-key-min-32-chars-long-for-hs256}
    expiration-ms: 86400000  # 24 hours
  
  cors:
    allowed-origins: ${CORS_ORIGINS:http://localhost:3000}
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DB_URL=jdbc:mysql://localhost:3306/cu_campus
DB_USERNAME=cu_user
DB_PASSWORD=cu_password
JWT_SECRET=your-very-secret-key-that-is-at-least-32-characters-long
CORS_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Frontend Configuration

**File**: `frontend/.env.development`

```env
REACT_APP_API_BASE_URL=http://localhost:8080/api
```

**File**: `frontend/.env.production`

```env
REACT_APP_API_BASE_URL=https://cu-campus-backend-production.up.railway.app/api
```

**Frontend API Client Example** (`frontend/src/api/apiClient.js`):

```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

---

## 📁 Project Structure

```
CU Campus Main/
├── backend/                          # Spring Boot API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/cucampus/
│   │   │   │   ├── auth/             # Authentication controllers & services
│   │   │   │   ├── user/             # User management
│   │   │   │   ├── complaint/        # Complaint handling
│   │   │   │   ├── gatepass/         # Gate pass workflow
│   │   │   │   ├── mess/             # Mess information
│   │   │   │   ├── food/             # Food ordering
│   │   │   │   ├── security/         # JWT & Spring Security config
│   │   │   │   ├── config/           # CORS, DataSeeder
│   │   │   │   └── common/           # Exception handlers, utilities
│   │   │   └── resources/
│   │   │       ├── application.yml   # Main config
│   │   │       └── db/migration/     # Flyway SQL scripts
│   │   └── test/
│   │       └── java/com/cucampus/    # Integration & unit tests
│   ├── pom.xml                       # Maven dependencies
│   └── create_db.js                  # Database initialization script
│
├── frontend/                         # React SPA
│   ├── public/
│   ├── src/
│   │   ├── components/               # Reusable React components
│   │   ├── pages/                    # Page components
│   │   ├── api/                      # API client modules
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── .env.development
│
├── README.md                         # This file
├── Chitkara White Logo.png
└── Chitkara black logo.png
```

---

## 🔐 Authentication & Authorization

### Login Flow

1. **User submits credentials**: `POST /api/auth/login`
   ```json
   {
     "username": "john_doe",
     "password": "password123"
   }
   ```

2. **Backend validates** and returns JWT token:
   ```json
   {
     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
     "user": {
       "id": 1,
       "username": "john_doe",
       "fullName": "John Doe",
       "role": "ROLE_STUDENT"
     }
   }
   ```

3. **Frontend stores token** in localStorage:
   ```javascript
   localStorage.setItem('jwtToken', response.data.token);
   ```

4. **Frontend includes token** in requests:
   ```javascript
   headers: {
     'Authorization': `Bearer ${token}`
   }
   ```

### Roles & Permissions

| Role | Permissions |
|------|-------------|
| **ROLE_STUDENT** | Submit complaints, request gate passes, view mess menu, order food |
| **ROLE_WARDEN** | Approve/reject gate passes, view hostel complaints, manage mess data |
| **ROLE_ADMIN** | Full system access, user management, vendor management, data seeding |

---

## 📚 API Documentation

### Base URL
- **Development**: `http://localhost:8080/api`
- **Production**: `https://cu-campus-backend-production.up.railway.app/api`
- **Frontend**: `https://cu-campus-frontend.vercel.app`

### Authentication Endpoints

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "student1",
  "password": "password123"
}
```

#### Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "student2",
  "password": "password123",
  "fullName": "Jane Doe",
  "hostel": "Block A"
}
```

### Complaint Endpoints

#### Submit Complaint
```http
POST /api/complaints
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "WiFi Not Working",
  "description": "Internet is down in Block A",
  "categoryId": 2
}
```

#### Get My Complaints
```http
GET /api/complaints/my
Authorization: Bearer <token>
```

#### Get All Complaints (Admin only)
```http
GET /api/complaints
Authorization: Bearer <token>
```

#### Update Complaint Status (Admin only)
```http
PATCH /api/complaints/{id}/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "RESOLVED"
}
```

### Gate Pass Endpoints

#### Request Gate Pass
```http
POST /api/gatepass
Authorization: Bearer <token>
Content-Type: application/json

{
  "reason": "Family visit",
  "fromDatetime": "2026-05-25T10:00:00",
  "toDatetime": "2026-05-26T18:00:00"
}
```

#### Get My Gate Passes
```http
GET /api/gatepass/my
Authorization: Bearer <token>
```

#### Get Pending Gate Passes (Warden only)
```http
GET /api/gatepass/pending
Authorization: Bearer <token>
```

#### Approve Gate Pass (Warden only)
```http
PATCH /api/gatepass/{id}/approve
Authorization: Bearer <token>
```

#### Reject Gate Pass (Warden only)
```http
PATCH /api/gatepass/{id}/reject
Authorization: Bearer <token>
```

### Food Ordering Endpoints

#### Get All Food Outlets
```http
GET /api/food/outlets
```

#### Get Food Items by Outlet
```http
GET /api/food/items?outletId=1
```

#### Add to Cart
```http
POST /api/cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "foodItemId": 5,
  "quantity": 2
}
```

#### Create Order
```http
POST /api/orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {"foodItemId": 5, "quantity": 2},
    {"foodItemId": 7, "quantity": 1}
  ]
}
```

### Mess Endpoints

#### Get Mess Menu
```http
GET /api/mess/menu?hostel=Block%20A
```

#### Add Mess Complaint
```http
POST /api/mess/complaints
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Food quality issue",
  "description": "Rice was cold during lunch"
}
```

---

## ⚡ Quick Links

| Resource | Link |
|----------|------|
| **Live Frontend** | https://cu-campus-frontend.vercel.app |
| **Live API** | https://cu-campus-backend-production.up.railway.app/api |
| **GitHub** | https://github.com/Vishvas0419/CU_Campus |
| **API Base (Dev)** | http://localhost:8080/api |
| **Frontend (Dev)** | http://localhost:3000 |

---

## 🧪 Testing

### Run Backend Tests

```bash
cd backend

# Run all tests
mvn test

# Run specific test class
mvn test -Dtest=ComplaintServiceTest

# Run with coverage
mvn test jacoco:report
```

### Run Frontend Tests

```bash
cd frontend

# Run tests
npm test

# Run with coverage
npm test -- --coverage
```

---

## 🐛 Troubleshooting

### Issue: MySQL Connection Failed

**Error**: `Communications link failure... Access denied for user 'cu_user'@'localhost'`

**Solution**:
1. Verify MySQL is running: `sudo systemctl status mysql`
2. Check credentials in `.env` file
3. Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Issue: CORS Errors in Frontend

**Error**: `Access to XMLHttpRequest at 'http://localhost:8080/...' from origin 'http://localhost:3000' has been blocked by CORS policy`

**Solution**:
1. Verify backend is running on port 8080
2. Check `app.cors.allowed-origins` in `application.yml`
3. Ensure `http://localhost:3000` is in the allowed origins list

### Issue: JWT Token Expired

**Error**: `401 Unauthorized - JWT token is expired`

**Solution**:
1. Clear localStorage: `localStorage.removeItem('jwtToken')`
2. Login again to get a new token
3. Check token expiration in `application.yml` (default: 24 hours)

### Issue: Flyway Migration Failed

**Error**: `Unsupported Database: MySQL`

**Solution**:
1. Ensure `flyway-mysql` dependency is in `pom.xml`
2. Run `mvn clean install` to update dependencies
3. Restart the backend service

---

## 🚢 Deployment

### 🚀 Production (Current Setup)

#### Frontend - Vercel Deployment

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New" → "Project"
   - Import GitHub repository
   - Configure environment variables:
     ```env
     REACT_APP_API_BASE_URL=https://cu-campus-backend-production.up.railway.app/api
     ```
   - Deploy

3. **Access**: https://cu-campus-frontend.vercel.app

#### Backend - Railway Deployment

1. **Create Railway Account** (https://railway.app)

2. **Deploy Backend**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli
   
   # Login
   railway login
   
   # Initialize project
   cd backend
   railway init
   
   # Add MySQL database
   railway add
   # Select: MySQL
   
   # Deploy
   railway deploy
   ```

3. **Configure Environment Variables** in Railway Dashboard:
   ```env
   DB_URL=<Railway MySQL Connection String>
   DB_USERNAME=<MySQL User>
   DB_PASSWORD=<MySQL Password>
   JWT_SECRET=<Your 32+ char secret>
   CORS_ORIGINS=https://cu-campus-frontend.vercel.app
   ```

4. **Access**: https://cu-campus-backend-production.up.railway.app

#### Database - Railway MySQL

- **Automatically provisioned** with Railway backend
- **Connection Details**: Available in Railway dashboard
- **Data Persistence**: All application data stored persistently
- **Backups**: Railway handles automatic backups

### 🐳 Docker (Local/Self-Hosted)

1. **Build Docker Images**
   ```bash
   docker build -t cu-campus-backend:latest ./backend
   docker build -t cu-campus-frontend:latest ./frontend
   ```

2. **Create docker-compose.yml** in project root:
   ```yaml
   version: '3.8'
   
   services:
     mysql:
       image: mysql:8.0
       environment:
         MYSQL_DATABASE: cu_campus
         MYSQL_USER: cu_user
         MYSQL_PASSWORD: cu_password
         MYSQL_ROOT_PASSWORD: root_password
       ports:
         - "3306:3306"
       volumes:
         - mysql_data:/var/lib/mysql
   
     backend:
       build: ./backend
       environment:
         DB_URL: jdbc:mysql://mysql:3306/cu_campus
         DB_USERNAME: cu_user
         DB_PASSWORD: cu_password
         JWT_SECRET: your-secret-key-min-32-chars
         CORS_ORIGINS: http://localhost:3000
       ports:
         - "8080:8080"
       depends_on:
         - mysql
   
     frontend:
       build: ./frontend
       environment:
         REACT_APP_API_BASE_URL: http://localhost:8080/api
       ports:
         - "3000:3000"
       depends_on:
         - backend
   
   volumes:
     mysql_data:
   ```

3. **Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **Access**:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8080`

### Manual Deployment (Linux/Ubuntu Server)

#### Backend
```bash
# SSH into your server
ssh user@your-server-ip

# Clone repository
git clone https://github.com/Vishvas0419/CU_Campus.git
cd "CU Campus Main/backend"

# Build JAR
mvn clean package -DskipTests

# Run with environment variables
export DB_URL=jdbc:mysql://localhost:3306/cu_campus
export DB_USERNAME=cu_user
export DB_PASSWORD=cu_password
export JWT_SECRET=your-secret-key-min-32-chars
export CORS_ORIGINS=https://your-domain.com

java -jar target/cu-campus-backend-0.0.1-SNAPSHOT.jar
```

#### Frontend
```bash
cd "CU Campus Main/frontend"

# Build
npm run build

# Install serve
npm install -g serve

# Run on port 3000
serve -s build -l 3000
```

#### Using systemd (Recommended for servers)

Create service file: `/etc/systemd/system/cu-campus-backend.service`

```ini
[Unit]
Description=CU Campus Backend
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/cu-campus
Environment="DB_URL=jdbc:mysql://localhost:3306/cu_campus"
Environment="DB_USERNAME=cu_user"
Environment="DB_PASSWORD=cu_password"
Environment="JWT_SECRET=your-secret-key"
Environment="CORS_ORIGINS=https://your-domain.com"
ExecStart=/usr/bin/java -jar /var/www/cu-campus/backend/target/cu-campus-backend-0.0.1-SNAPSHOT.jar
Restart=always

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable cu-campus-backend
sudo systemctl start cu-campus-backend
```

### Deployment Comparison

| Method | Cost | Ease | Scalability | Recommendation |
|--------|------|------|-------------|----------------|
| **Vercel + Railway** | Free tier available | ⭐⭐⭐⭐⭐ | Auto-scaling | ✅ **Best for production** |
| **Docker** | Depends on hosting | ⭐⭐⭐ | Manual scaling | Good for teams |
| **Manual VPS** | $5-20/month | ⭐⭐ | Limited | Learning/hobby projects |

---

## 📖 API Documentation Tools

Generate API docs with Springdoc OpenAPI:

```xml
<!-- Add to pom.xml -->
<dependency>
    <groupId>org.springdoc</groupId>
    <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
    <version>2.0.0</version>
</dependency>
```

Then access Swagger UI at: `http://localhost:8080/swagger-ui.html`

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add your feature"`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

### Code Guidelines
- Follow Java naming conventions (camelCase for variables, PascalCase for classes)
- Use DTOs for API responses
- Add JUnit tests for new features
- Document complex business logic with comments

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👥 Authors

- **Vishvas** - Initial development

## 📞 Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: [your-email@chitkara.edu.in]

---

## 🗺️ Roadmap

- [x] **Production Deployment** (Vercel + Railway)
- [x] **JWT Authentication**
- [x] **Role-Based Access Control**
- [ ] Mobile app (React Native)
- [ ] Email notifications for approvals
- [ ] SMS alerts for complaints
- [ ] Analytics dashboard with charts
- [ ] Performance optimization (Redis caching)
- [ ] Multi-language support (i18n)
- [ ] Advanced search filters
- [ ] Real-time notifications (WebSocket)
- [ ] Automated testing pipeline (CI/CD)

---

## 🎯 Test Credentials

### Development (Local)

**Admin Account**:
- Username: `admin`
- Password: `admin123`

**Warden Account**:
- Username: `warden1`
- Password: `warden123`
- Hostel: `Block A`

**Student Account**:
- Username: `student1`
- Password: `student123`
- Hostel: `Block A`

These are seeded automatically when the backend starts (see `DataSeeder.java`).

---

## ✨ Acknowledgments

- Chitkara University for the opportunity
- Spring Boot team for the excellent framework
- React community for amazing tools and libraries
- All contributors and testers

---

**Last Updated**: May 2026

For the latest updates, visit: [GitHub Repository](https://github.com/Vishvas0419/CU_Campus)
