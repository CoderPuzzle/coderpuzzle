function countDifferentSubsequenceGCDs(nums: number[]): number {
    let maxVal = 0;
    for (const v of nums) {
        if (v > maxVal) maxVal = v;
    }
    const present: boolean[] = new Array(maxVal + 1).fill(false);
    for (const v of nums) present[v] = true;
    const gcd = (a: number, b: number): number => {
        while (b !== 0) {
            const t = a % b;
            a = b;
            b = t;
        }
        return a;
    };
    let count = 0;
    // g is achievable iff the gcd of ALL present multiples of g is exactly g:
    // taking every divisible element minimizes the gcd, so no other subset can do better.
    for (let g = 1; g <= maxVal; g++) {
        let running = 0; // gcd(0, x) = x, so 0 is the identity seed
        for (let multiple = g; multiple <= maxVal; multiple += g) {
            if (present[multiple]) {
                running = gcd(running, multiple);
                if (running === g) {
                    // Folding more multiples can only shrink the gcd — confirmed, stop early.
                    count++;
                    break;
                }
            }
        }
    }
    return count;
}
