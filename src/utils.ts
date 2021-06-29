export function camelToKebabCase (str: string): string {
  return str.split('').map((c) => {
    return c.toUpperCase() === c ? `-${c.toLowerCase()}` : c
  }).join('')
}

export function has (obj: Object, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key)
}
