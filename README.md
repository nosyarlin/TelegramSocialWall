# About The Project

My friend is having a wedding and he wanted to add a social media wall to the wedding for their guests to post well wishes and photographs from the wedding. However, we were not able to find a good and affordable solution anywhere. So, being the software engineer that I am, I decided to code this social wall from _scratch_ instead of just paying for one :sob:.

# Built With

![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)
![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white)

# Project Structure

- frontend:
  Contains a React app that is used to display the telegram wall

- telegram_bot:
  Contains the telegram bot code to receive messages and pass them along to the React app

# Getting Started

1. Create your own telegram bot using the instructions [here](https://core.telegram.org/bots/tutorial)

2. Start the telegram_bot service (see the README.md file inside the telegram_bot directory)

3. Start the React app (see the README.md file inside the frontend directory)

4. After authenticating with the password, guests will be able to send messages and photos directly to the board

5. By the end of your event, the messages and photos sent to the board will be saved in the `telegram_bot\messages` folder
