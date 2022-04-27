import './style.css'

// init
const appInstances = 12
const highlightClass = 'app-input-highlight'
const removeHighlights = (el: HTMLElement): void => getInputs(el).forEach(el => el.classList.remove(highlightClass))
const addHighlight = (inputs: Element[]): void => inputs.forEach(i => i.classList.add(highlightClass))
const hasClass = (el: HTMLElement, className: string): boolean => el.classList.contains(className)
const isValid = (el: Partial<number | string>): boolean => !isNaN(el as number) && (el as string) !== ''
const getElement = (e: Event) => e.target as HTMLElement
const getParent = (el: HTMLElement) => el.parentElement?.parentElement as HTMLElement
const getInputs = (el: HTMLElement): Element[] => [...getParent(el).querySelectorAll('.app-input')]

// gets all input values
const getInputValues = (el: HTMLElement): number[] => {
  return getInputs(el)
    .filter(i => isValid((i as HTMLInputElement).value))
    .map(i => (i as HTMLInputElement).value as unknown as number)
}

const calculateValues = (el: HTMLElement): void => {
  removeHighlights(el)

  // gets smalles || biggest
  const inputValues = getInputValues(el)
  const selectedVal = el.dataset.type === 'biggest' ? Math.max(...inputValues) : Math.min(...inputValues)
  const selectedInputEl = getInputs(el).filter(
    input => isValid((input as HTMLInputElement).value) && +(input as HTMLInputElement).value === selectedVal,
  )
  addHighlight(selectedInputEl)
}

// handlers
const handleInputChange = (e: Event): void => {
  hasClass(getElement(e), 'app-input') && removeHighlights(getElement(e))
}
const handleBtnClick = (e: Event): void => {
  removeHighlights(getElement(e))
  hasClass(getElement(e), 'app-btn') && calculateValues(getElement(e))
}

const app = document.getElementById('app')
const appContent = document.getElementById('app-content')

// create app content
if (app) {
  for (let i = 0; i < appInstances; i++) {
    const template = <HTMLElement> appContent?.cloneNode(true)
    if (appContent?.cloneNode(true)) {
      app.innerHTML += template.innerHTML
    }
  }
}

// add event listeners
const apps = document.getElementsByClassName('app-content') as HTMLCollectionOf<HTMLElement>
if (apps.length > 0) {
  for (let i = 0; i < apps.length; i++) {
    const app = apps[i]
    const inputs = app.querySelectorAll('.app-input') as NodeListOf<HTMLElement>
    const btns = app.querySelectorAll('.app-btn') as NodeListOf<HTMLElement>

    inputs.forEach(input => input.addEventListener('focus', handleInputChange))
    btns.forEach(btn => btn.addEventListener('click', handleBtnClick))
  }
}
