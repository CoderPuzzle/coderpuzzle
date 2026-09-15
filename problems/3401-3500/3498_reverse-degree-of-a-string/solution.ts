function reverseDegree(s: string): number {
    // Each character contributes its reversed-alphabet value (26 - letter
    // rank) times its 1-indexed string position; sum over the whole string.
    let total = 0;
    for (let i = 0; i < s.length; i++) {
        total += (26 - (s.charCodeAt(i) - 97)) * (i + 1);
    }
    return total;
}
