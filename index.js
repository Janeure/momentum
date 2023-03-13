
const langEN = {
  'greetingEn': ['Good night,', 'Good morning,', 'Good afternoon,', 'Good evening,'],
  'namePlaceholder': "[Enter name]",
  'dateLan' : 'en-US',
  'cityPlaceholder' : '[Enter city]',
  'weatherLan' : ['Minsk', 'Wind speed:', 'm/s', 'Humidity:', 'Hmmm... Error', 'not found'],
  'weatheCity' : 'en',
  'setLan' : ['Language', 'Widgets', 'English', 'Русский', 'Time', 'Date', 'Greeting', 'Quotes', 'Weather', 'Music', 'Todo-list', 'Background', 'GitHub', 'Unsplash API', 'Flickr API', 'Enter your tags'],
  'todoLan' : ['TODO list', 'New Todo', 'Save', 'Clear', '*right click - delete item'],
}

const langRU =  {
  'greetingEn': ['Доброй ночи,', 'Доброе утро,', 'Добрый день,', 'Добрый вечер,'],
  'namePlaceholder': "[Введите имя]",
  'dateLan' : 'ru-RU',
  'cityPlaceholder' : '[Введите город]',
  'weatherLan' : ['Минск', 'Скорость ветра:', 'м/с', 'Влажность:', 'Хмм... Ошибка', 'не найден'],
  'weatheCity' : 'ru',
  'setLan' : ['Язык', 'Виджеты', 'English', 'Русский', 'Время', 'Дата', 'Приветствие', 'Цитата дня', 'Погода', 'Музыка', 'Список задач', 'Фоновое изображение', 'GitHub', 'Unsplash API', 'Flickr API', 'Введите свой тег'],
  'todoLan' : ['Список задач', 'Новая задача', 'Сохранить', 'Очистить', '*клик правой кнопкой мыши - удалить элемент'],
}

//перевод стр при перезагр стр
let langTr = langEN;
let linkQuote = './data.json';

if (localStorage.getItem('translate')=== 'rus') {
  langTr = langRU;
  document.querySelector('.name').placeholder = langRU.namePlaceholder;
  document.querySelector('.city').placeholder = langRU.cityPlaceholder;
  document.querySelector('#lang-en').checked = false;
  document.querySelector('#lang-ru').checked = true;
  linkQuote = './dataRu.json';
  // localStorage.setItem('translate', 'rus');
}


//point1,Часы и календарь start
const time = document.querySelector('.time');
const data = document.querySelector('.date');

const showTime = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    showDate(langTr);
    getTimeOfDays(langTr);
    setTimeout(showTime, 1000);
};

function showDate(langTr) {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString(langTr.dateLan, options).split(/\s+/).map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
  data.textContent = currentDate;
  // console.log(date)
}
showTime();
//point1, Часы и календарь end




//point2, приветствие start

 function getTimeOfDays(langTr) {
  const dayMess = new Date();
  let h = dayMess.getHours();
  // console.log(h)
   let message;
  if(h >= 6 && h < 12) {
    message = langTr.greetingEn[1];
 } else if(h >= 12 && h < 18) {
   message = langTr.greetingEn[2];
   document.querySelector('.greeting-container').style.paddingLeft = 432 + 'px';
 } else if(h >= 18 && h < 24){
   message = langTr.greetingEn[3];
 } else if(h >= 0 && h < 6){
   message = langTr.greetingEn[0];
   document.querySelector('.greeting-container').style.paddingLeft = 515 + 'px';
 } 
 greeting.innerHTML = message;
 }


//point2, приветствие end


//point2, input start

function persistInput(input) {
  var key = 'input-value';  //название переменной в локСт
  var inputValue = localStorage.getItem(key); //получаем из локСт значение
  if (inputValue)
      input.value = inputValue;   //если задано значение, то присвоить его инпуту
  input.addEventListener('input', function (){  //слушатель на ввод 
      localStorage.setItem(key, input.value); //сохр значение инпут
  });
}
var element = document.getElementById('name'); //получили узел
persistInput(element); //вызов функции
//point2, input end



//point3, slider start
function getTimeOfDay(){
  const dataNowSlider = new Date();
  const dataSlider = dataNowSlider.getHours();
 
if(dataSlider >= 0 && dataSlider < 6) {
   return 'night';
} else if(dataSlider >= 6 && dataSlider < 12){
  return'morning';
} else if(dataSlider >= 12 && dataSlider < 18) {
  return 'afternoon';
} else if(dataSlider >= 18 && dataSlider < 24){
  return 'evening';
} 
}

