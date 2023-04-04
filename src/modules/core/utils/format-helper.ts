import dayjs from 'dayjs'

export default {
  formatDuration: (value: number | string) => dayjs(value).format('mm:ss'),
  formatDate: (value: string) => dayjs(value).format('DD MMM. YYYY'),
  formatNumber: (value: number) => {
    return Intl.NumberFormat('pt-BR').format(value)
  }
}
