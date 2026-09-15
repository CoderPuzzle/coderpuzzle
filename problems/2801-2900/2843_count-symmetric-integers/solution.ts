function countSymmetricIntegers(low: number, high: number): number {
    // An even-length decimal string is symmetric exactly when its two
    // halves have equal digit sums; odd-length numbers are never
    // symmetric. Digit counts stay below 6 on the constraint domain.
    let count = 0;
    for (let value = low; value <= high; value++) {
        const digits = String(value);
        const n = digits.length;
        if (n % 2 !== 0) {
            continue;
        }
        const half = n / 2;
        let firstSum = 0;
        let lastSum = 0;
        for (let i = 0; i < half; i++) {
            firstSum += digits.charCodeAt(i) - 48;
            lastSum += digits.charCodeAt(half + i) - 48;
        }
        if (firstSum === lastSum) {
            count++;
        }
    }
    return count;
}