function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}

let randomNum = getRandomNumber(1, 20);

function setBg(){
  const timeOfDay = getTimeOfDay()
  const bgNum = randomNum.toString().padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Janeure/momentum-backgrounds/main/${timeOfDay}/${bgNum}.webp`;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  }; 
}

const arrowPrev = document.querySelector('.slide-prev');
const arrowNext = document.querySelector('.slide-next');

  function getSlideNext() {
    if(randomNum === 20) {
      randomNum = 1;
    } else{
      randomNum = randomNum + 1;
       console.log(randomNum)
    }
    setBg()
   }
   arrowNext.addEventListener('click', getSlideNext);


    function getSlidePrev() {
     if(randomNum === 1) {
      randomNum = 20;
      console.log(randomNum)
      } else{
        randomNum = randomNum - 1;
         console.log(randomNum)
      }
      setBg()
    }
    arrowPrev.addEventListener('click', getSlidePrev);

    if (localStorage.getItem('back-set') === null || localStorage.getItem('back-set') === 'gi'){
      setBg()
    }
//point3, slider end


//point4, the weather start
 let city = document.querySelector('.city');
async function getWeather(langTr) {  
  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');
  const error = document.querySelector('.weather-error')

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${langTr.weatheCity}&appid=10609ce84fc1c09790dd1912e33915ef&units=metric`;
  const res = await fetch(url);
  const data = await res.json(); 
 
  
  if (data.cod === 200 ){
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.floor(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `${langTr.weatherLan[1]} ${Math.floor(data.wind.speed)} ${langTr.weatherLan[2]}`;
    humidity.textContent = `${langTr.weatherLan[3]} ${Math.floor(data.main.humidity)}%`;
    error.textContent = '';
} else {
  error.textContent = `${langTr.weatherLan[4]} ${data.cod}. ${city.value} ${langTr.weatherLan[5]}`;
  weatherIcon.className = 'weather-icon';
    humidity.textContent = '';
    weatherIcon.innerHTML = '';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
}
}

city.addEventListener('change', () => {
  getWeather(langTr, city.value)
  setLocalStorage();
})

function setLocalStorage() {
  localStorage.setItem('city', city.value);
}

function getLocalStorage() {
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else {
        city.value = langEN.weatherLan[0];
      }
      getWeather(langTr)
}
window.addEventListener('load', getLocalStorage)

// console.log(res)
// console.log(data)
// console.log(data.weather[0].id, data.weather[0].description, Math.floor(data.main.temp), Math.floor(data.wind.speed), Math.floor(data.main.humidity), data.cod);
//point4, the weather end



//point5, цитата дня start

function getRandomQuery(min, max){
  return Math.floor(Math.random() * (max + 1 - min)) + min;
}
let randomQue = getRandomQuery(0, 49);
 console.log(randomQue)

async function getQuotes() {  
  const author = document.querySelector('.author');
  const quote = document.querySelector('.quote');
  const quotes = linkQuote;
  // console.log(quotes.length)
  const resQ = await fetch(quotes);
  const data = await resQ.json(); 
  quote.innerHTML = data[randomQue].text;
  author.innerHTML = data[randomQue].author;
}
 getQuotes();

// window.addEventListener('load', getQuotes())

  function getQueNext() {
if(randomQue === 49) {
   randomQue = 0;
} else {
  randomQue = randomQue + 1;
}
      //  console.log(randomQue)
    
    getQuotes()
   }

   document.querySelector('.change-quote').addEventListener('click', getQueNext)

//point5, цитата дня end




//point6,7 audio start
const playList = [
  {      
    title: 'Aqua Caelestis',
    src: './assets/sounds/Aqua Caelestis.mp3',
    duration: '00:40'
  },  
  {      
    title: 'River Flows In You',
    src: './assets/sounds/River Flows In You.mp3',
    duration: '01:37'
  },
  {      
    title: 'Summer Wind',
    src: './assets/sounds/Summer Wind.mp3',
    duration: '01:50'
  },
  {      
    title: 'Ennio Morricone',
    src: './assets/sounds/Ennio Morricone.mp3',
    duration: '01:37'
  },
]

let isPlay = false;
const playBtn = document.querySelector('.play');
const NextBtn = document.querySelector('.play-next');
const PrevBtn = document.querySelector('.play-prev');
const audio = new Audio();
const playListContainer = document.querySelector('.play-list');
let trackTime = 0;
 

playList.forEach(el => {
  const li = document.createElement('li');
li.classList.add('play-item');
// li.textContent = el.title;
li.innerHTML = `<button class ='small-play'></button> ${el.title}`;
playListContainer.append(li);
})

const aaa = document.querySelectorAll('.play-item');
const bbb = document.querySelectorAll('.small-play');
console.log(bbb)
let numAudio = 0;
let setInt = null;


//вывод текущего времени и движение ползунка
  const audioLine = (time) => {
    let minutes = Math.floor((time / 60));
    let seconds = Math.floor(time - (minutes * 60));
    if (seconds < 10) {
      seconds = `0${seconds}`;
    };
    if (minutes < 10) {
      minutes = `0${minutes}`;
    };
    return `${minutes}:${seconds}`;
  };

  const updateTimeAndSeekAudio = () => {
    document.querySelector('#progress-audio').max = audio.duration;
    document.querySelector('#progress-audio').value = audio.currentTime;
    const seekBarValue = audio.currentTime / audio.duration * 100 + 0.5;
    document.querySelector('#progress-audio').style.background = `linear-gradient(to right, #fe8daa 0%, #fe8daa ${seekBarValue}%, #ffffff ${seekBarValue}%, #ffffff 100%)`;

    document.querySelector('.timeline').innerHTML = audioLine(Math.floor(audio.currentTime));
    }

//вкл трек
function playAudio() {
  if(isPlay === false){
    audio.src = playList[numAudio].src;
    document.querySelector('.player-song').innerHTML = playList[numAudio].title
    document.querySelector('.duration').innerHTML = playList[numAudio].duration
    audio.currentTime = trackTime;
    audio.play();
    console.log(audio.currentTime)
    isPlay = true;
    playBtn.classList.add('pause');
    bbb[numAudio].classList.add('small-stop')
    setInt = setInterval(updateTimeAndSeekAudio, 500)


    aaa[numAudio].classList.add('item-active')
    aaa[numAudio - 1].classList.remove('item-active')

   

  } else{
    trackTime = audio.currentTime;
    audio.pause();
    isPlay = false;
    playBtn.classList.remove('pause');
    aaa[numAudio].classList.remove('item-active')
    bbb[numAudio].classList.remove('small-stop')
    
  }
}



audio.addEventListener('ended', () => {
  if(numAudio === 3){
    numAudio = 0;
    aaa[3].classList.remove('item-active')
    bbb[3].classList.remove('small-stop')
    // numAudio = 0;
  } else {
    numAudio = numAudio + 1;
    bbb[numAudio-1].classList.remove('small-stop')
  }
  isPlay = false;
  trackTime = 0;
  playAudio()
})

playBtn.addEventListener('click', () => {
  
  playAudio()

});

NextBtn.addEventListener('click', () => {
  if(numAudio === 3){
    aaa[numAudio].classList.remove('item-active')
    numAudio = 0;
    bbb[3].classList.remove('small-stop')
  } else {
  numAudio = numAudio + 1;
  bbb[numAudio].classList.add('small-stop')
  bbb[numAudio-1].classList.remove('small-stop')
  }
  trackTime = 0;
  isPlay = false;
  playAudio(numAudio)
})


PrevBtn.addEventListener('click', () => {
  if(numAudio === 0){
    numAudio = 3;
    aaa[3].classList.add('item-active')
    aaa[0].classList.remove('item-active')
    bbb[0].classList.remove('small-stop')

  } else {
  numAudio = numAudio - 1;
  aaa[numAudio].classList.add('item-active')
  aaa[numAudio + 1].classList.remove('item-active')
  bbb[numAudio].classList.add('small-stop')
  bbb[numAudio+1].classList.remove('small-stop')
  }
  trackTime = 0;
  isPlay = false;
  playAudio(numAudio)
})


//откл звук полностью
let isVolume = false;
const soundIcons = document.querySelector('.sound-icons');
soundIcons.addEventListener('click', ()=> {
  soundIcons.classList.toggle('mute')
  if(isVolume === false) {
    isVolume = true;
    audio.volume = 0;
    document.querySelector('#progress-sound').value = 0;
  } else if(isVolume === true){
    audio.volume = 0.5;
    isVolume = false;
    document.querySelector('#progress-sound').value = 0.5;
  }
})

//громкость менять
let volumeValue = 0.5;
const volumeMute = () => {
  if (audio.muted == false) {
    audio.muted = true;    
    soundIcons.classList.add('mute');

    document.querySelector('#progress-sound').value = 0;
    document.querySelector('#progress-sound').style.background = `linear-gradient(to right, #ffffff 0%, #ffffff 100%)`;
  } else {
    audio.muted = false;
    soundIcons.classList.remove('mute');
    
    document.querySelector('#progress-sound').value = volumeValue;
    audio.volume = volumeValue;
    document.querySelector('#progress-sound').style.background = `linear-gradient(to right, #d3d3d3 0%, #d3d3d3 ${volumeValue * 100}%, #ffffff ${volumeValue * 100}%, #ffffff 100%)`;
  }
}

document.querySelector('#progress-sound').addEventListener('change', () => {
  volumeValue = document.querySelector('#progress-sound').value;
  if (document.querySelector('#progress-sound').value == 0) {
    audio.muted == false
    volumeMute();
  } else {
    audio.muted = true;
    volumeMute(document.querySelector('#progress-sound').value);
  }
});

soundIcons.addEventListener('click', volumeMute);



//менять время трека по ползунку
const changeProgressAudio = () => {
  if (isPlay) {
    audio.currentTime = document.querySelector('#progress-audio').value;
  } 
 }

document.querySelector('#progress-audio').addEventListener('change', changeProgressAudio);

bbb.forEach((item, index) => {
    item.addEventListener('click', () => {
              audio.currentTime  = 0;
              numAudio = index;
               playAudio(numAudio);
    })
  })

//point6,7 audio end


//point10, настройки start
const settingBtn = document.querySelector('.setting_btn')
const settingContainer = document.querySelector('.setting-container')
const timeHide = document.querySelector('#time-hide')
const dateHide = document.querySelector('#date-hide')
const greetingHide = document.querySelector('#greeting-hide')
const quoteHide = document.querySelector('#quote-hide')
const weatherHide = document.querySelector('#weather-hide')
const musicHide = document.querySelector('#music-hide')
const todoHide = document.querySelector('#todo-hide')

//открыть настройки
settingBtn.addEventListener('click', ()=> {
  settingContainer.classList.toggle('open_setting')
  settingBtn.classList.toggle('todo_icon_open')
})


//скрыть время+локалСт
  if (localStorage.getItem('setting-time')=== 'off') {
      document.querySelector('.time').classList.add('hide_element')
      timeHide.checked = false;
  }

timeHide.addEventListener('click', (evt)=> {
  if (!evt.target.checked) {
  document.querySelector('.time').classList.add('hide_element')
  localStorage.setItem('setting-time', 'off')
  } else {
    document.querySelector('.time').classList.remove('hide_element')
    localStorage.setItem('setting-time', 'on');
  }
})

//скрыть дату+локалСт
if (localStorage.getItem('setting-date')=== 'off') {
  document.querySelector('.date').classList.add('hide_element')
  dateHide.checked = false;
}

dateHide.addEventListener('click', (evt)=> {
if (!evt.target.checked) {
document.querySelector('.date').classList.add('hide_element')
localStorage.setItem('setting-date', 'off')
} else {
document.querySelector('.date').classList.remove('hide_element')
localStorage.setItem('setting-date', 'on');
}
})

//скрыть приветствие+локалСт
if (localStorage.getItem('setting-greeting')=== 'off') {
  document.querySelector('.greeting-container').classList.add('hide_element')
  greetingHide.checked = false;
}

greetingHide.addEventListener('click', (evt)=> {
if (!evt.target.checked) {
document.querySelector('.greeting-container').classList.add('hide_element')
localStorage.setItem('setting-greeting', 'off')
} else {
document.querySelector('.greeting-container').classList.remove('hide_element')
localStorage.setItem('setting-greeting', 'on');
}
})

//скрыть цитату+локалСт
if (localStorage.getItem('setting-quote')=== 'off') {
  document.querySelector('.quote_h').classList.add('hide_element')
  quoteHide.checked = false;
}

quoteHide.addEventListener('click', (evt)=> {
if (!evt.target.checked) {
document.querySelector('.quote_h').classList.add('hide_element')
localStorage.setItem('setting-quote', 'off')
} else {
document.querySelector('.quote_h').classList.remove('hide_element')
localStorage.setItem('setting-quote', 'on');
}
})

//скрыть погоду+локалСт
if (localStorage.getItem('setting-weather')=== 'off') {
  document.querySelector('.weather').classList.add('hide_element')
  weatherHide.checked = false;
}

weatherHide.addEventListener('click', (evt)=> {
if (!evt.target.checked) {
document.querySelector('.weather').classList.add('hide_element')
localStorage.setItem('setting-weather', 'off')
} else {
document.querySelector('.weather').classList.remove('hide_element')
localStorage.setItem('setting-weather', 'on');
}
})

//скрыть музыку+локалСт
if (localStorage.getItem('setting-player')=== 'off') {
  document.querySelector('.player').classList.add('hide_element')
  musicHide.checked = false;
}

musicHide.addEventListener('click', (evt)=> {
if (!evt.target.checked) {
document.querySelector('.player').classList.add('hide_element')
localStorage.setItem('setting-player', 'off')
} else {
document.querySelector('.player').classList.remove('hide_element')
localStorage.setItem('setting-player', 'on');
}
})

//скрыть туду+локалСт
if (localStorage.getItem('setting-todo')=== 'off') {
  document.querySelector('.todo_container').classList.add('hide_element')
  todoHide.checked = false;
}

todoHide.addEventListener('click', (evt)=> {
if (!evt.target.checked) {
document.querySelector('.todo_container').classList.add('hide_element')
localStorage.setItem('setting-todo', 'off')
} else {
document.querySelector('.todo_container').classList.remove('hide_element')
localStorage.setItem('setting-todo', 'on');
}
})


//выбор получения фона
if (localStorage.getItem('back-set')=== 'un') {
  getLinkToImage() 
  arrowNext.addEventListener('click', getLinkToImage);
  arrowPrev.addEventListener('click', getLinkToImage);
  document.querySelector('#GitHub').checked = false;
  document.querySelector('#Flickr').checked = false;
  document.querySelector('#Unsplash').checked = true;
  document.querySelector('#backgr-tags').checked = false;
}

if (localStorage.getItem('back-set')=== 'fl') {
  getLinkToImageFl()
     arrowNext.addEventListener('click', getLinkToImageFl);
     arrowPrev.addEventListener('click', getLinkToImageFl);
  document.querySelector('#GitHub').checked = false;
  document.querySelector('#Flickr').checked = true;
  document.querySelector('#Unsplash').checked = false;
  document.querySelector('#backgr-tags').checked = false;
}

if (localStorage.getItem('back-set')=== 'tag') {
  document.querySelector('#backgr-tags-input').value = localStorage.getItem('back-set-tag');
  getLinkToImageTag();
  arrowNext.addEventListener('click', getLinkToImageTag);
  arrowPrev.addEventListener('click', getLinkToImageTag);
  document.querySelector('#GitHub').checked = false;
  document.querySelector('#Flickr').checked = false;
  document.querySelector('#Unsplash').checked = false;
  document.querySelector('#backgr-tags').checked = true;
  
}

// if (localStorage.getItem('back-set')){
//   document.querySelector('#backgr-tags-input').value = localStorage.getItem('back-set');
// } 

 //фон по Unsplash
 
async function getLinkToImage() {
  const timeOfDay = getTimeOfDay()
  const url = `https://api.unsplash.com/photos/random?query=${timeOfDay}&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17`;
  const res = await fetch(url);
  const data = await res.json();
  // console.log(data.urls.regular)
  
  const img = new Image();
  img.src = data.urls.regular;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
  }; 
 }

 //фон по Unsplash
