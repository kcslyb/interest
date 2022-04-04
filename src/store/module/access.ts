import {SET_ACCESS, QUERY_ACCESS, CLEAN_ACCESS} from "../mutation-types";
import getStateServer from "../../state/state-serve";

const access = {
    namespaced: true,
    state: () => ({
        access: []
    }),
    mutations: {
        [CLEAN_ACCESS](state) {
            state.access = []
        },
        [SET_ACCESS](state, access) {
            state.access = [].concat(access, state.access)
        }
    },
    actions: {
        [SET_ACCESS]({commit}, data) {
            getStateServer('LogStateServe').save(data).then((res) => {
                commit(SET_ACCESS, [res])
            })
        },
        [QUERY_ACCESS]({commit}) {
            commit(CLEAN_ACCESS)
            getStateServer('LogStateServe').queryPage({}).then((res) => {
                commit(SET_ACCESS, res)
            })
        }
    },
    getters: {
        [QUERY_ACCESS]: (state) => {
            return state.access
        }
    }
}

export default access