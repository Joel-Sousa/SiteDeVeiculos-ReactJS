import {Http} from '../../config/Http'
import {changeLoading} from './loading.action'
import {changeNotify} from './notify.action'

export const actionTypes = {
    CHANGE: 'REGISTER_CHANGE',
    ERROR: 'REGISTER_ERROR',
    SUCCESS: 'REGISTER_SUCCESS'
}

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
})

export const error = (payload) => ({
    type: actionTypes.ERROR,
    payload
})

export const success = (payload) => ({
    type: actionTypes.SUCCESS,
    payload
})

export const setUserToken = token => dispatch => {
    localStorage.setItem('access_token', token)
    dispatch(change({
        name: '',
        email: '',
        password: ''
    }))

    dispatch(success(true))
}

export const register = data => dispatch => {
    dispatch(changeLoading({
        open: true,
        msg: 'Cadastrando usuario...'
    }))

    return Http.post('/register', data)
        .then(res => {
            dispatch(changeLoading({open: false}))
            if(typeof res !== 'undefined'){
                if(res.data.access_token){
                    dispatch(changeNotify({
                        open: true,
                        class: 'success',
                        msg: 'Usuario cadastrado com sucesso.'
                    }))

                    dispatch(setUserToken(res.data.access_token))
                }
            }
        })
        .catch(err => {
            dispatch(changeLoading({open: false}))
            if(err.response){
                dispatch(error(err.response.data.error))
            }
        })
}