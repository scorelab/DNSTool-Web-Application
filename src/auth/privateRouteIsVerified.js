import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

const PrivateIsVerifiedRoute = connectedRouterRedirect({
    redirectPath: state => state.firebase.auth.isEmpty ? 'login' : '/verify-email',
    allowRedirectBack: false,
    authenticatedSelector: state => !state.firebase.auth.isEmpty && state.firebase.auth.emailVerified,
    wrapperDisplayName: 'UserIsAuthenticatedAndVerified',
    //AuthenticatingComponent: <Spinner />
})

export default PrivateIsVerifiedRoute