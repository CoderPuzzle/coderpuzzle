function kthFactor(n: number, k: number): number {
    // Count divisors of n up to m by pairing d with n / d.
    const countAtMost = (m: number): number => {
        let count = 0;
        for (let d = 1; d * d <= n; ++d) {
            if (n % d === 0) {
                if (d <= m) count++;
                const complement = n / d;
                if (complement !== d && complement <= m) count++;
            }
        }
        return count;
    };
    let lo = 1;
    let hi = n;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (countAtMost(mid) >= k) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return countAtMost(lo) >= k ? lo : -1;
}
