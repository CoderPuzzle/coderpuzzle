/**
 * @param {number[]} nums
 * @return {number}
 */
var numOfWays = function (nums) {
    const MOD = 1000000007n;
    const n = nums.length;

    // Factorials and their modular inverses (Fermat's little theorem: MOD
    // is prime, so inv(k!) == (k!)**(MOD - 2n) mod MOD) answer every
    // C(a, b) query in O(1). BigInt keeps every product exact.
    const fact = new Array(n + 1);
    fact[0] = 1n;
    for (let i = 1; i <= n; i++) {
        fact[i] = (fact[i - 1] * BigInt(i)) % MOD;
    }
    const power = (base, exp) => {
        let result = 1n;
        base %= MOD;
        while (exp > 0n) {
            if (exp & 1n) result = (result * base) % MOD;
            base = (base * base) % MOD;
            exp >>= 1n;
        }
        return result;
    };
    const invFact = new Array(n + 1);
    invFact[n] = power(fact[n], MOD - 2n);
    for (let i = n; i >= 1; i--) {
        invFact[i - 1] = (invFact[i] * BigInt(i)) % MOD;
    }

    const comb = (a, b) => (((fact[a] * invFact[b]) % MOD) * invFact[a - b]) % MOD;

    // ways(arr) counts every reordering of arr (including arr itself) that
    // builds the same BST: split at the root arr[0], recurse on the
    // smaller-than-root and larger-than-root runs (each must keep its own
    // relative order), then multiply by the number of ways to interleave
    // the two runs into one sequence of their combined length, which is
    // the binomial coefficient of the two run sizes.
    const ways = (arr) => {
        if (arr.length <= 1) return 1n;
        const root = arr[0];
        const left = [];
        const right = [];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < root) left.push(arr[i]);
            else right.push(arr[i]);
        }
        const c = comb(left.length + right.length, left.length);
        return (((c * ways(left)) % MOD) * ways(right)) % MOD;
    };

    // The problem excludes the original array from the count.
    return Number((((ways(nums) - 1n) % MOD) + MOD) % MOD);
};
