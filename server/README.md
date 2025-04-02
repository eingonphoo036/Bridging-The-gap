# Student Living Costs Application

A web application to help students compare living costs across different locations in the UK.

## Features

- User authentication (register/login)
- Profile management
- Price comparisons across different stores
- Location-based cost analysis

## Tech Stack

- Frontend: React.js with Material-UI
- Backend: Node.js with Express
- Database: MongoDB
- Authentication: JWT

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:
```bash
git clone <your-repository-url>
cd student-living-costs
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
```

4. Start the development server:
```bash
npm run dev
```

## Deployment

1. Set up environment variables on your hosting platform
2. Build the frontend:
```bash
npm run build
```
3. Start the production server:
```bash
npm start
```

## Security Considerations

- Never commit the `.env` file to version control
- Use strong passwords and keep them secure
- Regularly update dependencies
- Use HTTPS in production
- Implement rate limiting for API endpoints

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.