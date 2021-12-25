import BaseApi from "../api/base-api";
import {SET_ACCOUNT, QUERY_ACCOUNT} from "../mutation-types";

const account = {
    namespaced: true,
    state: () => ({
        account: {}
    }),
    mutations: {
        [SET_ACCOUNT](state, account) {
            state.account = account
        }
    },
    actions: {
        [QUERY_ACCOUNT]({commit}) {
            return new Promise((resolve, reject) => {
                BaseApi.queryAccountInfo().then(res => {
                    const temp = res.data.data || []
                    if (temp.length) {
                        commit(SET_ACCOUNT, temp[0])
                        resolve(temp[0])
                    } else {
                        reject()
                    }
                }).catch(e => reject(e))
            })
        }
    },
    getters: {
        [QUERY_ACCOUNT]: (state) => {
            return state.account
        }
    }
}

export default account