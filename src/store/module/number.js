import BallApi from "../api/ball-api";
import {QUERY_BALL, SET_BALL} from "../mutation-types";

const number = {
    namespaced: true,
    state: () => ({
        ball: {
            redBall: [],
            basketBall: []
        }
    }),
    mutations: {
        [SET_BALL](state, ball) {
            state.ball = ball
        }
    },
    actions: {
        [QUERY_BALL]({commit}) {
            BallApi.queryBall().then(ball => {
                commit(SET_BALL, ball)
            })
        }
    },
    getters: {
        ball: (state) => {
            return state.ball
        },
        redBall: (state) => {
            return state.ball.redBall
        },
        basketBall: (state) => {
            return state.ball.basketBall
        }
    }
}

export default number