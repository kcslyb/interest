class ZIndexManage {
    constructor( index = 1000) {
        this.index = index
    }
    static getInstance() {
        if (!ZIndexManage.instance) {
            ZIndexManage.instance = new ZIndexManage()
        }
        ZIndexManage.instance.index++
        return ZIndexManage.instance
    }
}

export default ZIndexManage