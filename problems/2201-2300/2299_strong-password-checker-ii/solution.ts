function strongPasswordCheckerII(password: string): boolean {
    if (password.length < 8) {
        return false;
    }
    const special = "!@#$%^&*()-+";
    let hasLower = false;
    let hasUpper = false;
    let hasDigit = false;
    let hasSpecial = false;
    for (let index = 0; index < password.length; index++) {
        const current = password[index];
        if (index > 0 && current === password[index - 1]) {
            return false;
        }
        if (current >= "a" && current <= "z") {
            hasLower = true;
        } else if (current >= "A" && current <= "Z") {
            hasUpper = true;
        } else if (current >= "0" && current <= "9") {
            hasDigit = true;
        } else if (special.includes(current)) {
            hasSpecial = true;
        }
    }
    return hasLower && hasUpper && hasDigit && hasSpecial;
}
