
//62162d74ff324b0caaa22640240912
//https://api.weatherapi.com/v1/forecast.json?q=cairo&days=3&key=62162d74ff324b0caaa22640240912


const searchInput = document.getElementById('findLocation')


searchInput.addEventListener('input',function(e){
    console.log(e.target.value)
    getWeather(e.target.value)
})

async function getWeather(cityName){
   if(cityName.length>2){
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${cityName}&days=3&key=62162d74ff324b0caaa22640240912`)
    // console.log(response)
    let data = await response.json()
    console.log(data)
    displayData(data)
   }

}

//Date

// let date = new Date('2025-6-30')

// console.log(date.getDate()) //يوم كام في الشهر

// console.log(date.getMonth()+1) //شهر كام في السنة

// console.log(date.getFullYear()) //يطبع السنة

// console.log(date.toLocaleString('en-us',{weekday:'long'})) //بيطبع اسم اليوم كامل
// console.log(date.toLocaleString('en-us',{weekday:'short'}))
// console.log(date.toLocaleString('en-us',{weekday:'narrow'}))

// console.log(date.toLocaleString('en-us',{month:'long'}))
// console.log(date.toLocaleString('en-us',{month:'short'}))
// console.log(date.toLocaleString('en-us',{month:'narrow'}))


function displayData(weatherData){
console.log(weatherData.forecast.forecastday)
let forecastArr = weatherData.forecast.forecastday;
let cartoona =''
for(let i=0;i<forecastArr.length;i++){
    let dayDate = new Date(forecastArr[i].date)
    // console.log(dayDate)
    let dayDateName = dayDate.toLocaleString('en-us',{weekday:'long'})
    let dayNum = dayDate.getDate()
    let monthName =dayDate.toLocaleString('en-us',{month:'long'})

    // console.log(dayDateName,dayNum,monthName)
    cartoona+=`
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="forecast-card p-4 rounded-3 ${i==1?'bg-custom-two':'bg-custom'} text-white h-100">
          <div class=" d-flex ${i==0?'justify-content-between':'justify-content-center'} mb-2">
          <div>${dayDateName}</div>
          <div>${i==0?dayNum+' '+monthName:''}</div>
          </div>
          <div>${i==0?weatherData.location.name:''}</div>
          <div class="d-flex flex-column ${i==0?'align-items-start':'align-items-center'}">
             <div class="fs-1 ${i==0?'':'order-2'}"><span id="todayTemp">${forecastArr[i].day.maxtemp_c}
             </span><sup>o</sup>C </div> 
              <div class="fs-5 ${i==0?'d-none':'d-block order-2'}"><span id="todayTemp">${i==0?'':forecastArr[i].day.mintemp_c}
             </span><sup>o</sup>C </div>
             
<div class="${i==0?'':'order-1'}">
                  <img src="https:${forecastArr[i].day.condition.icon}"  alt="" class='w-100'>

</div>               
         
        
          <div class="text-primary order-3" id="todayCondition">${forecastArr[i].day.condition.text}</div>
           </div>
        ${i==0?`  <img src="./images/icon-umberella.png" class="w-20 me-1" alt=""><span id="humidity">${weatherData.current.humidity}%</span>
          <img src="./images/icon-wind.png" class="w-20 me-1" alt=""><span id="wind-speed">${weatherData.current.wind_kph}km/h</span>
          <img src="./images/icon-compass.png" class="w-20 me-1" alt=""><span id="wind-dir">${weatherData.current.wind_dir}</span>`:''}
      
      </div></div>  
    `

}
document.getElementById('row-data').innerHTML = cartoona
}

if(navigator.geolocation){
   navigator.geolocation.getCurrentPosition(function(position){
    console.log(position)
    let lat = position.coords.latitude;
    let lon = position.coords.longitude
    getWeather(`${lat},${lon}`)
   })
}