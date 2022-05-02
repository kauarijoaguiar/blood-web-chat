const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './src/view');

app.use(express.urlencoded({
    extended: true,
}));

app.use(express.json());

const session = require('express-session');
app.use(session({
    secret: 'oeRf3fJ4eG3flxv30XvUcuOcDwoLyJtboDql',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
}))


app.use(express.static('public'));


app.get('*', (req, res, next) => {
    console.log(req.url)
    if (req.url != '/usuarios/login' && req.url != '/usuarios/cadastro' && req.url != '/grupos' && req.url != '/') {
        if (!req.session.usuario) {
            res.redirect('/usuarios/login')
        } else {
            next();
        }
    } else {
        next();
    }
})

app.get('/', (req, res) => {
    res.redirect('/grupos');
});

const usuariosRoutes = require('./routes/usuarios-routes');
app.use('/usuarios', usuariosRoutes);

const gruposRoutes = require('./routes/grupos-routes');
app.use('/grupos', gruposRoutes);

const mensagensRoutes = require('./routes/mensagens-routes');
app.use('/grupos', mensagensRoutes);

const usuariosgruposRoutes = require('./routes/usuariosgrupos-routes');
app.use('/usuariosgrupos', usuariosgruposRoutes);

app.use('*', (req, res) => {
    return res.status(404).send(`
        <h1>404 - NOT FOUND</h1>
    `);
})
const dbcon = require('./config/connection-db');
console.log(dbcon);

// const PORT = process.env.PORT;
// console.log({ PORT });
app.listen(3000, () => console.log(`Server iniciado na porta 3000`));