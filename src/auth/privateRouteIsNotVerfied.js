import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

const PrivateIsNotVerifiedRoute = connectedRouterRedirect({
    redirectPath: state => state.firebase.auth.isEmpty ? 'login' : '/dashboard',
    allowRedirectBack: false,
    authenticatedSelector: state => !state.firebase.auth.isEmpty && !state.firebase.auth.emailVerified,
    wrapperDisplayName: 'UserIsAuthenticatedButNotVerified',
    //AuthenticatingComponent: <Spinner />
})

export default PrivateIsNotVerifiedRoute