const { time } = require('console')
const express = require('express')
const path = require('path')

const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'public'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use('/', (req, res) => {
    res.render('index.html')
})
var linhas = [{posX: 50, posY: 50, cor: 'white'},{posX: 55, posY: 55, cor: 'white'}]

io.on('connection', (socket) => { // Iniciar o protocolo socket
    console.log(`Socket Conectado  ${socket.id}`) // consultar o id 

    socket.on('desenhar', (linha) =>{

                    socket.broadcast.emit('desenhar', linha)
                     linhas.push(linha)
                     console.log(linha)


 

        // if (linha.posX !== 0 && linha.posY !== 0){
        //     socket.broadcast.emit('desenhar', linha)
        //     linhas.push(linha)
        //     console.log(linha)
        // }
    })
    // socket.broadcast.emit('historico', linhas)
})

server.listen(3000, (err)=>{
    if (err) console.log("Erro")
    console.log("Servidor rodando em - http://localhost:3000")
})


