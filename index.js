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
        "https://tlgrm.ru/_/stickers/fb8/e68/fb8e68b7-7df0-3022-bb2c-0bb6d745039e/1.webp",
      );
      return bot.sendMessage(
        chatId,
        "Привет! Выбери то, что тебе нужно в пункте меню!",
      );
    }

    if (text === "/info") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/fb8/e68/fb8e68b7-7df0-3022-bb2c-0bb6d745039e/22.webp",
      );
      return bot.sendMessage(
        chatId,
        `Привет, ${msg.from.username}!\nМеня зовут Генри ВПНов и я могу сгенирировать уникальный VPN ключ специально для тебя!\nДля того, чтобы я смог это сделать, нам нужно познакомитсья и тогда с смогу тебя узнавать :)\nДля этого нажми на команду /reg из списка команд\nПосле я смогу создать для тебя ключ VPN по нажатию на команду /vpn\nМне очень приятно с тобой познакомиться ^_^\nНадеюсь мы станем хорошими друзьями!\nЗа весь функционал спасибо @HikNot и @zaiden54`,
      );
    }

    if (text === "/reg") {
      const [user, created] = await User.findOrCreate({
        where: { user_name: msg.from.username, user_id: msg.from.id },
      });

      if (created) {
        await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/fb8/e68/fb8e68b7-7df0-3022-bb2c-0bb6d745039e/16.webp");
        return bot.sendMessage(chatId, `Добро пожаловать ${msg.from.username}\nВыбери из списка меню, что я могу сделать для тебя :)`);
      }
      await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/fb8/e68/fb8e68b7-7df0-3022-bb2c-0bb6d745039e/29.webp");
      return bot.sendMessage(chatId, `${msg.from.username}, Я рад снова тебя видеть!\nВыбери из списка команд, что я могу для тебя сделать`);
    }

    if (text === "/vpn") {
      const response = await fetch("/", {
        method: "GET",
      });
      const result = await response.json();
      console.log(result);
    }

    console.log(msg);
    await bot.sendSticker(chatId, "https://tlgrm.ru/_/stickers/fb8/e68/fb8e68b7-7df0-3022-bb2c-0bb6d745039e/65.webp");
    return bot.sendMessage(chatId, "Я не понимаю тебя. Выбери команду из доступного списка!");
  });
};

start();
