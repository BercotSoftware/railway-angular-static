/**
 * Format a URL as an external link
 * @param urlString
 */
export function formatUrl(urlString: string) {
  let result : string = urlString
  if (urlString) {
    if (urlString.startsWith('http')) {
      result = encodeURI(urlString)
    } else {
      result = 'http://' + encodeURI(urlString)
    }
  }
  return result
}


/**
 * Format a phone number as a link
 * @param phone
 */
export function formatPhoneUrl(phone?: string | undefined) {
  return (phone) ? 'tel:+${phone}' : ''
}

/**
 * Format an e-mail address as a link
 * @param email
 * @param subject
 * @param body
 */
export function formatEmailUrl(email: string, subject?: string, body?: string): string {
  if (!email) { return ''}
  let result = 'mailto:${email}'
  if (subject) {
    result += ',subject=${subject}'
  }
  if (body) {
    result += ',body=${body}'
  }
  return result
}

export function isFacebookUrl(link?: string) : boolean {
  return link?.includes('facebook.com') ?? false
}

export const knownSocialSites : string[] = ['facebook', 'instagram', 'linkedin', 'twitter']

export function knownLinkLabel(url?: string) : string {
  for (let i=0; i<knownSocialSites.length; i++) {
    if (url?.includes(knownSocialSites[i])) {
      return knownSocialSites[i]
    }
  }
  return 'link'
}

export function facebookLink(handle?: string) : string {
  return handle ? `https://facebook.com/${handle}` : ''
}

export function twitterLink(handle?: string) : string {
  return handle ? `https://x.com/${handle}` : ''
}

export function phoneLink(phoneNumber?: string) : string {
  return phoneNumber ? `tel:${phoneNumber}` : ''
}

export function instagramLink(handle?: string) : string {
  return handle ? `https://instagram.com/${handle}` : ''
}
