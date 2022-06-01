const config = {
    iceServers: [
        {
            urls: "stun:stun1.l.google.com:19302",
        },
    ],
};

export default function createWebRTC() {

    let peerConnection = new RTCPeerConnection(config);

    peerConnection.addEventListener("icecandidate", (e) => {
        //onIceCandidate(peerConnection, e)
        console.log(e);
    });

    peerConnection.addEventListener("iceconnectionstatechange", (e) => {
        //onIceStateChan console.log(e);ge(peerConnection, e)
        console.log(e);
    });

    const sendChannel = peerConnection.createDataChannel("sendChannel");
    sendChannel.onmessage = (e) => console.log("messsage received!!!" + e.data);
    sendChannel.onopen = (e) => console.log("open!!!!");
    sendChannel.onclose = (e) => console.log("closed!!!!!!");

    peerConnection.ondatachannel = (e) =>
        console.log(e);

    return peerConnection;
}   