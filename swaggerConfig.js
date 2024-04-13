const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'This is the API documentation for my application.',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Replace with your server URL
        description: 'Local server',
      },
    ],
    // Ajoutez d'autres configurations ici si nécessaire
  };
  
  module.exports = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./api/routes/*.js'], // Change this to the path where your route files are
    
  };
  