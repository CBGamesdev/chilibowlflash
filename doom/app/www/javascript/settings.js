resetBtn.addEventListener("click", () => {
  fetch("/reset")
})
grayscaleBtn.addEventListener("click", () => {
  fetch("/config/colorspace?Gray")
})
colorBtn.addEventListener("click", () => {
  fetch("/config/colorspace?RGB")
})
resetBtn.addEventListener("click", () => {
  fetch("/config/colorspace?Color")
})
quality15Btn.addEventListener("click", () => {
  fetch("/config/quality?15")
})

quality25Btn.addEventListener("click", () => {
  fetch("/config/quality?25")
})
quality50Btn.addEventListener("click", () => {
  fetch("/config/quality?50")
})
quality75Btn.addEventListener("click", () => {
  fetch("/config/quality?75")
})
quality100Btn.addEventListener("click", () => {
  fetch("/config/quality?100")
})
