import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

const AuthRoute = connectedRouterRedirect({
    redirectPath: '/verify-email',
    allowRedirectBack: false,
    authenticatedSelector: state => state.firebase.auth.isEmpty,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    //AuthenticatingComponent: <Spinner />
})

export default AuthRoute