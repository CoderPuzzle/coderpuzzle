function twoSum(numbers: number[], target: number): number[] {
    const n = numbers.length;
    for (let i = 0; i + 1 < n; i++) {
        const complement = target - numbers[i];
        // The sorted remainder numbers[i+1..] is the only legal partner
        // range: a position cannot pair with itself.
        let lo = i + 1,
            hi = n - 1;
        while (lo <= hi) {
            const mid = lo + Math.floor((hi - lo) / 2);
            if (numbers[mid] === complement) {
                // 1-based indices, smaller position first.
                return [i + 1, mid + 1];
            }
            if (numbers[mid] < complement) lo = mid + 1;
            // The complement sits left of mid.
            else hi = mid - 1;
        }
    }
    // Unreachable under the uniqueness promise; keeps the function total.
    return [];
}
