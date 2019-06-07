
 /**
 * Returns a random alphanumeric string.
 *
 * @param  {number} length - The number of characters to generate for the string
 * @param  {string} prefix - An optional string to prepend to the result
 * @param  {string} postfix - An optional string to append to the result
 *
 * @return {string} The randomized string
 *
 */
const hashString = (length = 8, prefix, postfix) => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('')

  if (! length) {
    length = Math.floor(Math.random() * chars.length)
  }

  let str = ''
  for (var i = 0; i < length; i++) {
    str += chars[Math.floor(Math.random() * chars.length)]
  }

  const pre = prefix ? `${prefix}_` : ''
  const post = postfix ? `_${postfix}` : ''

  return `${pre}${str}${post}`
}

export { hashString }
