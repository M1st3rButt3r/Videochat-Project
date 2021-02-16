var currentlyCalled = -1;
var incomingCallId = -1;
var incomingCallPeerId = -1;

function call(id)
{
  if(incomingCallPeerId != null && id == incomingCallId)
  {
      connect(incomingCallPeerId);

      incomingCallId = -1;
      incomingCallPeerId = -1;
  }

    currentlyCalled = id;
    socket.emit("call", id, myPeer.id);


}

function incomingCall(id, peerid)
{
    if(currentlyCalled == id)
    {
        connect(peerid);
    }
    else
    {
        incomingCallId = id;
        incomingCallPeerId = peerid;
    }
}

function connect(peerid)
{
  var conn = myPeer.connect(peerid);
  // on open will be launch when you successfully connect to PeerServer
  conn.on('open', function(){
    // here you have conn.id
    console.log("Connection established with " + peerid)
  });
}

myPeer.on('connection', function(conn) {

});