const ghost = require('ghost')
const express = require('express')
const { join } = require('path')

const config = require(join(__dirname, 'config.production.js'))
config.paths.contentPath = join(__dirname, 'content')

async function bootstrap () {
  const server = express()
  const ghostServer = await ghost({ config })
  server.use('/', ghostServer.rootApp)
  ghostServer.start(server)
}

bootstrap()