# FramegrabAPI

A powerful NestJS-based REST API for extracting still images from movies using FFmpeg. This application provides a clean architecture with domain-driven design principles for managing movies and extracting frame captures at specified intervals.

## 🎬 Features

- **Movie Management**: Create, read, update, and delete movie records
- **Still Frame Extraction**: Extract still images from movies at customizable intervals using FFmpeg
- **Database Integration**: PostgreSQL with Prisma ORM for data persistence
- **API Documentation**: Auto-generated Swagger/OpenAPI documentation
- **Docker Support**: Complete containerization with Docker Compose
- **Test Coverage**: Comprehensive unit and e2e testing
- **Clean Architecture**: Domain-driven design with clear separation of concerns

## 🏗️ Architecture

The project follows Clean Architecture principles with the following structure:

```
src/
├── modules/           # Domain layer (entities, use cases, repositories)
│   ├── movie/
│   └── still/
├── infra/            # Infrastructure layer
│   ├── database/     # Prisma ORM configuration and repositories
│   └── http/         # HTTP controllers, DTOs, and view models
└── utils/            # Shared utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- FFmpeg (for video processing)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Amoneleais/Framegrab.git
cd FramegrabAPI
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/framegrabapi"
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
```

4. Start the services with Docker Compose:

```bash
docker-compose up -d
```

5. Run database migrations:

```bash
npx prisma migrate dev
```

6. Start the development server:

```bash
npm run start:dev
```

The API will be available at `http://localhost:3000` and the Swagger documentation at `http://localhost:3000/api`.

## 📋 API Endpoints

### Movies

- **POST** `/movies` - Create a new movie
- **GET** `/movies` - Get all movies with pagination

### Stills

- **POST** `/stills/extract` - Extract still frames from a movie

#### Extract Stills Example

```bash
curl -X POST http://localhost:3000/stills/extract \
  -H "Content-Type: application/json" \
  -d '{
    "movieId": "movie-id-here",
    "interval": 5
  }'
```

## 🗄️ Database Schema

The application uses PostgreSQL with the following main entities:

### Movie

- `id` (String, Primary Key)
- `title` (String)
- `description` (String, Optional)
- `releaseDate` (DateTime)
- `rating` (Float, Optional)
- `path` (String) - File path to the movie
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Still

- `id` (String, Primary Key)
- `url` (String) - Path to the extracted image
- `timestamp` (Integer) - Time in seconds from movie start
- `movieId` (String, Foreign Key)
- `createdAt` (DateTime)

## 🧪 Testing

Run the test suite:

```bash
# Unit tests
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov

# E2E tests
npm run test:e2e
```

## 🐳 Docker

The project includes Docker configuration for easy deployment:

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d

# Stop services
docker-compose down
```

## 📚 Development

### Available Scripts

- `npm run start` - Start the production server
- `npm run start:dev` - Start development server with hot reload
- `npm run start:debug` - Start server in debug mode
- `npm run build` - Build the application
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Project Structure

```
├── src/
│   ├── modules/                    # Domain modules
│   │   ├── movie/
│   │   │   ├── entities/          # Domain entities
│   │   │   ├── factories/         # Entity factories
│   │   │   ├── repositories/      # Repository interfaces and implementations
│   │   │   └── useCases/          # Business logic use cases
│   │   └── still/
│   ├── infra/
│   │   ├── database/              # Database infrastructure
│   │   │   └── prisma/           # Prisma service and mappers
│   │   └── http/                 # HTTP infrastructure
│   │       └── modules/          # HTTP controllers and DTOs
│   └── utils/                    # Shared utilities
├── prisma/                       # Database schema and migrations
├── test/                         # E2E tests
└── docker-compose.yml            # Docker services configuration
```

## 🔧 Configuration

### Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `POSTGRES_USER` - Database username
- `POSTGRES_PASSWORD` - Database password

### FFmpeg Integration

The application uses FFmpeg for video processing. Ensure FFmpeg is installed and accessible in the system PATH. The extraction process:

1. Takes a movie file path and interval (in seconds)
2. Uses FFmpeg to extract frames at specified intervals
3. Saves extracted frames to the output directory
4. Stores frame metadata in the database

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Manoel Elias de Araujo Neto**

- Email: manoelaraujo24@gmail.com
- GitHub: [@Amoneleais](https://github.com/Amoneleais)

---

Made with ❤️ using NestJS, Prisma, and FFmpeg
