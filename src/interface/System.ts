export interface System {
  hasInit?: boolean
  hasLogin?: boolean
  isInit?: boolean
  port?: number
}

export interface SetInfo {
  hasInit?: boolean
  dbType?: string
  cachePath?: string
  reset?: boolean
  sqlite?: Sqlite
  mysql?: Mysql
  manage?: Manage
  api?: Api
}

export interface Manage {
  webPath?: string
  port: number | Number | string
  username?: string
  password?: string
  confirmPassword?: string
}

export interface Api {
  port: number | Number | string
}

export interface Pagination {
  total: Number
  current: Number
  pageSize: Number
}

export interface Page<T> {
  total?: Number
  list?: Array<T>
  current?: Number
  pageSize?: Number
  loading?: boolean
  selectedRowKeys?: Array<Number | string | undefined>
}

export interface SMTP {
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
  total: Number | number
  current: Number | number
  pageSize: Number | number
}

export interface Token {
  id?: Number | string | string[] | Number[]
  subject?: string
  token?: string
  receiveEmailIds?: any
  receiveEmails?: Array<Mail>
  SMTP?: Select
  SMTPSelectedTags?: Array<Select>
  mailSelectedTags?: Array<Select>
  SMTPId?: any
  isUse?: boolean
  SMTPStr?: string
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

export interface User {
  username?: string
  password?: string
}

export interface File {
  name?: string
  filePath?: string
}

export interface Log {
  id?: Number | string | string[] | Number[]
  name: string
  mail: string
  content: string
  smtp: string
  statusStr: string
  subject: string
  createTime?: Date
  createTimeStr: string
  fileArray: Array<File>
  files: string
  updateTime?: Date
  updateTimeStr: string
  status: number | Number
  result: string
}

export interface SendMail {
  SMTPId: Number | string
  recipients?: string[]
  subject?: string
  content: string
  SMTP?: string
}
export interface Header{
  name?: string
  value?: string
}
export interface Schedule {
  id?: Number | string | string[] | Number[]
  name?: string
  cron?: string
  status?: number | Number
  createTime?: Date
  updateTime?: Date
  token?: string
  url?: string
  method?: string
  body?: string
  headers: Header[]
  useTemplate?: boolean
  isUse?: boolean
  isSendOnlyByError?: boolean
  template?: string
}
