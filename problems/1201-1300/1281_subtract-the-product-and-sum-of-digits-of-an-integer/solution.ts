// Peel digits from the right: n % 10 is the last digit, floor division
// discards it. Product and sum absorb each digit as it comes off.
function subtractProductAndSum(n: number): number {
    let product = 1;
    let total = 0;
    while (n > 0) {
        const digit = n % 10;
        product *= digit;
        total += digit;
        n = Math.floor(n / 10);
    }
    return product - total;
}
