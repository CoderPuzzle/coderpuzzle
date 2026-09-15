function smallestPalindrome(s: string, k: number): string {
    // The k-th palindrome is the k-th arrangement of the forced half
    // multiset (count[c] // 2 of each letter), mirrored around the lone
    // odd letter. Walk the half's positions picking, smallest letter first,
    // the letter whose block still contains rank k. Multinomials are capped
    // at k; every intermediate stays below k * n <= 10^6 * 5000 < 2^53, so
    // JS numbers are exact throughout.
    let remaining = k;
    const counts = new Array<number>(26).fill(0);
    for (const ch of s) counts[ch.charCodeAt(0) - 97] += 1;
    const half = new Array<number>(26).fill(0);
    let middle = "";
    for (let i = 0; i < 26; ++i) {
        half[i] = counts[i] >> 1;
        if (counts[i] % 2 === 1) middle = String.fromCharCode(97 + i);
    }
    const m = s.length >> 1;
    // min(multinomial of the half counts over r slots, remaining): a product
    // of binomials abandoned the moment it reaches remaining.
    const arrangements = (h: number[], r: number): number => {
        let acc = 1;
        let rem = r;
        for (let i = 0; i < 26; ++i) {
            const c = h[i];
            if (c === 0) continue;
            const small = Math.min(c, rem - c);
            let binom = 1;
            for (let j = 1; j <= small; ++j) {
                binom = (binom * (rem - small + j)) / j;
                if (binom >= remaining) {
                    binom = remaining;
                    break;
                }
            }
            acc *= binom;
            if (acc >= remaining) return remaining;
            rem -= c;
        }
        return acc;
    };
    if (arrangements(half, m) < remaining) return "";
    const picked: string[] = [];
    let r = m;
    while (r > 0) {
        for (let c = 0; c < 26; ++c) {
            if (half[c] === 0) continue;
            half[c] -= 1;
            const ways = arrangements(half, r - 1);
            if (remaining <= ways) {
                picked.push(String.fromCharCode(97 + c));
                r -= 1;
                break;
            }
            remaining -= ways;
            half[c] += 1;
        }
    }
    return picked.join("") + middle + picked.reverse().join("");
}
