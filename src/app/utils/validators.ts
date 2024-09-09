export namespace CustomValidators {
  export function isValidEmail(email: string): boolean {
    const regex = new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$');
    return regex.test(email);
  }

  export function isValidPassword(password: string): boolean {
    return !!(password && password.trim().length >= 6);
  }

  export function isValidName(name: string): boolean {
    const pattern = /^(?!.*\s$)([A-ZÀ-Ý][a-zà-ÿ']*|(?:de|da|do|dos|das))(\s[A-ZÀ-Ý][a-zà-ÿ']*|(?:\s(?:de|da|do|dos|das)))*$/;
    return !!(name && pattern.test(name.trim()));
  }

  export function isValidUrl(url: string): boolean {
    const pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/;
    return pattern.test(url.trim());
  }
}