document.querySelector('#Unsplash').addEventListener('click', ()=> {
  // async function getLinkToImage() {
  //   const timeOfDay = getTimeOfDay()
  //   const url = `https://api.unsplash.com/photos/random?query=${timeOfDay}&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17`;
  //   const res = await fetch(url);
  //   const data = await res.json();
  //   console.log(data.urls.regular)
    
  //   const img = new Image();
  //   img.src = data.urls.regular;
  //   img.onload = () => {
  //     document.body.style.backgroundImage = `url(${data.urls.regular})`;
  //   }; 
  //  }
    getLinkToImage()
     arrowNext.addEventListener('click', getLinkToImage);
     arrowPrev.addEventListener('click', getLinkToImage);
    
localStorage.setItem('back-set', 'un')
})


//фон по Flickr
async function getLinkToImageFl() {
  const timeOfDay = getTimeOfDay()
  const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=9cc9254f4a76b2755164d3b039023c29&tags=${timeOfDay},nature&extras=url_l&format=json&nojsoncallback=1&safe_search=1`;
  const res = await fetch(url);
  const data = await res.json();
  console.log(url)
  let randomNumBack = getRandomNumber(0, 98);
  const img = new Image();
  img.src = data['photos']['photo'][randomNumBack]['url_l'];
  img.onload = () => {
    document.body.style.backgroundImage = `url(${data['photos']['photo'][randomNumBack]['url_l']})`;
  }; 
 }

//фон по Flickr
document.querySelector('#Flickr').addEventListener('click', ()=> {
  // console.log('a')
  getLinkToImageFl();
     arrowNext.addEventListener('click', getLinkToImageFl);
     arrowPrev.addEventListener('click', getLinkToImageFl);
  localStorage.setItem('back-set', 'fl')
  })




  //фон по гиту
document.querySelector('#GitHub').addEventListener('click', ()=> {
  setBg()
  localStorage.setItem('back-set', 'gi')
  })





//фон по тегу
// const BACK_TAG = document.querySelector('#backgr-tags-input');
  async function getLinkToImageTag() {
  
    const url = `https://api.unsplash.com/photos/random?query=${document.querySelector('#backgr-tags-input').value}&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.urls.regular)
    
    const img = new Image();
    img.src = data.urls.regular;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${data.urls.regular})`;
    }; 
   }

//фон по тегу
document.querySelector('#backgr-tags').addEventListener('click', ()=> {
  
   const BACK_TAG = document.querySelector('#backgr-tags-input');
  BACK_TAG.addEventListener('change', function (){  //слушатель на ввод 
    localStorage.setItem('back-set-tag', BACK_TAG.value)
    // localStorage.setItem('back-set', BACK_TAG.value);//сохр значение инпут
    // getLinkToImageTag()
    //  {
    //   const url = `https://api.unsplash.com/photos/random?query=${BACK_TAG.value}&client_id=e2077ad31a806c894c460aec8f81bc2af4d09c4f8104ae3177bb809faf0eac17`;
    //   const res = await fetch(url);
    //   const data = await res.json();
    //   console.log(data.urls.regular)
      
    //   const img = new Image();
    //   img.src = data.urls.regular;
    //   img.onload = () => {
    //     document.body.style.backgroundImage = `url(${data.urls.regular})`;
    //   }; 
    //  }
     getLinkToImageTag()
     arrowNext.addEventListener('click', getLinkToImageTag);
         arrowPrev.addEventListener('click', getLinkToImageTag);
})


    localStorage.setItem('back-set', 'tag')
  })








