import CsStorage from "./cs-storage";

const AccountApi = {
    getAccountInfo: () => {
        return CsStorage.getInstance('USERINFO').queryPage({})
    }
}

export default AccountApi