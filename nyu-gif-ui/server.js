let express = require('express');
let socket = require('socket.io');
let mqtt = require('mqtt')
let payload;

//Express becomes accessible through app
let app = express();
//Create a server on localhost:5001
let server = app.listen(process.env.PORT || 5001);
//Host content as static on public
app.use(express.static('public'));

console.log("Node is running on port 5001...");

//Allow server to use the socket
let io = socket(server);
//Dealing with server events / connection
//...when a new connection is on, run the newConnection function
io.sockets.on('connection', newConnection); //callback

//Setup MQTT settings
let options = {
  port: 1883,
	clientId: 'client-UI',
	username: "nyu-ima",
  password: "123456"
};
let client = mqtt.connect('mqtt://broker.mqttdashboard.com:8000', options);

//Function that serves the new connection
function newConnection(socket){
	console.log('New connection: ' + socket.id);

  //When a message arrives from the client, run the sendFunction
	socket.on('saveEvent', sendFunction);

  //This function will prepare the payload, and send the MQTT message
	function sendFunction(data){
    payload = data;
    client.publish('/nyu-ima-topic1/', String(payload), function() {
      console.log("Pushed: " + payload);
      //client.end(); // Close the connection when published
    });
		//console.log(data);
	}
}

//Function that runs when a message is received from MQTT (here, not used)
client.on('connect', function() { // When connected
  //Subscribe to a topic
  client.subscribe('/nyu-ima-topic1/', function() {
    //When a message arrives, do something with it
    //client.on('message', function(topic, message, packet) {
      //console.log("Received '" + message + "' on '" + topic + "'");
    //});
  });
});
