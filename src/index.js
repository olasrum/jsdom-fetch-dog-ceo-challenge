const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
const container = document.getElementById('dog-image-container')
const breedUrl = 'https://dog.ceo/api/breeds/list/all'
const ul = document.getElementById('dog-breeds')
const dropDown = document.getElementById('breed-dropdown')
let dogBreeds = []

// fetch images and call createImgElement() and renderImg()
function getImages() {
  fetch(imgUrl)
  .then(resp => resp.json())
  .then(images => {
    const imgs = images.message
    let imgsArray = createImgElement(imgs)
    renderImgs(imgsArray)    
  })
}
     
function createImgElement(imgs) {
  //map requires use of return
  return imgs.map((img) => {
  //template literal instead of create each element
    let i = `<img src = ${img}>`
    return i
  })
}

function renderImgs(imgsArray) {
  imgsArray.forEach(element => {
  //use innerHTML to append element as imgsArray used template literal
  // += is used because each image needs to be added with + as = would overwrite
    container.innerHTML += element
})
}

function getBreeds() {
  fetch(breedUrl)
  .then(resp => resp.json())
  .then(breeds => {
    //Turn object in to array using Object.keys
    dogBreeds = Object.keys(breeds.message)
    const breedLi = createLiElement(dogBreeds)
    renderLi(breedLi)   
  })
}

function createLiElement(dogBreeds) {
  //map requires use of return
  return dogBreeds.map((breed) => {
  //template literal instead of create each element
    let li = `<li>${breed}</li>`
    console.log(li)
    return li
  })
}

function renderLi(breedLi) {
  breedLi.forEach(element => {
    ul.innerHTML += element
})
}

//changing colour of dog breeds when clicked
ul.addEventListener('click', handleClick)

function handleClick(event) {
  //event.target.nodeName === 'LI' used so that only indivual LI clicked goes blue
  if (event.target.nodeName === 'LI') {
    if (event.target.style.color === 'blue'){
      event.target.style.color = 'black'
    } else {
      event.target.style.color = 'blue'
    }
  } 
}

//drop down list
dropDown.addEventListener('change', handleChange)

function handleChange(event) {
  const letter = event.target.value
  //filter out breeds that start with the letter
 const filterBreeds = dogBreeds.filter(breed => breed.startsWith(letter))
 const filterBreedsLi = createLiElement(filterBreeds)
 ul.innerHTML = ''
 renderLi(filterBreedsLi)
}

getImages()
getBreeds()




//https://www.youtube.com/watch?v=J-jsC5Il9QI