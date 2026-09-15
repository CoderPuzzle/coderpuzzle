/**
 * @param {string} n
 * @return {string}
 */
var nearestPalindromic = function (n) {
    // A palindrome is fixed by its first half, so the palindromes nearest n
    // nearly share n's own half: mirror the half, and the half +/- 1, for at
    // most three same-width candidates. The +/- 1 step can leave the width
    // (10...0 decremented, 9...9 incremented); those neighbors are the
    // boundary candidates 10^(L-1) - 1 (all 9s, one digit shorter) and
    // 10^L + 1 (1, zeros, 1).
    //
    // A JS number is not exact past 2^53 and the candidates reach 10^18 + 1,
    // so only the half - at most nine digits - is stepped numerically; every
    // full value below is built, ordered, and subtracted as a digit string.
    const length = n.length;
    const half = (length + 1) >> 1;
    const prefix = Number(n.slice(0, half)); // <= 999,999,999: exact in a double
    const candidates = [];
    for (const delta of [-1, 0, 1]) {
        const shifted = String(prefix + delta);
        // A half that no longer has exactly `half` digits would mirror onto
        // leading zeros - the boundary candidates own that ground.
        if (shifted.length !== half || (shifted === "0" && length > 1)) {
            continue;
        }
        candidates.push(
            shifted +
                shifted
                    .slice(0, length - half)
                    .split("")
                    .reverse()
                    .join(""),
        );
    }
    candidates.push(length === 1 ? "0" : "9".repeat(length - 1));
    candidates.push("1" + "0".repeat(length - 1) + "1");

    let best = null;
    let bestDistance = null;
    for (const candidate of candidates) {
        if (candidate === n) {
            continue; // n itself never counts
        }
        const distance = distanceBetween(candidate, n);
        if (best === null) {
            best = candidate;
            bestDistance = distance;
            continue;
        }
        const order = compareByDigits(distance, bestDistance);
        if (order < 0 || (order === 0 && compareByDigits(candidate, best) < 0)) {
            best = candidate;
            bestDistance = distance;
        }
    }
    return best;
};

// Order of two non-negative decimal strings by value: the shorter is the
// smaller, equal lengths compare digit by digit - none has a leading zero.
function compareByDigits(a, b) {
    if (a.length !== b.length) {
        return a.length < b.length ? -1 : 1;
    }
    if (a === b) {
        return 0;
    }
    return a < b ? -1 : 1;
}

// |a - b| as a decimal string, subtracting the smaller from the larger.
function distanceBetween(a, b) {
    return compareByDigits(a, b) >= 0 ? subtractDigits(a, b) : subtractDigits(b, a);
}

// a - b for decimal strings with a >= b >= 0: schoolbook subtraction,
// borrowing like on paper, then stripping the difference's leading zeros.
function subtractDigits(a, b) {
    const digits = [];
    let borrow = 0;
    let i = a.length - 1;
    let j = b.length - 1;
    while (i >= 0) {
        let digit = a.charCodeAt(i) - 48 - borrow - (j >= 0 ? b.charCodeAt(j) - 48 : 0);
        if (digit < 0) {
            digit += 10;
            borrow = 1;
        } else {
            borrow = 0;
        }
        digits.push(digit);
        i--;
        j--;
    }
    while (digits.length > 1 && digits[digits.length - 1] === 0) {
        digits.pop();
    }
    return digits.reverse().join("");
}
