import 'intersection-observer'
import ScrollProgress from 'scrollprogress'

const headings = document.querySelectorAll('h2')
const toast = document.querySelector('.toast')
const chapterSpan = document.querySelector('.chapter')
const yes = document.querySelector('#action-yes')
const no = document.querySelector('#action-no')
const footer = document.querySelector('footer')

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const { target, isIntersecting, intersectionRatio } = entry

    if (isIntersecting || intersectionRatio > 0) {
      localStorage.setItem('chapter', target.id)
      observer.unobserve(target)
    }
  })
})

headings.forEach(heading => {
  observer.observe(heading)
})

const endObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const { target, isIntersecting, intersectionRatio } = entry

    if (isIntersecting || intersectionRatio > 0) {
      console.log('Congrats you made it to the end')
      localStorage.removeItem('chapter')
      observer.unobserve(target)
    }
  })
})

endObserver.observe(footer)

document.addEventListener('DOMContentLoaded', function(event) {
  if (localStorage.getItem('chapter')) {
    let chapter = localStorage.getItem('chapter')
    let chapterFormatted = document.querySelector('#' + chapter).textContent
    chapterSpan.innerHTML = chapterFormatted
    toast.classList.add('toast-active')
  }
})

yes.addEventListener('click', e => {
  e.preventDefault
  document
    .getElementById(localStorage.getItem('chapter'))
    .scrollIntoView({ block: 'center', behavior: 'auto' })
  toast.classList.remove('toast-active')
})

no.addEventListener('click', e => {
  e.preventDefault
  toast.classList.remove('toast-active')
})

const progressBar = document.querySelector('progress')
const max = document.clientHeight

const progressObserver = new ScrollProgress((x, y) => {
  progressBar.setAttribute('value', y * 100)
})
