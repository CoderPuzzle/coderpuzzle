/**
 * @param {string} sentence
 * @param {number} discount
 * @return {string}
 */
var discountPrices = function (sentence, discount) {
    // A word is a price exactly when '$' leads a run of digits only. Ten-digit
    // prices times 100 stay far below Number.MAX_SAFE_INTEGER, so the cent math
    // is exact and the two decimals never involve any rounding decision.
    return sentence
        .split(" ")
        .map((word) => {
            if (word.length > 1 && word[0] === "$" && /^\d+$/.test(word.slice(1))) {
                const cents = parseInt(word.slice(1), 10) * (100 - discount);
                return "$" + Math.floor(cents / 100) + "." + String(cents % 100).padStart(2, "0");
            }
            return word;
        })
        .join(" ");
};
