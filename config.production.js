'use strict'

module.exports = {
    "url": "https://ghost-example.now.sh",
    "auth": {
        "type": "password"
    },
    "paths": {
        "contentPath": undefined
    },
    "logging": {
      "transports": ["stdout"]
    },
    "storage": {
      "active": "gcloud",
      "gcloud": {
        "projectID": "YOUR_GCP_PROJECT_ID",
        "keyFilename": "gcloud-storage-account.json",
        "bucket": "now-v2-test"
      }
    }
}
