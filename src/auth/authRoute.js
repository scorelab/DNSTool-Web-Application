import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
const locationHelper = locationHelperBuilder({})

const AuthRoute = connectedRouterRedirect({
    redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/dashboard',
    allowRedirectBack: false,
    authenticatedSelector: state => state.firebase.auth.isEmpty,
    wrapperDisplayName: 'UserIsNotAuthenticated',
    //AuthenticatingComponent: <Spinner />
})

export default AuthRoute