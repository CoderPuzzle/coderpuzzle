/**
 * @param {number[]} strength
 * @return {number}
 */
var totalStrength = function (strength) {
    const MOD = 1000000007;
    const n = strength.length;

    // prev[i]: index of nearest strictly-smaller element to the left, else -1.
    const prev = new Array(n);
    let stack = [];
    for (let i = 0; i < n; i++) {
        while (stack.length && strength[stack[stack.length - 1]] >= strength[i]) {
            stack.pop();
        }
        prev[i] = stack.length ? stack[stack.length - 1] : -1;
        stack.push(i);
    }

    // nxt[i]: index of nearest element <= strength[i] to the right, else n.
    const nxt = new Array(n);
    stack = [];
    for (let i = n - 1; i >= 0; i--) {
        while (stack.length && strength[stack[stack.length - 1]] > strength[i]) {
            stack.pop();
        }
        nxt[i] = stack.length ? stack[stack.length - 1] : n;
        stack.push(i);
    }

    // All prefix sums are kept reduced mod MOD; only residues are needed below.
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = (prefix[i] + strength[i]) % MOD;
    }

    // pre_prefix[k] = sum of prefix[0..k-1]
    const prePrefix = new Array(n + 2).fill(0);
    for (let i = 0; i <= n; i++) {
        prePrefix[i + 1] = (prePrefix[i] + prefix[i]) % MOD;
    }

    // Exact modular product for values up to ~2^30 each (avoids >2^53 doubles).
    const mulmod = (a, b) => {
        a %= MOD;
        b %= MOD;
        const a1 = Math.floor(a / 32768); // high 15 bits of a
        const a0 = a % 32768; // low 15 bits of a
        return (((a1 * b) % MOD) * 32768 + ((a0 * b) % MOD)) % MOD;
    };

    let answer = 0;
    for (let i = 0; i < n; i++) {
        const left = i - prev[i];
        const right = nxt[i] - i;
        const sumLeft = (prePrefix[i + 1] - prePrefix[prev[i] + 1] + MOD) % MOD;
        const sumRight = (prePrefix[nxt[i] + 1] - prePrefix[i + 1] + MOD) % MOD;
        let term = (left * sumRight - right * sumLeft) % MOD;
        term = ((term % MOD) + MOD) % MOD; // Python's % is always non-negative
        const contribution = mulmod(strength[i], term);
        answer = (answer + contribution) % MOD;
    }
    return answer;
};
