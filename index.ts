const startButton = document.getElementById("startButton");
startButton.addEventListener("click", createConnection);

var offerButton = document.getElementById("addOfferRemote");
offerButton.addEventListener("click", addRemoteOffer);

var offerButton = document.getElementById("loadSessions");
offerButton.addEventListener("click", loadSessions);

let peerConnection;

const config = {
  iceServers: [
    {
      urls: "stun:stun1.l.google.com:19302",
    },
  ],
};

async function createConnection() {
  console.log("Create RTCPeerConnection");
  peerConnection = new RTCPeerConnection(config);

  peerConnection.addEventListener("icecandidate", (e) =>
    onIceCandidate(peerConnection, e)
  );
  peerConnection.addEventListener("iceconnectionstatechange", (e) =>
    onIceStateChange(peerConnection, e)
  );

  const sendChannel = peerConnection.createDataChannel("sendChannel");
  sendChannel.onmessage = (e) => console.log("messsage received!!!" + e.data);
  sendChannel.onopen = (e) => console.log("open!!!!");
  sendChannel.onclose = (e) => console.log("closed!!!!!!");

  peerConnection.ondatachannel = (peerConnection, e) =>
    onDataChannel(peerConnection, e);

  try {
    const offer = await peerConnection.createOffer();
    await onCreateOfferSuccess(offer);
  } catch (e) {
    console.log(`Failed to create session description: ${e.toString()}`);
  }
}

function onDataChannel(pc, e) {
  const receiveChannel = e.channel;
  receiveChannel.onmessage = (e) =>
    console.log("messsage received!!!" + e.data);
  receiveChannel.onopen = (e) => console.log("open!!!!");
  receiveChannel.onclose = (e) => console.log("closed!!!!!!");
  pc.channel = receiveChannel;
}

async function onCreateOfferSuccess(desc) {
  try {
    await peerConnection.setLocalDescription(desc);
    document.getElementById("offerLocal").innerHTML = JSON.stringify(desc);
  } catch (e) {
    console.log("peerConnection setLocalDescription error", e);
  }

  // console.log('pc2 setRemoteDescription start');
  // try {
  //   await pc2.setRemoteDescription(desc);
  //   onSetRemoteSuccess(pc2);
  // } catch (e) {
  //   console.log("pc2 setLocalDescription error", e);

  // }

  // console.log('pc2 createAnswer start');
  // // Since the 'remote' side has no media stream we need
  // // to pass in the right constraints in order for it to
  // // accept the incoming offer of audio and video.
  // try {
  //   const answer = await pc2.createAnswer();
  //   await onCreateAnswerSuccess(answer);
  // } catch (e) {
  //   console.log(`createAnswer: ${e.toString()}`);
  // }
}

// async function onCreateAnswerSuccess(desc) {
//   console.log(`Answer from pc2:\n${desc.sdp}`);
//   console.log('pc2 setLocalDescription start');
//   try {
//     await pc2.setLocalDescription(desc);
//     onSetLocalSuccess(pc2);
//   } catch (e) {
//     onSetSessionDescriptionError(e);
//   }
//   console.log('pc1 setRemoteDescription start');
//   try {
//     await peerConnection.setRemoteDescription(desc);
//     onSetRemoteSuccess(peerConnection);
//   } catch (e) {
//     onSetSessionDescriptionError(e);
//   }
// }

async function loadSessions() {
  let res = await fetch("https://webrtc-session.paul-asvb.workers.dev", {
    mode: "no-cors", // 'cors' by default
  }).then(r=>r.json())
  console.log(res);
}

async function addRemoteOffer() {
  console.log("add remote offer");
  let offer = JSON.parse(document.getElementById("offerRemote").value);
  console.log(offer);

  try {
    await peerConnection.setRemoteDescription(offer);
    const ans = await peerConnection.createAnswer();
    peerConnection.setLocalDescription(ans);
  } catch (e) {
    console.log("setRemoteDescription error", e);
  }
}

async function onIceCandidate(pc, event) {
  console.log("onIceCandidate"); //, pc, event.candidate);
  document.getElementById("sdps").innerHTML = JSON.stringify(
    peerConnection.localDescription
  );

  // try {
  //   //await peerConnection.addIceCandidate(event.candidate);
  //   //console.log(`${getName(pc)} addIceCandidate success`);
  // } catch (e) {
  //   console.log(`Failed to add ICE Candidate: ${e.toString()}`);
  // }
  //console.log(`${getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
}

function onIceStateChange(pc, event) {
  if (pc) {
    console.log("ICE state change event: ", event);
    printJSON(pc);
  }
}

function printJSON(obj) {
  console.log(JSON.stringify(obj));
}
