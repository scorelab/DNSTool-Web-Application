import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import Spinner from './spinner'

const PrivateRoute = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: state => !state.firebase.auth.isEmpty,
    wrapperDisplayName: 'UserIsAuthenticated',
    //AuthenticatingComponent: <Spinner />
})

export default PrivateRoute