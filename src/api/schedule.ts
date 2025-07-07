import request from '@/util/request'
import type { Page,  Schedule } from '@/interface/System'


export async function fetchScheduleList(pageNo: Number, pageSize: Number) {

  const vv = await request({
    url: '/schedule', params: {
      pageNo: pageNo,
      pageSize: pageSize
    }
  })
  return vv.data as (Page<Schedule>)
}

export async function getSchedule(id: number | string | string[]) {
  const vv = await request({
    url: '/schedule/' + id
  })
  return vv.data as Schedule
}

export async function deleteSchedule(id: number | string | string[]) {
  const vv = await request({
    url: '/schedule/' + id, method: 'delete'
  })
  return vv.data
}

export async function postSchedule(schedule: Schedule) {
  const vv = await request({ url: '/schedule', method: 'post', data: schedule })
  return vv.data
}

export async function putSchedule(schedule: Schedule) {
  const vv = await request({ url: '/schedule', method: 'put', data: schedule })
  return vv.data
}

export async function sendMailBySchedule(schedule: Schedule) {
  const vv = await request({ url: '/sendMailBySchedule', method: 'post', data: schedule })
  return vv.data

}