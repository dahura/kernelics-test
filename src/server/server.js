import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import bodyParser from 'body-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PORT = 3001;

const app = express();

// CORS middleware for test application
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.static(resolve(__dirname, '../client/build')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Исходные данные сотрудников - используем avatar вместо img для совместимости с клиентом
const employees = [
  {
    id: 1,
    name: 'John',
    status: 'Working',
    avatar: 'src/assets/avatar1.png'
  },
  {
    id: 2,
    name: 'Jack',
    status: 'Working',
    avatar: 'src/assets/avatar2.png'
  },
  {
    id: 3,
    name: 'Sheli',
    status: 'Working',
    avatar: 'src/assets/avatar3.png'
  },
  {
    id: 4,
    name: 'Eitan',
    status: 'Working',
    avatar: 'src/assets/avatar4.png'
  },
]

app.get('/users', (req, res) => {
  res.send(employees);
})

app.post('/users/:id', (req, res) => {
  const index = employees.findIndex((obj => obj.id === +req.params.id));
  employees[index].status = req.body.status;
  res.send(employees);
})

app.post('/users', (req, res) => {
  console.log('Получены данные:', req.body);
  
  const newEmployee = {
    id: employees.length + 1,
    name: req.body.name,
    status: req.body.status || 'Working',
    avatar: req.body.avatar || '/placeholder.svg?height=200&width=200'
  }
  
  employees.push(newEmployee);
  res.send(employees);
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`)
})

