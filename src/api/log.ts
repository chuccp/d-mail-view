import request from '@/util/request'
import type { Page, Log } from '@/interface/System'

export async function fetchList(pageNo: Number, pageSize: Number, searchKey: string) {
  const vv = await request({
    url: '/log',
    params: {
      pageNo: pageNo,
      pageSize: pageSize,
      searchKey: searchKey
    }
  })
  return vv.data as Page<Log>
}

export async function fetchLogList(pageNo: Number, pageSize: Number) {
  return fetchList(pageNo, pageSize, '')
}

export async function getLog(id: number | string | string[]) {
  const vv = await request({
    url: '/log/' + id
  })
  return vv.data as Log
}

export async function download(file: string) {
  const vv = await request({
    url: '/downLoad',
    params: {
      file: file
    }
  })
  return vv.data
}
