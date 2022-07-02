const dateNow = new Date()
dateNow.setHours(dateNow.getHours() - (dateNow.getTimezoneOffset() / 60))

console.log(dateNow)