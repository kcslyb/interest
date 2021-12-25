import CsStorage from "../../storage/cs-storage";

const BaseApi = {
    queryAccountInfo: () => {
        return CsStorage.getInstance('USERINFO').queryPage({})
    }
}

export default BaseApi