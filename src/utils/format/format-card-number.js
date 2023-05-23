/**
 * Formats a credit card number string bt adding dashes (-) after
 * every 4th characters
 * @param {string} cardNumber
 * @returns {string}
 */

export function formatCardNumberWithDashes(cardNumber) {
  return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')
}
