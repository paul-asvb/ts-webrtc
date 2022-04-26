const button = document.getElementById('button');
button.addEventListener('click', createConnection);

let peerConnection;

async function createConnection() {
  console.log('Create RTCPeerConnection');
  const configuration = {};
  peerConnection = new RTCPeerConnection(configuration);
  peerConnection.addEventListener('icecandidate', e => onIceCandidate(peerConnection, e));
  peerConnection.addEventListener('iceconnectionstatechange', e => onIceStateChange(peerConnection, e));
  peerConnection.addEventListener('ondatachannel', e => onDataChannel(peerConnection, e));
  try {
    const offer = await peerConnection.createOffer({});
    await onCreateOfferSuccess(offer);
  } catch (e) {
    console.log(`Failed to create session description: ${e.toString()}`);
  }
}

function onDataChannel(pc, e) {
  const receiveChannel = e.channel;
  receiveChannel.onmessage = e => console.log("messsage received!!!" + e.data)
  receiveChannel.onopen = e => console.log("open!!!!");
  receiveChannel.onclose = e => console.log("closed!!!!!!");
  pc.channel = receiveChannel;
}

async function onCreateOfferSuccess(desc) {
  console.log(`Create Offer successfully`);
  console.log('pc1 setLocalDescription start');
  try {
    await peerConnection.setLocalDescription(desc);
    console.log(`peerConnection setLocalDescription complete`);
  } catch (e) {
    console.log("pc1 setLocalDescription error", e);
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

async function onIceCandidate(pc, event) {
  console.log("onIceCandidate0");
  try {
    await (getOtherPc(pc).addIceCandidate(event.candidate));
    console.log(`${getName(pc)} addIceCandidate success`);
  } catch (e) {
    console.log(`${getName(pc)} failed to add ICE Candidate: ${error.toString()}`);
  }
  console.log(`${getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
}

function onIceStateChange(pc, event) {
  if (pc) {
    console.log('ICE state change event: ', event);
    printJSON(pc);
  }
}


function printJSON(obj) {
  console.log(JSON.stringify(obj));
}