import Api from '@/services/Api'

export default {
    login (userData) {
        return Api().post('/api/auth/', userData)
    }
}