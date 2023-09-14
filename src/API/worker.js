// this file helps process the large amounts of data from the API

self.onmessage = function (e) {
	console.log("Worker object present ", e);
	postMessage({ isLoading: true, data: null });

	let socket = new WebSocket("ws://localhost:8080");

	socket.onopen = function (e) {
		console.log("[open] Connection established");
		console.log("Sending to server");
		socket.send("I've arrived at the server");
	};

	socket.onmessage = function (event) {
		console.log(`[message] Data received from server: ${event.data}`);
	};

	socket.onclose = function (event) {
		if (event.wasClean) {
			console.log(
				`[close] Connection closed cleanly, code = ${event.code} reason=${event.reason}`
			);
		} else {
			// e.g. server process killed or network down
			// event.code is usually 1006 in this case
			console.log("[close] Connection died");
		}
	};

	socket.onerror = function (error) {
		console.log(`[error] ${error.message}`);
	};
};
