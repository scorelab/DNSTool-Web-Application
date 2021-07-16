import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

const PrivateRoute = connectedRouterRedirect({
    redirectPath: '/login',
    authenticatedSelector: state => !state.firebase.auth.isEmpty,
    wrapperDisplayName: 'UserIsAuthenticated',
    //AuthenticatingComponent: <Spinner />
})

export default PrivateRoute