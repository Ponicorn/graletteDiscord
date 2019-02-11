const Discord = require('discord.js')
const config = require('./config.json')
const client = new Discord.Client()

client.on('ready', () => {
    console.log('Gralette is ready !')
})

client.on('message', (message) => {
    if (message.author.bot || !message.content.startsWith('/gralette')) return
    let channel = message.channel
    let contents = message.content.split(' ')
    contents.shift()
    
    let options = contents.filter(c => c.startsWith('-'))
    let roulettesChoice = contents.filter(c => !c.startsWith('-'))

    let tts = options.includes('-tts')
    let help = options.includes('-h') || options.includes('-help')
    let trinite = options.includes('-t')

    if (trinite) roulettesChoice = ['Burger King', 'Mac Donald\'s', 'Kentucky Fried Chicken']
    if (help){
        channel.send(`/gralette [ajouter toutes les choix séparé d'un espace]`) 
        channel.send(`   -t : Remplace tout les choix par la sainte trinité (BK/MCDO/KFC)`)
        channel.send(`   -h, -help : C'est l'aide mais honnêtement, c'est pas claire tout ça`)
        return
    } 
    if (roulettesChoice.length == 0) return channel.send(`Consulter "/gralette -h" pour voir comment la Gralette marche sur discord.`)

    let resultat = roulettesChoice[Math.floor(Math.random() * roulettesChoice.length)]
    lancerRoulette(channel, resultat, tts)
    
})

client.login(config.bottoken)


function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function lancerRoulette(channel, resultat, tts = false) {
    let phrasesDeMerde = config.phrasesDeMerde

    phrasesDeMerde = shuffle(phrasesDeMerde)

    let waitms = 1000
    wait(waitms)
        .then(() => {
            channel.send(phrasesDeMerde.pop())
            return wait(waitms)
        })
        .then(() => {
            channel.send(phrasesDeMerde.pop())
            return wait(waitms)
        })
        .then(() => {
            channel.send(phrasesDeMerde.pop())
            return wait(waitms)
        })
        .then(() => {
            channel.send(`La gralette a choisi !`)
            channel.send(`Aujourd'hui c'est ${resultat}`)
        })
}

// /gralette mcdo pizza kfc bk kebab