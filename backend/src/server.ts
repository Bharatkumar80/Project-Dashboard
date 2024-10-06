import express from 'express';
import taskRoutes from './routes/taskRoutes';

const app = express();

app.use(express.json());
app.use('/api/tasks', taskRoutes);

// ... other configurations and route setups