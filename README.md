# API Performance Monitor

This script measures various performance metrics for a given API URL, including DNS lookup time, TCP connection time, SSL handshake time, time to first byte (TTFB), response headers time, and total request time. It outputs the results in a human-readable format.

## Prerequisites

- **Node.js** (version 8.5.0 or higher) is required to run this script. You can download and install Node.js from [here](https://nodejs.org/).

## Installation

No installation is required apart from Node.js. Simply clone this repository and run the script.

```bash
git clone https://github.com/your-username/api-performance-monitor.git
cd api-performance-monitor
```

## Usage

1. Make sure you have **Node.js** installed on your system.
2. Save the script as `monitor.js` or any name you prefer.

3. Run the script with the following command:

```bash
node monitor.js
```

### Example:

To test the performance of `https://github.com`, you can use the following code (already provided in the script):

```javascript
const testUrl = "https://github.com";
measureApiPerformance(testUrl);
```

### Sample Output:

```
Metrics for https://github.com:
DNS Lookup time: 0.00 ms
TCP Connection time: 0.00 ms
SSL Handshake time: 0.00 ms
TTFB (Time to First Byte): 150.42 ms
Response Headers time: 25.32 ms
Response Body Size: 524288 bytes
HTTP Status Code: 200
Total Request Time: 176.32 ms
```

### Metrics Breakdown:
- **DNS Lookup time**: Time taken to resolve the domain name to an IP address.
- **TCP Connection time**: Time taken to establish the TCP connection.
- **SSL Handshake time**: Time taken for the SSL handshake during the secure connection.
- **TTFB (Time to First Byte)**: Time it takes for the server to send the first byte of the response after the request.
- **Response Headers time**: Time taken to receive the HTTP response headers.
- **Response Body Size**: The size of the body of the HTTP response in bytes.
- **HTTP Status Code**: The HTTP status code returned by the server (e.g., 200 OK, 404 Not Found).
- **Total Request Time**: The total time taken for the request to be processed and the full response (headers + body) to be received.
