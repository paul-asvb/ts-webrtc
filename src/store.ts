import { defineStore } from "pinia";

export type Session = {
  name: string;
};

interface RTCSessionDescription {
  sdp?: string;
  type: RTCSdpType;
}

export type Peer = {
  peer_id: string;
  offer: RTCSessionDescription;
};

export type RootState = {
  session_id: string;
  peer_id: string;
  message: RTCSessionDescription | null;
  peer_conn: RTCPeerConnection;
  sessions: Session[];
  peers: Peer[];
  loading: boolean;
  send_channel: RTCDataChannel | null;
  recieve_channel: RTCDataChannel | null;
};

function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function ranNum() {
  return Math.floor(Math.random() * 1000);
}

const config = {
  iceServers: [
    {
      urls: "stun:stun1.l.google.com:19302",
    },
  ],
};

export const useSessionStore = defineStore("session", {
  state: () =>
  ({
    session_id: makeid(4),
    peer_id: makeid(4),
    message: null,
    peer_conn: new RTCPeerConnection(config),
    sessions: [],
    peers: [],
    loading: false,
    send_channel: null,
    recieve_channel: null,
  } as RootState),
  getters: {
    id: (state) => state.session_id,
  },
  actions: {
    async createConnection() {
      this.peer_conn.addEventListener("connectionstatechange", (e) => {
        console.log("connectionstatechange", e);
      });
      this.peer_conn.addEventListener(
        "icecandidate",
        (e: RTCPeerConnectionIceEvent) => {
          this.message = this.peer_conn.localDescription;
        }
      );

      this.send_channel = this.peer_conn.createDataChannel("sendChannel");
      this.send_channel.onmessage = (e) => console.log("channel message", e);
      this.send_channel.onopen = (e) => console.log("channel open");
      this.send_channel.onclose = (e) => console.log("channel closed");

      this.peer_conn.ondatachannel = (e: RTCDataChannelEvent) =>
        this.onDataChannel(e.channel);

      this.message = await this.peer_conn.createOffer();
      await this.peer_conn.setLocalDescription(this.message);
    },
    async loadRemoteOffer(offer: RTCSessionDescriptionInit) {
      await this.peer_conn.setRemoteDescription(offer);
      this.message = await this.peer_conn.createAnswer();
      this.peer_conn.setLocalDescription(this.message);
    },
    async loadRemoteAnswer(offer: RTCSessionDescriptionInit) {
      await this.peer_conn.setRemoteDescription(offer);
    },
    onDataChannel(c: RTCDataChannel) {
      this.recieve_channel = c;
      this.recieve_channel.onmessage = (e) => console.log("channel message", e);
      this.recieve_channel.onopen = (e) => console.log("channel open");
      this.recieve_channel.onclose = (e) => console.log("channel closed");
    },
    sendMessage(s: string) {
      console.log(s);
      this.send_channel?.send(s);
    },
    async loadSessions() {
      this.loading = true;
      try {
        this.sessions = await fetch(
          "https://webrtc-session.paul-asvb.workers.dev"
        ).then((r) => r.json());
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    async deleteSessions(id: string) {
      this.loading = true;
      try {
        await fetch("https://webrtc-session.paul-asvb.workers.dev/" + id, {
          method: "DELETE",
        });
        this.loadSessions();
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    useSession(session_id: string) {
      this.session_id = session_id;
      this.loadPeers(session_id);
    },
    async loadPeers(session_id: string) {
      this.loading = true;
      try {
        const peers = await fetch(
          "https://webrtc-session.paul-asvb.workers.dev/" + session_id
        ).then((r) => r.json());
        this.peers = peers;
      } catch (error) {
        console.log(error);
      }
      this.loading = false;
    },
    async pushOffer() {
      this.loading = true;
      let s = {
        peer_id: this.peer_id,
        offer: this.message,
      };
      await fetch(
        "https://webrtc-session.paul-asvb.workers.dev/" + this.session_id,
        {
          method: "POST",
          body: JSON.stringify(s),
        }
      ).catch(console.log);
      this.loadSessions();
      this.loading = false;
    }
  },
});
