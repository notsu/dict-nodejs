# LINE Dictionary

LINE BOT for finding definition and synonyms from Oxford Dictionary.

## Installation

1. Open LINE application.
2. Scan the following QR code to add bot as your friend

![QR Code](dict-qrcode.png)

## Usage

- You can type any word and the system will find definition and synonyms for you

## Limitation

- Oxford allow the system to search only 60 keyword per minute and 3000 keyword per month. So, if you exceed that limit the system will notify you back by reply.
- The system allow you search only 10 time per minute. If you prefer to use more than this you can configure `limit` in configuration.

### Contribute

If you need to run this project in your local machine you need to following this step.

#### Prerequisite

- [Docker](https://www.docker.com/get-docker) for virtual environment for local machine.
- [ngrok](https://ngrok.com/) for expose your local machine to public when develop your bot.

#### Local development

1. Copy .env.example to .env
2. Setup your setting in .env
3. Run ngrok in separate terminal during development
4. Run `docker-compose up` at this folder to running docker for local development

PS. `Dockerfile` for deploy to any cloud such as Heroku, AWS, GCP, etc.