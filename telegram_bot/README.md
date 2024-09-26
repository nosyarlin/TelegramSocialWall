# Getting Started
## Requirements
Python 3.12

## Install Dependencies
1. Create a python virtual environment using a method of your choice
2. Install python packages using
```
pip install -r requirements.txt
```

## Running The App
1. Make a copy of `.env.sample`, name it `.env` and fill it up with the right values. Then, make a symlink to the newly created `.env` file in the frontend directory so that you can share environment variables across the two services. Skip this step if you have already made a `.env` file in the frontend directory and created a symlink to it here.

Here's the symlink command for Linux and Mac:

```
ln .env ../frontend/
```

Here's the symlink command for Windows (run cmd as administrator):

```
mklink /h ..\frontend\.env .env
```

2. Be sure to start this service before running the React app. To start this service, run the command
```
python main.py
```
