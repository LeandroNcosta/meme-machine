
const memeSelector = document.querySelector('.meme-list')
let displayImage = document.querySelector('.display-img')
const btnDownload = document.querySelector('.btn-download')
const imageInput = document.querySelector('#img-input')

const memesObject = [
  {
    "name": "exemplo 01",
    "path": "../pictures/meme1.jfif"
  },
  {
    "name": "exemplo 02",
    "path": "../pictures/meme2.jfif"
  }
]

const createGallery = async imageList => {
  memeSelector.innerHTML = ''
  const optionDefault = document.createElement('option')
  optionDefault.textContent = 'SELECIONE'
  memeSelector.prepend(optionDefault)

  imageList.forEach(picture => {
    let newOption = document.createElement('option')
    newOption.text = picture.name.toUpperCase()
    newOption.value = picture.path
    memeSelector.appendChild(newOption)
  });

}

const changeMemePicture = async photo => {
  displayImage.style.backgroundImage = `url('${photo}')`
}

const enablePhotoUpload = () => {
  imageInput.addEventListener('change', function () {
    const reader = new FileReader()

    reader.addEventListener('load', () => {
      const uploadImage = reader.result
      const newMeme = {
        "name": 'BASE PERSONALIZADA',
        "path": `${uploadImage}`
      }
      memesObject.push(newMeme)
      createGallery(memesObject)
      changeMemePicture(uploadImage)
    })

    reader.readAsDataURL(this.files[0])
  })
}

const main = async () => {
  const memesImageList = memesObject
  enablePhotoUpload()
  await createGallery(memesImageList)
  // await changeMemePicture(memesImageList[1].path)
}

memeSelector.addEventListener('change', event => {
  const clickedElement = event.target
  changeMemePicture(clickedElement.value)
})

btnDownload.addEventListener('click', () => {
  const screenshotPrint = document.querySelector('#downlabled')

  html2canvas(screenshotPrint).then(canvas => {
    const base64Image = canvas.toDataURL('image/png')
    let anchor = document.createElement('a')
    anchor.setAttribute("href", base64Image)
    anchor.setAttribute("download", 'my-meme')
    anchor.click()
    anchor.remove()
  })

})

main()



