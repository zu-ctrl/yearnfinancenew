# iearn finance

App is based on [Create React App](https://github.com/facebook/create-react-app).

## NEW UI/UX IMPORTANT NOTES

### 1. Serverless functions

For fetching data from 2 another sources (`YvaultRoi` and `ApyTable` components) we used simple serverless functions — [Vercel functions](https://vercel.com/docs/serverless-functions/introduction). They're mostly the same as Netlify Functions, AWS Lambda, Google Cloud Functions or Cloudflare Workers. And also they can be easily reworked to become a part of ExpressJS app or similar.

Actually both functions are data scrapers, so for reduce latency and improve UX we've made also optional(!) Redis caching. You can add env variables by example to enable caching. If env variable `CACHING_ENABLED` is not equal `"true"` — caching will be disabled and each request to serverless functions will be fully processed.

`.env` file example to enable Redis caching for both serverless functions:

```
CACHE_EXPIRE="600"
REDIS_PASSWORD="supersecurepassword"
REDIS_DB="1"
REDIS_HOST="123.123.123.123"
REDIS_PORT="6379"
CACHING_ENABLED="true"
```

### 2. Theming

We made theming using MaterialUI library. Now we have 3 themes: Dark, Light and Waifu. Each from them has a specific theme file with invididual color scheme and props. Just need to follow unified theme files structure, to don't break any style.

### 3. i18n

We made internationalisation using i18next library and [DeepL](http://deepl.com/) translation service.
Script `translator.js` in root folder handles that.
First need to add DeepL API Key to your `.env` file:

```
DEEPL_API_KEY="myfavouritedeeplapikey"
```

Then update `/src/locales/en/translation.json` file with new static renderable strings.

And then — run `npm run i18n`. Script will translate all content from EN translation file to all available languages on DeepL and generate appropriated translation folders/files.

## How to use

### Main commands

```bash
$ npm run i18n # rebuilds all the translations based on EN translation using DeepL service

$ npm run start # starts the project to develop locally

$ npm run build # creates an optimized production build
```

### CRA basic commands

```bash
$ npm start
$ npm test
$ npm run build
$ npm run eject
```
