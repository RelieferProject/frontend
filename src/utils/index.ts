export function addressParse(address: String, lenght = 4) {
  return address.slice(0, lenght) + '....' + address.slice(address.length - lenght, address.length);
}