//значения элементов
function addSettingText (langTr) {
  document.querySelector('.setting-title-one').innerHTML = langTr.setLan[0]; 
  document.querySelector('.setting-title-two').innerHTML = langTr.setLan[1]; 
  document.querySelector('.lang-one').innerHTML = langTr.setLan[2]; 
  document.querySelector('.lang-two').innerHTML = langTr.setLan[3]; 
  document.querySelector('.widget-time').innerHTML = langTr.setLan[4];
  document.querySelector('.widget-date').innerHTML = langTr.setLan[5]; 
  document.querySelector('.widget-greet').innerHTML = langTr.setLan[6]; 
  document.querySelector('.widget-quote').innerHTML = langTr.setLan[7]; 
  document.querySelector('.widget-weather').innerHTML = langTr.setLan[8]; 
  document.querySelector('.widget-music').innerHTML = langTr.setLan[9];  
  document.querySelector('.widget-todo').innerHTML = langTr.setLan[10];  

  document.querySelector('.setting-title-three').innerHTML = langTr.setLan[11];  

  document.querySelector('.backgr-one').innerHTML = langTr.setLan[12];  
  document.querySelector('.backgr-two').innerHTML = langTr.setLan[13];  
  document.querySelector('.backgr-three').innerHTML = langTr.setLan[14];  
  document.querySelector('#backgr-tags-input').placeholder = langTr.setLan[15];
  }
  addSettingText(langTr)
