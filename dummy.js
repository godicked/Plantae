let axios = require('axios')
axios.post('http://localhost:3000/plant/add', {sciName: 'Allium Porrum'})
.then((res) => {console.log(res.data)})
.catch(err => console.log('err'))

