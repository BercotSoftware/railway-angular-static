import {PhoneNumberFormat, PhoneNumberUtil} from "google-libphonenumber";


export function formatPhoneNumber(phoneNumber?: string) {
  if (phoneNumber) {
    const phoneNumberUtil = PhoneNumberUtil.getInstance()
    const phone = phoneNumberUtil.parse(phoneNumber, "US")
    return (phone) ? phoneNumberUtil.format(phone, PhoneNumberFormat.NATIONAL) : undefined
  } else {
    return undefined
  }
}
