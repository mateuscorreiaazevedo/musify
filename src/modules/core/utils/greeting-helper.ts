import dayjs from 'dayjs'

let greeting = ''

function getGreetingTime () {
  const currentTime = dayjs()
  const currentHours = currentTime.hour()

  if (currentHours < 12) {
    greeting = 'Bom dia'
  } else if (currentHours > 12 && currentHours < 18) {
    greeting = 'Boa tarde'
  } else {
    greeting = 'Boa noite'
  }
}

getGreetingTime()

export default greeting
