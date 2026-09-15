function maxProduct(n: number): number {
    // All digits are >= 0, so the best pair product is the product of the
    // two largest digits; sorting the (at most 10) digits and taking the
    // top two answers every case, repeated digits included.
    const digits = String(n)
        .split("")
        .map(Number)
        .sort((a, b) => b - a);
    return digits[0] * digits[1];
}
