/**
 * @param {number} left
 * @param {number} right
 * @return {string}
 */
var abbreviateProduct = function (left, right) {
    const modulus = 10000000000;
    let logarithm = 0;
    let twos = 0;
    let fives = 0;
    let suffix = 1;
    for (let value = left; value <= right; value++) {
        logarithm += Math.log10(value);
        let remaining = value;
        while (remaining % 2 === 0) {
            twos++;
            remaining /= 2;
        }
        while (remaining % 5 === 0) {
            fives++;
            remaining /= 5;
        }
        suffix = (suffix * remaining) % modulus;
    }

    const zeros = Math.min(twos, fives);
    for (let count = zeros; count < twos; count++) {
        suffix = (suffix * 2) % modulus;
    }
    for (let count = zeros; count < fives; count++) {
        suffix = (suffix * 5) % modulus;
    }

    const adjustedLogarithm = logarithm - zeros;
    const digits = Math.floor(adjustedLogarithm) + 1;
    if (digits <= 10) {
        return `${suffix}e${zeros}`;
    }
    const fractional = adjustedLogarithm - Math.floor(adjustedLogarithm);
    const prefix = Math.floor(10 ** (fractional + 4));
    return `${prefix}...${String(suffix % 100000).padStart(5, "0")}e${zeros}`;
};
