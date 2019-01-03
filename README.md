# <img src="https://cloud.githubusercontent.com/assets/120485/18661790/cf942eda-7f17-11e6-9eb6-9c65bfc2abd8.png" alt="Ghost" />

This repo demonstrates deployment of the [Ghost blogging
software](https://ghost.org/) to [Now](https://now.sh), [using Ghost as
an npm module](https://docs.ghost.org/docs/using-ghost-as-an-npm-module).

Additionally, it sets up a google cloud storage adapter (easy to swap out for another adapter), and a remote MySQL database (again, easy to swap out).

## Setting up

There are a few pre-steps to deploying this to now, due to technical constraints:

1. Change the content path in `config.development.json` to be the directory where you checked this project out, plus `/content`, for example `/home/beyonk/Projects/ghost-example/content`. This path *must* be absolute due to a bug in ghost v2.
1. Add your google cloud storage key to the root directory as `gcloud-storage-account.json`.
1. Run the application locally, just once, to migrate the DB (it can be slow the first time and break deployment).
1. Follow deployment instructions below.

## How to deploy

First, [download `now`](https://zeit.co/download).

Then, clone this
repository and run `now`:

```bash
$ git clone git://github.com/beyonk-adventures/now-ghost-v2
$ cd ghost
$ npm install
# Run the app first before the initial deployment, as the migrations can exceed now's timeout and cause a deployment error.
$ now
```

> Example: https://now-examples-ghost.now.sh/

You can tweak the `config.*` JSON files and `content` directory to your liking,
and then re-deploy by running `now` again.

### A note on Ghost database engines with Now

#### `sqlite3`

The file system on Now deployments is immutable. So knowing this, if you're
going to stick with the default `sqlite3` backend (which is file system
based) then you should follow the typical Now-deployment paradigm. That is:

 * Start Ghost up locally in development mode: `NODE_ENV=development npm start`
 * Write a blog post and publish it so that the local sqlite database is updated
 * Create a new Now deployment and re-alias your URL

This paradigm requires a new deployment for _any_ new blog posts or changes,
and when upgrading Ghost.

#### `mysql` and `postgres`

If you want to use a `mysql` or `postgres` database service, then you'll have
to update the config JSON files to point to an externally hosted database.
If you go this route then your Now deployment is more "live" such that you can
edit and publish posts without creating a new Now deployment, so the workflow
looks more like:

 * Edit the config JSON files to point to your database server
 * Create a Now deployment and re-alias your URL
 * At this point you can go to the admin panel on your Now deploment URL and make desired changes

This paradigm requires a new deployment only when upgrading Ghost, or tweaking
database settings. However, you end up losing some of the inherent features of
unique Now deployments, like being able to easily roll back a change or preview
changes before aliasing.
