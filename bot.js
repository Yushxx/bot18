const request = require('request');
const fs = require('fs');
const http = require('http');
const TelegramBot = require('node-telegram-bot-api');
const token = '6519338782:AAHTEtx1UC0vcSnpk7gzv5hhUiv2jzj0snU';
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const welcomeMessage = `Bienvenue dans le programme hack de solkah. Veuillez joindre ces canaux avant de continuer :`;

    const opts = {
        parse_mode: 'Markdown',
        reply_markup: {
            inline_keyboard: [
                [
                    { text: 'Canal 1🤑', url: 'https://t.me/+xB2ooWeA55s3YWM0' },
                ],
                [
                    { text: 'Canal 2🚀', url: 'https://t.me/+77mQVHefoaA2NjU0' },
                ],
                [
                    { text: 'Check ✅', callback_data: 'check_join' }
                ]
            ]
        }
    };

    bot.sendMessage(chatId, welcomeMessage, opts);
});

bot.on('callback_query', async (callbackQuery) => {
    const message = callbackQuery.message;
    const data = callbackQuery.data;
    const userId = message.chat.id;

    if (data === 'check_join') {
        try {
            const channels = ['-1001923341484', '-1001594256026', '-1002017559099'];
            let isMemberOfAllChannels = true;

            for (const channel of channels) {
                const result = await bot.getChatMember(channel, userId);
                if (!(result.status === 'member' || result.status === 'administrator' || result.status === 'creator')) {
                    isMemberOfAllChannels = false;
                    break;
                }
            }

            if (isMemberOfAllChannels) {
                const replyMarkup = {
                    keyboard: [
                        [{ text: 'Obtenir un compte authentique ✅' }],
                        [{ text: 'Contacter l\'admis pro @medatt00' }],
                        [{ text: 'Démonstration 🔺' }]
                    ],
                    resize_keyboard: true,
                    one_time_keyboard: true
                };
                
                bot.sendMessage(message.chat.id, "Abonnement validé. Veuillez choisir un jeu:", {
                    reply_markup: {
                        inline_keyboard: [
                            [{ text: 'Apple of Fortune', url: 'http://t.me/game1x_bot/apple' }],
                            [{ text: 'Crash', url: 'http://t.me/game1x_bot/crash' }],
                            [{ text: 'Kamikaze', url: 'http://t.me/game1x_bot/kami' }]
                        ]
                    }
                });

                bot.sendMessage(message.chat.id, "aide 👇:", { reply_markup: replyMarkup });
            } else {
                bot.sendMessage(message.chat.id, "Veuillez rejoindre les canaux d'abord.");
            }
        } catch (error) {
            console.error(error);
            bot.sendMessage(message.chat.id, "Une erreur s'est produite lors de la vérification de l'adhésion.");
        }
    }
});

bot.on('message', (msg) => {
    const user_id = msg.from.id;
    request.post('https://solkah.org/ID/index6.php', { json: { user_id: user_id } }, (error, res, body) => {
        if (error) {
            console.error(error);
            return;
        }
        console.log(`statusCode: ${res.statusCode}`);
        console.log(body);
    });
});

bot.onText(/Obtenir un compte authentique ✅/, (msg) => {
    const chatId = msg.chat.id;
    const authentiqueMessage = `Pour obtenir un compte authentique, veuillez regarder cette vidéo:\n\n` +
        `Source : [Vidéo Authentique](https://t.me/gsgzheh/3)`;
    bot.sendMessage(chatId, authentiqueMessage);
});

bot.onText(/Contacter l'admis pro @medatt00/, (msg) => {
    const chatId = msg.chat.id;
    const proMessage = `Veuillez contacter l'administrateur:\n\n` +
        `Contact: @medatt00`;
    bot.sendMessage(chatId, proMessage);
});

bot.onText(/Démonstration 🔺/, (msg) => {
    const chatId = msg.chat.id;
    const demoMessage = `Pour voir la démonstration, veuillez regarder cette vidéo:\n\n` +
        `Source : [Vidéo Démo](https://t.me/gsgzheh/5)`;
    bot.sendMessage(chatId, demoMessage);
});

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write("I'm alive");
    res.end();
});

server.listen(8080, () => {
    console.log("Keep alive server is running on port 8080");
});
