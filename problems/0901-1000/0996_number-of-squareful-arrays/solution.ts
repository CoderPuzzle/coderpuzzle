// Equal values are interchangeable, so a permutation is decided by how many
// copies of each distinct value land at each step — collapse nums to
// distinct values with multiplicities, precompute which value pairs sum to
// a perfect square, and depth-first search: extend a partial sequence only
// through adjacent values that are still in stock; a branch consuming all n
// elements is one squareful permutation. Pair sums reach 2 * 10^9, below
// 2^53, so the rounded double root is exact — see isSquare below.
function numSquarefulPerms(nums: number[]): number {
    const values = [...new Set(nums)].sort((a, b) => a - b);
    const d = values.length;
    const counts = values.map((v) => nums.filter((x) => x === v).length);
    const adj: boolean[][] = values.map((a) => values.map((b) => isSquare(a + b)));
    const walk = (prev: number, left: number): number => {
        if (left === 0) {
            return 1;
        }
        let total = 0;
        for (let j = 0; j < d; ++j) {
            if (counts[j] > 0 && adj[prev][j]) {
                counts[j]--;
                total += walk(j, left - 1);
                counts[j]++;
            }
        }
        return total;
    };
    let answer = 0;
    for (let start = 0; start < d; ++start) {
        counts[start]--;
        answer += walk(start, nums.length - 1);
        counts[start]++;
    }
    return answer;
}

// A pair sum is at most 2 * 10^9 < 2^53, so rounding the double root and
// checking r * r === s is an exact square test.
function isSquare(s: number): boolean {
    const r = Math.round(Math.sqrt(s));
    return r * r === s;
}
