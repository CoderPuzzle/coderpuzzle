/**
 * @param {string} num
 * @return {boolean}
 */
var isAdditiveNumber = function (num) {
    // The first two numbers fix the whole sequence, so try each split of
    // them and let string addition verify the remainder. No machine
    // integers anywhere: rejected candidates can outgrow 64 bits.
    const n = num.length;
    for (let i = 1; i < n; i++) {
        if (!valid(num, 0, i)) continue;
        // j < n leaves at least one digit for the third number.
        for (let j = i + 1; j < n; j++) {
            if (!valid(num, i, j)) continue;
            if (consumes(num, num.slice(0, i), num.slice(i, j), j)) return true;
        }
    }
    return false;
};

function valid(num, start, end) {
    // Multi-digit numbers may not open with '0'; a lone 0 is legal.
    return end - start === 1 || num[start] !== "0";
}

function consumes(num, first, second, start) {
    // Greedy walk: the next number's digits are exactly the sum's
    // digits, so its length is never a choice.
    while (start < num.length) {
        const total = add(first, second);
        if (!num.startsWith(total, start)) return false;
        first = second;
        second = total;
        start += total.length;
    }
    return true;
}

function add(a, b) {
    // Schoolbook addition on digit characters, least significant
    // first, carrying as we go.
    const digits = [];
    let carry = 0;
    let i = a.length - 1;
    let j = b.length - 1;
    while (i >= 0 || j >= 0 || carry > 0) {
        let total = carry;
        if (i >= 0) total += a.charCodeAt(i--) - 48;
        if (j >= 0) total += b.charCodeAt(j--) - 48;
        digits.push(String.fromCharCode(48 + (total % 10)));
        carry = Math.floor(total / 10);
    }
    return digits.reverse().join("");
}