//point10, настройки end


//point11, dolist start
const openToDo = document.querySelector('.todo_icon');
let addMessage = document.querySelector('.message');
const toDoAdd = document.getElementById('add');
const toDoInput = document.getElementById('in');
const toDoDelet = document.getElementById('clear');
let todoList = [];
let todo = document.querySelector('.todo');

openToDo.addEventListener('click', () => {
  openToDo.classList.toggle('todo_icon_open')
  document.querySelector('.todo_contant').classList.toggle('open_todo');
})

if(localStorage.getItem('todo')){
  todoList = JSON.parse(localStorage.getItem('todo'));
  displayMessages()
  } 
 

toDoAdd.addEventListener('click', () => {
  if(addMessage.value !== ''){
  let newTodo = {
    todo: addMessage.value,
    checked: false,
    important: false,
  }
  todoList.push(newTodo);
  displayMessages()
  localStorage.setItem('todo', JSON.stringify(todoList))
  document.getElementById('in').value = '';
  // console.log(todoList)
}
})


function displayMessages(){
  let displayMessage = '';
  todoList.forEach((item, index) => {
     displayMessage += `
    <li>
    <input type= 'checkbox' class='check_todo' id='item_${index}' ${item.checked ? 'checked' : ''}>
    <label for ='item_${index}' class="${item.important ? 'important' : ''}">${item.todo}</label>
    </li>
    `;
    todo.innerHTML = displayMessage;
    // console.log(displayMessages)
  });
}

