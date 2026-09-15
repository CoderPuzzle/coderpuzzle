function calculateTax(brackets: number[][], income: number): number {
    // Walk the brackets in order; each is taxed on the slice of income
    // between the previous upper bound and min(income, upper).
    let paid = 0;
    let prev = 0;
    for (const [upper, percent] of brackets) {
        if (income <= upper) {
            paid += (income - prev) * percent;
            break;
        }
        paid += (upper - prev) * percent;
        prev = upper;
    }
    // The product sum stays far below 2^53, so Number arithmetic is exact
    // until the single division, which rounds the rational total correctly.
    return paid / 100;
}
