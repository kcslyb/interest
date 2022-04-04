export type BaseSateType = {
    id?: string,
    createTime?: string,
    updateTime?: string,
    createBy?: string,
    updateBy?: string
}

export type QuerySateType = {
    keyWord?: string,
    pageSize?: string,
    pageNum?: string
}

export type LogStateType = {
    id?: string,
    accessTime?: string,
    accessUserid: string,
    accessUserName: string,
    accessPath: string,
    accessPathLabel: string
}