todo.addEventListener('change', function(event){
  let valueLabel = todo.querySelector('[for=' + event.target.getAttribute('id') + ']').innerHTML;

  todoList.forEach(function(item){
    if (item.todo === valueLabel){
      item.checked = !item.checked;
      item.important = !item.important;
      displayMessages();
      localStorage.setItem('todo', JSON.stringify(todoList))
    }
  })
});

todo.addEventListener('contextmenu', function(event){
  event.preventDefault();
  todoList.forEach(function(item, i){
    if(item.todo === event.target.innerHTML){
if(todoList.length === 1){
      todoList = []
  // console.log(todoList)
  document.querySelector('.todo').innerHTML = ''; 
  localStorage.clear();
}
      // if(event.ctrlKey){
        todoList.splice(i, 1);
      // } 
      displayMessages();
      localStorage.setItem("todo", JSON.stringify(todoList));
    }
  })
})

 //  по нажатию на энтер
 addMessage.addEventListener('keyup', (event) => {
  if( event.key === "Enter"){
    if(addMessage.value !== ''){
      // console.log(addMessage.value)
    let newTodo = {
      todo: addMessage.value,
      checked: false,
      important: false,
    }
    todoList.push(newTodo);
    displayMessages()
    // console.log(todoList)
    localStorage.setItem('todo', JSON.stringify(todoList))
    document.getElementById('in').value = '';
  }}
})


 //  по нажатию на clear
