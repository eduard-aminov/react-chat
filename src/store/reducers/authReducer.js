import API from '../../api/api'
import {setErrors, setIsFetching, setIsLogin, setIsRegistered, setToken} from '../actions'
import {SET_ERRORS, SET_IS_FETCHING, SET_IS_LOGIN, SET_IS_REGISTERED, SET_TOKEN} from '../types'

const initialState = {
    user: null,
    token: null,
    isLogin: null,
    isRegistered: false,
    isFetching: false,
    errors: []
}

const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_IS_LOGIN: {
            return {...state, isLogin: payload}
        }

        case SET_TOKEN: {
            return {...state, token: payload}
        }

        case SET_IS_REGISTERED: {
            return {...state, isRegistered: payload}
        }

        case SET_ERRORS: {
            if (state.errors.some(err => err.message === payload.message)) {
                return {...state, errors: [payload]}
            }
            return {...state, errors: [...state.errors, payload]}
        }

        case SET_IS_FETCHING:
            return {...state, isFetching: payload}
        default: return state
    }
}

export const register = (payload) => async (dispatch) => {
    dispatch(setIsFetching(true))
    const response = await API.register(payload)
    dispatch(setIsFetching(false))

    if (response.error) {
        console.log(response.error)
        dispatch(setErrors(response.error))
    } else {
        dispatch(setIsRegistered(true))
    }
}

export const login = (payload) => async (dispatch) => {
    dispatch(setIsFetching(true))
    const response = await API.login(payload)
    dispatch(setIsFetching(false))

    if (response.error) {
        console.log(response.error)
        dispatch(setErrors(response.error))
    } else {
        dispatch(setToken(response.data.token))
        dispatch(setIsLogin(true))
    }
}

export default authReducer