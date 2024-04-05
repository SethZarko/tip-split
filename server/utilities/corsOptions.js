export const corsOptions = {
    origin: [
        'https://tip-split.onrender.com',
        'https://tip-split-1.onrender.com',    
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}