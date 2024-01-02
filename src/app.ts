import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express()

// perser 
app.use(express.json());
app.use(cors());

// app routes 
app.use('/api/users', UserRoutes)

app.get('/', (req: Request, res: Response) => {
  
  res.send("Mongoose Express CRUD Mastery Assignment Server is running")
})

export default app;




