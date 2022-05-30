const config = {
    iceServers: [
        {
            urls: "stun:stun1.l.google.com:19302",
        },
    ],
};

export default async function createWebRTC(session: any) {

    let peerConnection = new RTCPeerConnection(config);

    // peerConnection.addEventListener("icecandidate", (e) =>
    //     //onIceCandidate(peerConnection, e)
    // );
    // peerConnection.addEventListener("iceconnectionstatechange", (e) =>
    //     //onIceStateChange(peerConnection, e)
    // );

    const sendChannel = peerConnection.createDataChannel("sendChannel");
    sendChannel.onmessage = (e) => console.log("messsage received!!!" + e.data);
    sendChannel.onopen = (e) => console.log("open!!!!");
    sendChannel.onclose = (e) => console.log("closed!!!!!!");

    // peerConnection.ondatachannel = (peerConnection, e) =>
    //     onDataChannel(peerConnection, e);

    try {
        const offer = await peerConnection.createOffer();
        session.$patch({ local_offer: offer })
    } catch (e) {
        console.log(`Failed to create session description: ${e.toString()}`);
    }

}