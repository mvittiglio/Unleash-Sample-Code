const express = require("express")
const { initialize } = require("unleash-client")
const app = express()
const port = 3031

const unleash = initialize({
  url: "<API_ENDPOINT_HERE>",
  appName: "my-node-name",
  instanceId: "my-unique-instance-id",
  refreshInterval: 1000,
  customHeaders: { Authorization: "<API_KEY_HERE>" },
})

app.get("/", (req, res) => {
  let flagName = "demo-bankingDemo"
  let featureEnabled = unleash.isEnabled(flagName)
  let flagDetail = {
    feature: flagName,
    enabled: featureEnabled,
  }

  if (featureEnabled) {
    /**
     * for a JSON payload of {r: 0, g: 0, b: 0}
     */
    let jsonVariation = unleash.getVariant(flagName)
    let variantAsJson = JSON.parse(jsonVariation.payload.value)
    console.log(`Red: ${variantAsJson.r}`)
    console.log(`Green: ${variantAsJson.g}`)
    console.log(`Blue: ${variantAsJson.b}`)
    flagDetail.payload = variantAsJson
  } else {
    console.log("Feature disabled")
  }

  res.status(200).json(flagDetail)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
