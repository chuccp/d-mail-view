export interface System {
    hasInit?: boolean
    hasLogin?: boolean
}

export interface SetInfo {
    hasInit?: boolean
    dbType?: string
    reset?: boolean
    sqlite?: Sqlite
    mysql?: Mysql
    admin?: Admin
}

export interface Pagination {
    total: Number,
    current: Number,
    pageSize: Number,
}

export interface Page<T> {
    total?: Number
    list?: Array<T>
    current?: Number
    pageSize?: Number
    loading?: boolean
    selectedRowKeys?: Array<Number | string | undefined>
}

export interface STMP {
    id?: Number | string | string[] | Number[]
    host?: string
    port?: Number
    mail?: string
    username?: string
    password?: string
    createTime?: Date
    updateTime?: Date
}

export interface Mail {
    id?: Number | string | string[] | Number[]
    name?: string
    mail?: string
    createTime?: Date
    updateTime?: Date

}

export interface Select {
    id?: Number | string | string[] | Number[]
    name?: string
}

export interface PageState {
    total: Number | number,
    current: Number | number,
    pageSize: Number | number,
}

export interface Token {
    id?: Number | string | string[] | Number[]
    subject?:string
    token?: string
    receiveEmailIds?: any
    receiveEmails?: Array<Select>
    STMP?:Select
    STMPSelectedTags?: Array<Select>
    mailSelectedTags?: Array<Select>
    STMPId?: any
    isUse?: boolean
    createTime?: Date
    updateTime?: Date
}


export interface Mysql {
    host?: String
    port?: Number
    dbname?: string
    username?: string
    password?: string
    charset?: string
}

export interface Sqlite {
    filename?: string
}

export interface Admin {
    username?: string
    password?: string
}