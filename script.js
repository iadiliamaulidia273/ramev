let page = 1
let namaUser = ""

let makanan = [
"🍪 Nastar","🍩 Donat","🥮 Kue Kering","🍫 Coklat",
"🍰 Kue Tart","🧁 Cupcake","🥐 Croissant","🍕 Pizza Mini"
]

let minuman = [
"🥤 Es Sirup","🧃 Jus Buah","☕ Kopi",
"🧋 Es Teh","🥛 Susu","🍵 Teh Hangat"
]

let pilihanMakanan = []
let pilihanMinuman = []

let step = "makanan"
let poin = 0
let thr = 0
let thrDipilih = false

let frameDipilih = ""
let previewFrameDipilih = ""
let hargaFramePreview = 0

let uploadedImage = null

let sound = new Audio("assets/bedug.mp3")

/* =========================
PAGE
========================= */
function nextPage(){

let current = document.getElementById("page"+page)
if(current) current.classList.remove("active")

page++

let next = document.getElementById("page"+page)
if(next) next.classList.add("active")

if(page === 2){

namaUser = document.getElementById("nama").value

let text = "تَقَبَّلَ اللَّهُ مِنَّا وَمِنكُمْ، صِيَامَنَا وَقِيَامَنَا، وَجَعَلَنَا مِنَ العَائِدِينَ وَالفَائِزِينَ"
let words = text.split(" ")
let container = document.getElementById("ucapan")

container.innerHTML = ""

words.forEach((word, index) => {
let span = document.createElement("span")
span.innerText = word + " "
span.classList.add("kata")
span.style.animationDelay = (index * 0.3) + "s"
container.appendChild(span)
})

let nama = document.createElement("span")
nama.innerText = namaUser
nama.classList.add("kata","nama")
nama.style.animationDelay = (words.length * 0.3) + "s"

container.appendChild(nama)
}

if(page === 3){
loadMenu()
}

if(page === 4){
tampilkanSajian()
}

if(page === 6){
document.getElementById("saldoThr").innerText = thr
document.getElementById("saldoPoin").innerText = poin
renderCanvas(uploadedImage)
}

if(page === 8){
renderCanvas(uploadedImage)
}

}

/* =========================
MENU
========================= */
function loadMenu(){
let list = document.getElementById("menuList")
list.innerHTML = ""

let data = step === "makanan" ? makanan : minuman

data.forEach(item=>{
let el = document.createElement("div")
el.className="cardItem"
el.innerText=item
el.onclick=()=>pilih(item)
list.appendChild(el)
})
}

function pilih(item){
if(step==="makanan"){
pilihanMakanan.push(item)
}else{
pilihanMinuman.push(item)
}
}

function nextMenu(){
if(step==="makanan"){
step="minuman"
document.getElementById("judulMenu").innerText="🥤 Pilih Minuman"
loadMenu()
}else{
nextPage()
}
}

function tampilkanSajian(){

let makananEl = document.getElementById("makananTampil")
let minumanEl = document.getElementById("minumanTampil")

makananEl.innerHTML = pilihanMakanan.join(" ")
minumanEl.innerHTML = pilihanMinuman.join(" ")

}

function mulaiMakan(){

let makananEl = document.getElementById("makananTampil")
let minumanEl = document.getElementById("minumanTampil")

let makananList = makananEl.innerText.split(" ")
let minumanList = minumanEl.innerText.split(" ")

makananEl.innerHTML = ""
minumanEl.innerHTML = ""

/* MAKANAN SATU-SATU */
makananList.forEach((item, index)=>{
let span = document.createElement("span")
span.innerText = item + " "
span.style.fontSize = "40px"
span.style.display = "inline-block"

makananEl.appendChild(span)

setTimeout(()=>{
span.classList.add("dimakan")
}, index * 800) // ⬅️ delay = efek stop motion
})

/* MINUMAN SETELAH MAKAN */
minumanList.forEach((item, index)=>{
let span = document.createElement("span")
span.innerText = item + " "
span.style.fontSize = "40px"
span.style.display = "inline-block"

minumanEl.appendChild(span)

setTimeout(()=>{
span.classList.add("dimakan")
}, (makananList.length * 800) + (index * 800))
})

}

/* =========================
THR
========================= */
function pilihTHR(nominal, el){

if(thr === nominal && thrDipilih){
thr = 0
thrDipilih = false

document.querySelectorAll(".cardItem").forEach(e=>{
e.classList.remove("active")
})

document.getElementById("thrNominal").innerText = "Pilih THR dulu 😆"
document.getElementById("infoKurang").innerText = ""
return
}

thr = nominal
thrDipilih = true

document.querySelectorAll(".cardItem").forEach(e=>{
e.classList.remove("active")
})

el.classList.add("active")

document.getElementById("thrNominal").innerText =
"THR Kamu: Rp " + thr.toLocaleString("id-ID")

if(thr < 400000){
document.getElementById("infoKurang").innerText =
"💡 Kurang untuk item mahal → main game dulu!"
}else{
document.getElementById("infoKurang").innerText =
"🔥 Bisa langsung belanja!"
}

}