toDoDelet.addEventListener('click', () => {
   todoList = []
  // console.log(todoList)
  document.querySelector('.todo').innerHTML = ''; 
  localStorage.removeItem('todo');
})



function addTodoText (langTr) {
document.querySelector('.todo-title').innerHTML = langTr.todoLan[0]; 
document.querySelector('.message').placeholder = langTr.todoLan[1]; 
document.querySelector('#add').innerHTML = langTr.todoLan[2]; 
document.querySelector('#clear').innerHTML = langTr.todoLan[3]; 
document.querySelector('.helps').innerHTML = langTr.todoLan[4]; 
}
addTodoText(langTr)
//point11, dolist end


//point8, translate start

const ruBtn = document.querySelector('#lang-ru');
ruBtn.addEventListener('click', ()=>{
  document.querySelector('.name').placeholder = langRU.namePlaceholder;
  document.querySelector('.city').placeholder = langRU.cityPlaceholder;
  city.value = langRU.weatherLan[0];
  langTr = langRU;
  addTodoText(langTr);
  addSettingText(langTr);

  getWeather(langTr);

  getLocalStorage()
  linkQuote = './dataRu.json'
  getQuotes();
  localStorage.setItem('translate', 'rus');
})

const enBtn = document.querySelector('#lang-en');
enBtn.addEventListener('click', ()=>{
  localStorage.removeItem('translate');
  document.querySelector('.name').placeholder = langEN.namePlaceholder;
  document.querySelector('.city').placeholder = langEN.cityPlaceholder;
  city.value = langEN.weatherLan[0];
  langTr = langEN;
  addTodoText(langTr);
  addSettingText(langTr)
  getWeather(langTr)
  getLocalStorage()
  linkQuote = './data.json';
  getQuotes();
})
//point8, translate end