const express = require("express");
const app = express();
const bodyParser = require("body-parser"); 
const cors = require('cors');
const adminWs = require("@holochain/conductor-api").AdminWebsocket;
const appWs = require("@holochain/conductor-api").AppWebsocket;
const { v4: uuidv4 } = require('uuid');

const SERVER_PORT = 5401;
const ADMIN_PORT = 3301;
const APP_PORT = 7401;
const APP_ID = uuidv4();
const internalChannel = {
  name: "channel 1",
  channel: { category: "General", uuid: uuidv4() }
};

app.use(express.static("public"));
app.use(bodyParser.json()); 
app.use(express.json());  
app.use(cors());

app.post('/getAgentKey', function(req, res) {
  var uuid = req.body;
  console.log(uuid);
  adminWs.connect(`ws://localhost:${ADMIN_PORT}`).then(admin => {
    admin.generateAgentPubKey().then(agentKey => {
      admin.installApp({
        app_id: APP_ID,
        agent_key: agentKey,
        dnas: [
          {
            path:
              "/Users/philipbeadle/holochain-rsm/elemental-chat/elemental-chat.dna.gz",
            nick: "Elemental Chat"
          }
        ]
      })
      .then(app => {
        const cellId = app.cell_data[0][0];
        admin.activateApp({ app_id: APP_ID }).then(() => {
          admin.attachAppInterface({ port: APP_PORT }).then(() => {
            appWs.connect(`ws://localhost:${APP_PORT}`).then(holochainClient => {
              holochainClient.callZome({
                cap: null,
                cell_id: cellId,
                zome_name: "chat",
                fn_name: "create_channel",
                provenance: agentKey,
                payload: internalChannel
              })
              .then(committedChannel => console.log(committedChannel))
              .catch(err => console.log("callZome", err));
            });
          })
          .catch(err => console.log("attachAppInterface", err));
        })
        .catch(err => console.log("activate", err));
      })
      .catch(err => console.log("install", err));
    })
  });
});

app.listen(SERVER_PORT, () => {
  console.log(`Example app listening at http://localhost:${SERVER_PORT}`);
});
