
export function informalName(person?: { givenName?: string, familyName?: string, nickname?: string } ) : string {
   if ((person?.givenName?.length) && (person?.familyName?.length)) {
    return person?.givenName + ' ' + person?.familyName
  } else if (person?.givenName?.length) {
    return person?.givenName ?? ''
  } else if (person?.familyName?.length) {
    return person?.familyName
  } else {
    return person?.nickname ?? ''
  }
}
