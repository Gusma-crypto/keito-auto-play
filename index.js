import dotenv from 'dotenv';
import axios from 'axios';
import chalk from 'chalk';

dotenv.config();

const config = {
  uid: process.env.UID,
  baseUrl: "https://game.keitokun.com/api/v1",
  token: process.env.X_TOKEN,
  cookies: process.env.COOKIES,
  userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
  checkInterval: 60 * 1000,
  questCheckInterval: 5 * 60 * 1000,
  logLevel: 1
};

let gameState = {
  keitoAmount: 0,
  todayPlayTimes: 0,
  todayQuota: 0,
  todayRemainPlayTimes: 0,
  nextDrop: 0,
  states: "",
  lastCheck: 0
};

let userState = {
  uid: config.uid,
  nickName: "",
  address: "",
  keito: 0,
  level: 0
};

function generateHeaders(appkey) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  return {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.7",
    "appkey": appkey,
    "content-type": "application/json",
    "sec-ch-ua": '"Chromium";v="134", "Not:A-Brand";v="24", "Brave";v="134"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "timestamp": timestamp,
    "x-token": config.token,
    "cookie": config.cookies,
    "Referer": "https://game.keitokun.com/",
    "Referrer-Policy": "strict-origin-when-cross-origin"
  };
}

async function getGameInfo() {
  try {
    const response = await axios.get(`${config.baseUrl}/keito/getShowerInfo?uid=${config.uid}`, {
      headers: generateHeaders("c7a47223c7ca9fce4023b5835695e5c3")
    });
    if (response.data.code === 0) {
      gameState = { ...gameState, ...response.data.data };
      console.log(chalk.green("✅ Game info retrieved successfully"));
      return response.data.data;
    }
    console.error(chalk.red(`❌ Error getting game info: ${response.data.msg}`));
    return null;
  } catch (error) {
    console.error(chalk.red(`❌ Network error: ${error.message}`));
    return null;
  }
}

async function getUserInfo() {
  try {
    const response = await axios.get(`${config.baseUrl}/user/getUserInfo?uid=${config.uid}`, {
      headers: generateHeaders("3bb11df52672624496e4d5cdb7816390")
    });
    if (response.data.code === 0) {
      userState = response.data.data;
      console.log(chalk.green(`👤 User: ${userState.nickName}, 💰 Keito: ${userState.keito}, 🏆 Level: ${userState.level}`));
      return response.data.data;
    }
    console.error(chalk.red(`❌ Error getting user info: ${response.data.msg}`));
    return null;
  } catch (error) {
    console.error(chalk.red(`❌ Network error: ${error.message}`));
    return null;
  }
}

async function startGameLoop() {
  console.log(chalk.green("🚀 Starting game loop..."));
  while (true) {
    const info = await getGameInfo();
    if (!info || info.todayRemainPlayTimes <= 0) {
      console.log(chalk.yellow("⏳ Waiting for next available play..."));
      await new Promise(res => setTimeout(res, config.checkInterval));
      continue;
    }
    console.log(chalk.green("🎮 Playing game..."));
    await new Promise(res => setTimeout(res, 5000)); // Simulated play time
    console.log(chalk.green("✅ Game session completed"));
    await new Promise(res => setTimeout(res, config.checkInterval));
  }
}

async function initialize() {
  console.log(chalk.green("🚀 Keito Auto-Play Bot Initialized"));
  await getUserInfo();
  startGameLoop();
}

initialize();
