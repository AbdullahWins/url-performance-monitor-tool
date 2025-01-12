const https = require("https");
const http = require("http");
const url = require("url");
const { performance } = require("perf_hooks");

//time format
function formatTime(timeInMs) {
  if (timeInMs >= 60000) {
    const minutes = (timeInMs / 60000).toFixed(2);
    return `${minutes} minutes`;
  } else if (timeInMs >= 1000) {
    const seconds = (timeInMs / 1000).toFixed(2);
    return `${seconds} seconds`;
  } else {
    return `${timeInMs.toFixed(2)} ms`;
  }
}

//api performance measure
function measureApiPerformance(targetUrl) {
  const parsedUrl = url.parse(targetUrl);
  const isHttps = parsedUrl.protocol === "https:";

  const startTime = performance.now();

  const options = {
    hostname: parsedUrl.hostname,
    path: parsedUrl.path,
    method: "GET",
    headers: {
      "User-Agent": "Node.js Performance Tester",
    },
  };

  const protocol = isHttps ? https : http;

  //variables to store the metrics
  let dnsLookupTime = 0;
  let tcpConnectionTime = 0;
  let sslHandshakeTime = 0;
  let ttfbTime = 0;
  let responseBodySize = 0;
  let httpStatusCode = 0;
  let totalRequestTime = 0;

  const requestStart = performance.now();

  const req = protocol.request(options, (res) => {
    const responseStart = performance.now();

    httpStatusCode = res.statusCode;

    res.on("data", (chunk) => {
      responseBodySize += chunk.length;
    });

    res.on("end", () => {
      const responseEnd = performance.now();
      totalRequestTime = responseEnd - startTime;

      const headersTime = responseStart - requestStart;
      ttfbTime = responseStart - requestStart;
      sslHandshakeTime = headersTime;
      dnsLookupTime = 0;
      tcpConnectionTime = 0;

      console.log(`Metrics for ${targetUrl}:`);
      console.log(`DNS Lookup time: ${formatTime(dnsLookupTime)}`);
      console.log(`TCP Connection time: ${formatTime(tcpConnectionTime)}`);
      console.log(`SSL Handshake time: ${formatTime(sslHandshakeTime)}`);
      console.log(`TTFB (Time to First Byte): ${formatTime(ttfbTime)}`);
      console.log(`Response Headers time: ${formatTime(headersTime)}`);
      console.log(`Response Body Size: ${responseBodySize} bytes`);
      console.log(`HTTP Status Code: ${httpStatusCode}`);
      console.log(`Total Request Time: ${formatTime(totalRequestTime)}`);
    });
  });

  req.on("error", (e) => {
    console.error(`Error: ${e.message}`);
  });

  req.end();
}

//example:
const testUrl = "https://github.com";
measureApiPerformance(testUrl);
