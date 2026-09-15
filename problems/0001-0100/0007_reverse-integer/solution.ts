function reverse(x: number): number {
    let rev = 0;
    while (x !== 0) {
        // TS/JS remainder truncates toward zero, so the popped digit carries
        // the sign: -123 pops -3, -2, -1 and builds -321. Subtracting it
        // before dividing keeps the division exact in the float domain.
        const pop = x % 10;
        x = (x - pop) / 10;
        // Clamp before the push, never after: the statement forbids 64-bit
        // slack, so rev * 10 + pop must provably stay in range. The edge
        // digits are 7 (2147483647) and -8 (-2147483648).
        if (rev > 214748364 || (rev === 214748364 && pop > 7)) return 0;
        if (rev < -214748364 || (rev === -214748364 && pop < -8)) return 0;
        rev = rev * 10 + pop;
    }
    return rev;
}
