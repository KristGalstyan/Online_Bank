import { SERVER_URL } from '@/config/url.config'
import { extractErrorMessage } from './extract.error.message'
/**
 * RedQuery is a minimalistic library for handling API requests.
 * Fetch data from the API with provided options.
 *
 * @param {Object} options - Configuration options for the API request.
 * @param {string} options.path - The API endpoint path.
 * @param {('GET'|'POST'|'PATCH'|'DELETE'|'PUT')} [options.method='GET'] - The HTTP method to use for the request.
 * @param {Object} [options.body=null] - The request payload to send as JSON.
 * @param {Object} [options.headers={}] - Additional headers to include with the request.
 * @param {Function} [options.onSuccess=null] - Callback function to be called on successful response.
 * @param {Function} [options.onError=null] - Callback function to be called on error response.
 * @returns {Promise<{isLoading: boolean, error: string|null, data: any|null}>} - An object containing the loading state, error, and data from the response.
 */
export async function xsQuery({
  path,
  body = null,
  headers = {},
  method = 'GET',
  onError = null,
  onSuccess = null
}) {
  let isLoading = true
  let error = null
  let data = null
  const url = `${SERVER_URL}/api${path}`

  //   Access_token from LS

  const accessToken = ''

  const requestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  }

  if (accessToken) {
    requestOptions.headers.Authorization = `Bearer ${accessToken}`
  }

  if (body) {
    requestOptions.body = JSON.stringify(body)
  }

  try {
    const response = await fetch(url, requestOptions)
    if (response.ok) {
      data = await response.json()
      if (onSuccess) {
        onSuccess(data)
      }
    } else {
      const errorData = await response.json()
      const errorMessage = extractErrorMessage(errorData)
      if (onError) {
        onError(errorMessage)
      }
    }
  } catch (error) {
    const errorMessage = extractErrorMessage(error)
    if (errorMessage) {
      onError(errorMessage)
    }
  } finally {
    isLoading = false
  }

  return { isLoading, error, data }
}
