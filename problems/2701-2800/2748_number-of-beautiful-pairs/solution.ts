function countBeautifulPairs(nums: number[]): number {
    // Euclid on two single digits; both are in 1..9 so this is tiny.
    const gcd = (a: number, b: number): number => {
        while (b !== 0) {
            const t = a % b;
            a = b;
            b = t;
        }
        return a;
    };
    // A pair is beautiful iff the first digit of nums[i] and the last digit
    // of nums[j] are coprime; n <= 100, so test every pair.
    let count = 0;
    for (let i = 0; i < nums.length; ++i) {
        // Leading digit of nums[i] straight from its decimal string.
        const first = Number(String(nums[i])[0]);
        for (let j = i + 1; j < nums.length; ++j) {
            // Last digit is nonzero by the constraints, and gcd(1, d)
            // == 1 makes every pair with a first digit of 1 beautiful,
            // including two 1s.
            if (gcd(first, nums[j] % 10) === 1) ++count;
        }
    }
    return count;
}
