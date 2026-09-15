// (arr[i] * arr[i+1]) - arr[i] - arr[i+1] = (arr[i]-1) * (arr[i+1]-1) - 1,
// which is even exactly when BOTH neighbors are even — so k-even means
// exactly k adjacent pairs have both elements even. With E = floor(m/2)
// even values and O = m - E odd values, track per length i, for each pair
// count j, how many arrays end in an even value and how many end in an
// odd one. Extending by an even value (E choices) lifts an even-ending
// j-1-pair state to j pairs and leaves odd-ending states in place;
// extending by an odd value (O choices) never changes the count. Entries
// stay below MOD, so every join multiplies a value below 2 * MOD by at
// most 500 — about 10^12, well inside 2^53 and exact in IEEE doubles.
function countOfArrays(n: number, m: number, k: number): number {
    const MOD = 1000000007;
    const even = Math.floor(m / 2);
    const odd = m - even;
    let endEven: number[] = new Array(n).fill(0);
    let endOdd: number[] = new Array(n).fill(0);
    endEven[0] = even;
    endOdd[0] = odd;
    for (let len = 1; len < n; len += 1) {
        const nextEven: number[] = new Array(n).fill(0);
        const nextOdd: number[] = new Array(n).fill(0);
        for (let j = 0; j < n; j += 1) {
            nextEven[j] = (((j > 0 ? endEven[j - 1] : 0) + endOdd[j]) * even) % MOD;
            nextOdd[j] = ((endEven[j] + endOdd[j]) * odd) % MOD;
        }
        endEven = nextEven;
        endOdd = nextOdd;
    }
    return (endEven[k] + endOdd[k]) % MOD;
}
