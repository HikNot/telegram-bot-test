const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const { User } = require("./db/models");
// // Bot token

dotenv.config();

const bot = new TelegramBot(process.env.TOKEN, { polling: true });

const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "Запуск бота" },
    { command: "/info", description: "Что умеет бот?" },
    { command: "/reg", description: "Регестрация" },
    { command: "/vpn", description: "Генерация ключа VPN" },
  ]);

  bot.on("message", async (msg) => {
    const { text } = msg;
    console.log(msg);
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/0eb/bdf/0ebbdf11-24fb-4e02-8fd0-b085d6d5401d/3.webp"
      );
      return bot.sendMessage(
        chatId,
        "Салам! Выбери то, что тебе нужно в пункте меню!"
      );
    }

    if (text === "/info") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/0eb/bdf/0ebbdf11-24fb-4e02-8fd0-b085d6d5401d/12.webp"
      );
      return bot.sendMessage(
        chatId,
        `Я пока что ничего не умею, но в скором времени исправлюсь. Держи шутку: Приходит муж к жене и говорит:
                    "Слушай, а может ты мне сегодня минет сделаешь?,
                    жена: "А может тебе еще и член отсосать?"`
      );
    }

    if (text === "/reg") {
      const user = await User.create({
        user_name: msg.from.username,
        user_id: msg.from.id,
      });

      console.log(user);
    }

    console.log(msg);
    return bot.sendMessage(
      chatId,
      "Я не понимаю тебя. Выбери команду из доступного списка!"
    );
  });
};

start();
