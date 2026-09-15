// Group every value 0..5000 by the sum of its digits; the groups are
// sorted, so a prefix sum plus upper-bound counts every predecessor whose
// value is at most a candidate's value in O(log).
function countArrays(digitSum: number[]): number {
    const MOD = 1000000007;
    const groups: number[][] = Array.from({ length: 51 }, () => []);
    for (let value = 0; value <= 5000; value++) {
        let total = 0;
        let rest = value;
        while (rest > 0) {
            total += rest % 10;
            rest = Math.floor(rest / 10);
        }
        groups[total].push(value);
    }
    const upperBound = (sorted: number[], target: number): number => {
        let lo = 0;
        let hi = sorted.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (sorted[mid] <= target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };
    let previous = groups[digitSum[0]];
    if (previous.length === 0) return 0;
    let dp: number[] = new Array(previous.length).fill(1);
    for (let p = 1; p < digitSum.length; p++) {
        const current = groups[digitSum[p]];
        if (current.length === 0) return 0;
        const prefix: number[] = new Array(dp.length + 1).fill(0);
        for (let i = 0; i < dp.length; i++) {
            prefix[i + 1] = (prefix[i] + dp[i]) % MOD;
        }
        const next: number[] = new Array(current.length);
        for (let k = 0; k < current.length; k++) {
            next[k] = prefix[upperBound(previous, current[k])];
        }
        dp = next;
        previous = current;
    }
    let answer = 0;
    for (const ways of dp) {
        answer = (answer + ways) % MOD;
    }
    return answer;
}
