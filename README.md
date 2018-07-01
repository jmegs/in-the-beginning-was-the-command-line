# In the Beginning was the Command Line

I love Neal Stephenson's classic essay on how we relate to computers and operating systems, but couldn't find a version online that had a nice reading experience.

Note: I'm assuming since this is available freely online it's cool to present it here as long as the author is attributed. If I'm wrong, please let me know.

## To develop locally

1.  Install dependencies. Bask in stillness while it loads. Breathe deeply.

    ```sh
    yarn # or npm install
    ```

2.  Start the development server and look at your site on http://localhost:3000

    ```sh
    yarn start # or npm start
    ```

3.  When you're done. Build the project into dist/ and deploy it somewhere awesome.

    ```sh
    yarn build #or npm run build
    ```

The source text is in `site/content/_index.md`. CSS (with PostCSS next) and JS (webpack/babel) are in `assets/`
