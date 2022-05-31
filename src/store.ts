import { defineStore } from 'pinia'



function makeid(length: number) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export const useSessionStore = defineStore('session', {
    state: () => {
        return { session_id: makeid(4) + "_s", peer_id: makeid(4) + "_p", local_offer: {}, sessions: [], peers: [], loading: false }
    },
    getters: {
        id: (state) => state.session_id,
    },
    actions: {
        async loadSessions() {
            this.loading = true;
            try {
                this.sessions = await fetch(
                    "https://webrtc-session.paul-asvb.workers.dev"
                ).then((r) => r.json());
            } catch (error) {
                console.log(error)
            }
            this.loading = false;

        },

        async deleteSessions(id: String) {
            this.loading = true;
            try {
                await fetch("https://webrtc-session.paul-asvb.workers.dev/" + id, {
                    method: "DELETE",
                })
                this.loadSessions();
            } catch (error) {
                console.log(error)
            }
            this.loading = false;
        },

        async loadPeers(session_id) {
            this.loading = true;
            try {
                const peers = await fetch("https://webrtc-session.paul-asvb.workers.dev/" + session_id).then(r => r.json())
                this.peers = peers;
            } catch (error) {
                console.log(error)
            }
            this.loading = false;
        }

    },
})