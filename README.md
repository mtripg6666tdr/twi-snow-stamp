# ❄️ Snow-Stamp

I couldn't find a page anywhere that let you paste in a Twitter snowflake to get the timestamp.

So I made one.

👩‍💻 If you're a developer looking for the conversion code, check out [convert.js](src/convert.js)

## Special thanks

This project is a fork of [vegeta897/snow-stamp](https://github.com/vegeta897/snow-stamp) published under MIT license.
Special thanks to [vegeta897](https://github.com/vegeta897), the creator of the original Snow-Stamp Converter, and all contributor.

## Contribute

Pull requests and issues are welcome!

- Add me on Discord `うさみょん(myon2019)/mtripg6666tdr`

## Develop

1. `npm install && npm run dev`
2. Write code
3. `npm run format && npm run test`

## Deploy

You can deploy a static site or run the included server. The benefit of using the server is that links containing snowflakes will show the timestamp in embeds when posted on services like Discord.

For either deployment, you must first build:

`npm run build`

To deploy a static site, copy or host the contents of `/build`

Otherwise, start the server:

`npm start`

The server runs on port 3000 by default, but you can set `PORT` in your environment variables. You can create a `.env` file in root to set this variable.

### Custom Epoch

You can use a custom epoch instead of Twitter by setting environment variable `SNOWFLAKE_EPOCH` to the desired integer or with an `.env` file.

---

_Made with svelte_
