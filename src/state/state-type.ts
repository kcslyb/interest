export type BaseSateType = {
    id?: string,
    createTime?: string,
    updateTime?: string,
    createBy?: string,
    updateBy?: string
}

export type QuerySateType = {
    keyWord: string,
    pageSize: string,
    pageNum: string
}

export type ResponseStateType = {
    code: number,
    data: any
}