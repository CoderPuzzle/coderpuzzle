/**
 * @param {string} num
 * @param {number} t
 * @return {string}
 */
var smallestNumber = function (num, t) {
    // A product of nonzero digits only ever carries the primes 2, 3, 5 and
    // 7, so any other prime factor in t makes the request impossible. Both
    // t (< 2^53) and every later quantity (exponent counts below 10^6) stay
    // exact as plain numbers, so no BigInt is needed.
    const primes = [2, 3, 5, 7];
    const need = [0, 0, 0, 0];
    primes.forEach((prime, idx) => {
        while (t % prime === 0) {
            t /= prime;
            need[idx] += 1;
        }
    });
    if (t !== 1) return "-1";
    // Per-digit exponent vectors over the primes (2, 3, 5, 7).
    const vec = Array.from({ length: 10 }, () => [0, 0, 0, 0]);
    for (let d = 2; d <= 9; d++) {
        primes.forEach((prime, idx) => {
            for (let rest = d; rest % prime === 0; rest /= prime) {
                vec[d][idx] += 1;
            }
        });
    }
    // Fewest digits whose product covers r: a 5 or a 7 in r always burns a
    // dedicated digit; among twos and threes, eights carry three twos,
    // nines two threes, and a six trades one of each, and that trade only
    // pays for the first couple of leftovers.
    const minDigits = (r) => {
        let best = r[2] + r[3] + Math.floor((r[0] + 2) / 3) + Math.floor((r[1] + 1) / 2);
        for (let z = 1; z <= Math.min(r[0], r[1], 5); z++) {
            best = Math.min(best, r[2] + r[3] + z + Math.floor((r[0] - z + 2) / 3) + Math.floor((r[1] - z + 1) / 2));
        }
        return best;
    };
    // Lexicographically smallest zero-free string of exactly this length
    // covering r: place the smallest digit that leaves a remainder the
    // positions still open can cover.
    const build = (length, r) => {
        const out = [];
        for (let pos = 0; pos < length; pos++) {
            for (let d = 1; d <= 9; d++) {
                const nxt = r.map((amount, k) => Math.max(0, amount - vec[d][k]));
                if (minDigits(nxt) <= length - pos - 1) {
                    out.push(String(d));
                    r = nxt;
                    break;
                }
            }
        }
        return out.join("");
    };
    const n = num.length;
    // A kept 0 would poison the product, so nothing at or past the first
    // zero can be retained; the prefix sums cover the zero-free head.
    const zeroAt = num.indexOf("0");
    const firstZero = zeroAt === -1 ? n : zeroAt;
    const prefix = [[0, 0, 0, 0]];
    for (let i = 0; i < firstZero; i++) {
        const last = prefix[i];
        const add = vec[num.charCodeAt(i) - 48];
        prefix.push([last[0] + add[0], last[1] + add[1], last[2] + add[2], last[3] + add[3]]);
    }
    if (firstZero === n && need.every((amount, k) => prefix[n][k] >= amount)) {
        return num;
    }
    // Keep the longest possible prefix and raise exactly one digit: a longer
    // kept prefix always wins, then a smaller raised digit, then a minimal
    // suffix. The shortfall shrinks as the split moves left while the free
    // suffix grows, so the first workable split is the answer, and only a
    // handful of splits near the end can fail.
    for (let i = Math.min(n - 1, firstZero); i >= 0; i--) {
        const free = n - 1 - i;
        for (let d = num.charCodeAt(i) - 47; d <= 9; d++) {
            const r = need.map((amount, k) => Math.max(0, amount - prefix[i][k] - vec[d][k]));
            if (minDigits(r) <= free) {
                return num.slice(0, i) + d + build(free, r);
            }
        }
    }
    // No same-length number works: the smallest longer zero-free number is
    // leading 1s with just enough covering digits at the very end.
    return build(Math.max(n + 1, minDigits(need)), need.slice());
};