/* =========================
BEDUG
========================= */
function tabuhBedug(){
sound.currentTime=0
sound.play()
poin+=5
document.getElementById("poin").innerText=poin
}

/* =========================
GAME
========================= */
let gameInterval = null

function mulaiKetupat(){

let area = document.getElementById("gameArea")

area.innerHTML = `
<h3>🎁 Tangkap Ketupat</h3>
<button onclick="kembaliMenu()">⬅️ Kembali</button>
<div id="gameBox"></div>
`

let gameBox = document.getElementById("gameBox")

if(gameInterval) clearInterval(gameInterval)

gameInterval = setInterval(()=>{

let ketupat = document.createElement("div")
ketupat.innerText = "🎁"
ketupat.className = "ketupat"

let boxWidth = gameBox.clientWidth
let boxHeight = gameBox.clientHeight

ketupat.style.position = "absolute"
ketupat.style.left = Math.random() * (boxWidth - 30) + "px"
ketupat.style.top = "0px"

gameBox.appendChild(ketupat)

let fall = setInterval(()=>{
ketupat.style.top = (ketupat.offsetTop + 5) + "px"

if(ketupat.offsetTop > boxHeight){
ketupat.remove()
clearInterval(fall)
}
},30)

ketupat.onclick = function(){
poin += 1
document.getElementById("poin").innerText = poin
thr = poin * 1000

ketupat.remove()
clearInterval(fall)
}

},800)

}

function mulaiBedug(){

let area = document.getElementById("gameArea")

if(gameInterval) clearInterval(gameInterval)

area.innerHTML = `
<div id="bedug" onclick="tabuhBedug()">🥁</div>
<p>Klik bedug untuk dapat poin!</p>
`

}

function kembaliMenu(){
if(gameInterval) clearInterval(gameInterval)

document.getElementById("gameArea").innerHTML = `
<button onclick="mulaiKetupat()">🎁 Tangkap Ketupat</button>
<button onclick="mulaiBedug()">🥁 Tabuh Bedug</button>
`
}

/* =========================
FRAME
========================= */
function previewFrame(el, nama, harga){

previewFrameDipilih = nama
hargaFramePreview = harga

document.getElementById("notifShop").innerText =
"Preview frame: " + nama + " ✨"

document.querySelectorAll(".cardItem").forEach(item=>{
item.classList.remove("active")
})

el.classList.add("active")

renderCanvas(uploadedImage)
}

function beliFrame(){

if(!previewFrameDipilih){
document.getElementById("notifShop").innerText =
"Pilih frame dulu 😆"
return
}

if(thr >= hargaFramePreview){

thr -= hargaFramePreview
frameDipilih = previewFrameDipilih

document.getElementById("notifShop").innerText =
"Berhasil beli frame 🎉"
document.getElementById("saldoThr").innerText = thr

renderCanvas(uploadedImage)

}else{
document.getElementById("notifShop").innerText =
"THR tidak cukup 😭"
}

}

/* =========================
CANVAS
========================= */
function renderCanvas(imgSrc = null){

let canvas = document.getElementById("canvas")
if(!canvas) return

let ctx = canvas.getContext("2d")

ctx.clearRect(0,0,300,300)

ctx.fillStyle = "white"
ctx.fillRect(0,0,300,300)

if(imgSrc){
let img = new Image()
img.onload = function(){
ctx.drawImage(img,0,0,300,300)
drawOverlay()
}
img.src = imgSrc
}else{
drawOverlay()
}

function drawOverlay(){

ctx.fillStyle="black"
ctx.font="20px Poppins"
ctx.fillText(namaUser,80,280)

let frameName = frameDipilih || previewFrameDipilih

if(frameName){
let frame = new Image()
frame.src = "assets/frame/" + frameName

frame.onload = ()=>{
ctx.drawImage(frame,0,0,300,300)
}
}

}

}




/* =========================
DOWNLOAD
========================= */
function downloadCard(){
let canvas = document.getElementById("canvas")
let link=document.createElement("a")
link.download="card.png"
link.href=canvas.toDataURL()
link.click()
}

window.onload = function(){

let upload = document.getElementById("upload")

if(upload){
upload.onchange = function(e){
uploadedImage = URL.createObjectURL(e.target.files[0])
renderCanvas(uploadedImage)
}
}

}