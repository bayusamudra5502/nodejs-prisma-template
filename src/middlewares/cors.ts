const cors = require('cors');

const corsOptions = {
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'OPTIONS', 'DELETE'],
};

export const corsMiddleware = cors(corsOptions);
