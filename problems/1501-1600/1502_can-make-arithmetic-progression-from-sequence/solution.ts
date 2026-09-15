function canMakeArithmeticProgression(arr: number[]): boolean {
    // Sorting produces the one arrangement that could possibly be a valid
    // progression; check its consecutive gaps are all equal.
    const a = [...arr].sort((x, y) => x - y);
    const diff = a[1] - a[0];
    for (let i = 2; i < a.length; ++i) {
        if (a[i] - a[i - 1] !== diff) {
            return false;
        }
    }
    return true;
}
