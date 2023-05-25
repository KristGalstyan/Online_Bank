class FormService {
  getFormValues(formElement) {
    const inputs = formElement.querySelectorAll('input')
    const values = {}

    for (const input of inputs) {
      values[input.name] = input.value
    }

    return values
  }
}

export default new FormService()
