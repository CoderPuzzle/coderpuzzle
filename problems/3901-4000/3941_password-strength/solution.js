/**
 * @param {string} password
 * @return {number}
 */
var passwordStrength = function (password) {
    const lower = new Set();
    const upper = new Set();
    const digit = new Set();
    const special = new Set();
    for (const char of password) {
        const code = char.charCodeAt(0);
        if (code >= 97 && code <= 122) lower.add(char);
        else if (code >= 65 && code <= 90) upper.add(char);
        else if (code >= 48 && code <= 57) digit.add(char);
        else if ("!@#$".includes(char)) special.add(char);
    }
    return lower.size + 2 * upper.size + 3 * digit.size + 5 * special.size;
};
