function superPow(a: number, b: number[]): number {
    // Appending digit d to the digits-so-far x moves the exponent to
    // 10x + d, and a^(10x+d) = (a^x)^10 * a^d — so one left-to-right
    // pass keeps result = a^x mod 1337, replacing it with result^10 *
    // a^d each step. powmod is square-and-multiply and reduces its
    // base mod 1337, so every product stays below 1337^2 = 1,787,569,
    // well inside a double's 53 exact bits.
    const powmod = (base: number, exponent: number): number => {
        let result = 1;
        base %= 1337;
        while (exponent > 0) {
            if (exponent & 1) result = (result * base) % 1337;
            base = (base * base) % 1337;
            exponent >>= 1;
        }
        return result;
    };
    let result = 1;
    for (const digit of b) {
        result = (powmod(result, 10) * powmod(a, digit)) % 1337;
    }
    return result;
}
