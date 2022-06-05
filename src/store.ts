import { defineStore } from "pinia";
import createWebRTC from "./rtc";

export type Session = {
  name: string;
};

export type Peer = {
  peer_id: string;
  offer: RTCSessionDescriptionInit;
};

export type RootState = {
  session_id: string;
  peer_id: string;
  local_offer: RTCLocalSessionDescriptionInit;
  peer_conn: RTCPeerConnection;
  sessions: Session[];
  peers: Peer[];
  loading: boolean;
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

export const useSessionStore = defineStore("session", {
  state: () =>
    ({
      session_id: "ses" + ranNum(),
      peer_id: "p" + makeid(4),
      local_offer: "",
      peer_conn: createWebRTC(),
      sessions: [],
      peers: [],
      loading: false,
    } as RootState),
  getters: {
    id: (state) => state.session_id,
  },
  actions: {
    async createOffer() {
      this.local_offer = await this.peer_conn.createOffer();
    },
    async loadRemoteOffer(offer: RTCSessionDescriptionInit) {
      await this.peer_conn.setRemoteDescription(offer);
      this.local_offer = await this.peer_conn.createAnswer();
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
  },
});
