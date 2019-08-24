# Personal Website / Portfolio

My personal website to show off both the cool code and words I've written.

## Development

When I swtiched to Windows in 2018, I moved development for this website to Docker. See `Dockerfile` and `docker-compose.yaml` for details.

### Commands

I've aliased a couple useful docker-compose commands as npm scripts inside `package.json`.

* `npm run dev-server`: spins up the local development server at http://127.0.0.1:4000 with live reloading and file watching.
* `npm run bash`: open a bash shell inside the Docker container, which is helpful for figuring out what's going on with Jekyll.