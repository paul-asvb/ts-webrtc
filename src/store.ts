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
        return { session_id: "session_" + makeid(4), peer_id: "peer_" + makeid(4) }
    },

    actions: {
        set_session_id(session_id) {
            session_id
        },
        set_peer_id(peer_id) {
            peer_id
        },
    },
})