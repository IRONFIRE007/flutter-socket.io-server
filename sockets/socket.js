const { io } = require("../index");
const Bands = require("../models/bands");
const Band = require("../models/band");
const bands = new Bands();

bands.addBand(new Band("Queen"));
bands.addBand(new Band("Nirvana"));
bands.addBand(new Band("AC/DC"));
bands.addBand(new Band("Heroes del Silencio"));

// console.log(bands);

io.on("connection", (client) => {
  console.log("Cliente Conectado");

  client.emit("active-bands", bands.getBands());

  client.on("disconnect", () => {
    console.log("Cliente Desconectado");
  });

  client.on("message", (payload) => {
    console.log("Message ", payload);
  });

  client.on("send-message", (payload) => {
    //  io.emit('new-message',payload);  //Send All Clients
    client.broadcast.emit("new-message", payload);
    //  console.log('new-message',payload);
  });

  client.on("vote-band", (payload) => {
    bands.voteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });

  client.on("delete-band", (payload) => {
    // console.log(payload.id);
    bands.deleteBand(payload.id);
    io.emit("active-bands", bands.getBands());
  });


  client.on("new-band", (payload) => {
    const newBand = new Band(payload.name);
    bands.addBand(newBand);
    // bands.addBand(new Band(payload.name));
    // console.log(payload.name);
     io.emit("active-bands", bands.getBands());
  });

  // io.emit("message", { admin: "New Message" });
});
