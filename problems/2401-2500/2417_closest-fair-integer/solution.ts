function closestFair(n: number): number {
    // A fair integer needs an even digit count with half of the digits odd.
    const isFair = (x: number): boolean => {
        let odd = 0;
        let length = 0;
        while (x > 0) {
            if (x % 2 === 1) odd++;
            length++;
            x = Math.floor(x / 10);
        }
        return length % 2 === 0 && odd * 2 === length;
    };
    const digits = String(n).length;
    if (digits % 2 === 1) {
        const half = (digits + 1) / 2;
        return parseInt("1" + "0".repeat(half) + "1".repeat(half - 1));
    }
    // Even digit count: the next fair integer is close, so scan upward.
    for (let k = n; k < 10 ** digits; ++k) {
        if (isFair(k)) return k;
    }
    const half = (digits + 2) / 2;
    return parseInt("1" + "0".repeat(half) + "1".repeat(half - 1));
}
