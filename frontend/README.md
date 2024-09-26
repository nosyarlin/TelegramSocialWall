# Getting Started

## Requirements

Node v20.11.0

## Install Dependencies

1. Follow the instructions on https://nodejs.org/en/download/package-manager and install Node
2. Open the frontend directory on your terminal
3. Install npm dependencies by running the following command

```
npm install
```

## Running The App

1. Make a copy of `.env.sample`, name it `.env` and fill it up with the right values. Then, make a symlink to the `.env` file in the telegram_bot directory so that you can share environment variables across the two services. Skip this step if you have already made a `.env` file in the telegram_bot directory and created a symlink to it here.

Here's the symlink command for Linux and Mac:

```
ln .env ../telegram_bot/
```

Here's the symlink command for Windows (run cmd as administrator):

```
mklink /h ..\telegram_bot\.env .env
```

2. Start the telegram_bot service

3. To include some pre-loaded well wishes onto the board (so that the board is not empty when the event starts), create a `WellWishes.csv` file in the `frontend\public` folder. The WellWishes.csv file should contain the headers `first name` and `well wishes`. 

4. Run the React app using

```
npm run dev
```

5. If you wish to run the app using test data, use this command instead (does not work on Windows):

```
npm run dev-faker
```
