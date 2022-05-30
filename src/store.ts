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
        return { session_id: "session_" + makeid(4), peer_id: "peer_" + makeid(4), local_offer: {}, sessions: [], loading: false }
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
        }

    },
})