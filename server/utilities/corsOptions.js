export const corsOptions = {
    origin: [
        'https://tip-split.onrender.com',
        'http://localhost:3000',
        'https://www.getpostman.com'
    
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}