function removeZeros(n: number): number {
    // Rebuild the answer while peeling digits off n's least significant
    // end: place tracks the slot the next surviving digit occupies, and
    // zero digits fall through without touching result or place.
    let result = 0;
    let place = 1;
    while (n > 0) {
        const digit = n % 10;
        if (digit !== 0) {
            result += digit * place;
            place *= 10;
        }
        // Math.floor division stands in for integer division because JS
        // bitwise operators truncate to 32 bits, while every value here
        // stays below 2^53 (n <= 10^15).
        n = Math.floor(n / 10);
    }
    return result;
}
