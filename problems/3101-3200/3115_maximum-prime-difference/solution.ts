// One pass keeping the first and the last prime-bearing index; the answer
// is their distance. Primality by trial division is cheap because values
// never exceed 100 (at most 9 divisor probes).
function maximumPrimeDifference(nums: number[]): number {
    const isPrime = (v: number): boolean => {
        if (v < 2) return false;
        for (let d = 2; d * d <= v; ++d) {
            if (v % d === 0) return false;
        }
        return true;
    };
    let first = -1;
    let last = -1;
    for (let i = 0; i < nums.length; ++i) {
        if (!isPrime(nums[i])) continue;
        if (first === -1) first = i;
        last = i;
    }
    return last - first;
}
