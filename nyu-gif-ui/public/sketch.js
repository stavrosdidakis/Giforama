let socket;
let input, button, message;

function setup() {
  createCanvas(800, 700);

  input = createInput();
  input.position(60, 60);
  input.style('font-size', '32px');

  button = createButton('submit');
  button.position(420, 60);
  button.mousePressed(sendMessage);
  button.style('font-size', '32px');

  //Here we don't need to specify localhost, as Heroku will assign it itself
  socket = io.connect('http://localhost:5001');
  //socket = io(); //heroku
}

function sendMessage() {
  let textJSON = { searchWord: input.value() };
  let textJSONstringify = JSON.stringify(textJSON);
  console.log(textJSONstringify);
  socket.emit('saveEvent', textJSONstringify);
}
