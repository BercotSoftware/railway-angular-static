export enum CityStateFormat {
  Short = 0,
  Long = 1
}

export function formatCityState(address?: { city?: string, state?: string } | null) : string {
  let result = '';

  if (address?.city?.length) {
    result += address?.city
  }

  if (address?.state?.length) {
    if (result.length > 0) {
      result += `, `
    }
    result += address.state
  }

  return result
}

export function formatAddressCityStateZip(address?: { city?: string, state?: string, postalCode?: string } | null) : string {
  let result = formatCityState(address)

  if (address?.postalCode?.length) {
    if (result.length > 0) {
      result += ` `
    }
    result += address?.postalCode
  }

  return result
}
