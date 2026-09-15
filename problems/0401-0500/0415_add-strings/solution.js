/**
 * @param {string} num1
 * @param {string} num2
 * @return {string}
 */
var addStrings = function (num1, num2) {
    // Schoolbook addition: walk both numbers from their right ends one
    // column at a time, add the two digits plus the carry, and emit
    // total % 10. The whole inputs are never converted to integers.
    let i = num1.length - 1;
    let j = num2.length - 1;
    let carry = 0;
    const digits = [];
    // Looping on "carry > 0" appends the final leading 1 when the sum is
    // one digit longer; each side contributes only while in range.
    while (i >= 0 || j >= 0 || carry > 0) {
        let total = carry;
        if (i >= 0) {
            total += num1.charCodeAt(i) - 48;
            i--;
        }
        if (j >= 0) {
            total += num2.charCodeAt(j) - 48;
            j--;
        }
        digits.push(String.fromCharCode(48 + (total % 10)));
        carry = Math.floor(total / 10);
    }
    // Digits came out least-significant first; flip before joining.
    return digits.reverse().join("");
};
