# Personal Website and Portfolio

My personal website to show off the cool code and words I've written.

## Development

When I swtiched to Windows in 2018, I moved development for this website to Docker. See `Dockerfile` and `docker-compose.yaml` for details.

### Commands

I've aliased a couple useful docker-compose commands as npm scripts inside `package.json`.

* `npm run dev-server`: spins up the local development server at http://127.0.0.1:4000 with live reloading and file watching.
* `npm run bash`: open a bash shell inside the Docker container, which is helpful for figuring out what's going on with Jekyll.
* `npm run pub-ubc`: publish the published site, files in `_site`, to the public html directory on https://cs.ubc.ca.

## Updating
I keep facsimiles this site running on a couple different domains.

### GitHub Pages
To update the version on GitHub Pages, just commit to the `master` branch.

### University of British Columbia
An identical version of this website exists on the [UBC CS domain](https://cs.ubc.ca/~kasica). The command `npm run pub-ubc` actually pushes code to this repository.