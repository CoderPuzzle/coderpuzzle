/**
 * @param {number[]} perm
 * @return {number}
 */
var getPermutationIndex = function (perm) {
    const MOD = 1000000007;
    const n = perm.length;
    // fact[i] = i!; position i's Lehmer digit weighs (n - 1 - i)!
    const fact = new Array(n).fill(1);
    for (let i = 1; i < n; i++) {
        fact[i] = Number((BigInt(fact[i - 1]) * BigInt(i)) % BigInt(MOD));
    }

    const tree = new Array(n + 1).fill(0);

    function add(i, delta) {
        while (i <= n) {
            tree[i] += delta;
            i += i & -i;
        }
    }

    function query(i) {
        let s = 0;
        while (i > 0) {
            s += tree[i];
            i -= i & -i;
        }
        return s;
    }

    // Fenwick tree over values 1..n tracks which values are still unused
    for (let v = 1; v <= n; v++) {
        add(v, 1);
    }

    let ans = 0;
    for (let i = 0; i < n; i++) {
        const x = perm[i];
        // Lehmer digit: how many unused values are smaller than perm[i]
        const smaller = query(x - 1);
        // each such value placed here leads (n - 1 - i)! earlier permutations
        ans = Number((BigInt(ans) + BigInt(smaller) * BigInt(fact[n - 1 - i])) % BigInt(MOD));
        // perm[i] is spent; later positions see only the remaining values
        add(x, -1);
    }
    return ans;
};
