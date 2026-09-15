/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countXorSubarrays = function (nums, k) {
    // Prefix XOR turns subarrays into pairs: nums[i..j) has XOR
    // P[i] ^ P[j], so the answer counts prefix pairs i < j whose XOR
    // reaches k. Each prefix is inserted into a binary trie and then
    // queried against everything now in it, counting every pair once at
    // its right endpoint — plus the n+1 self-pairs (XOR 0), which only
    // qualify when k = 0 and are subtracted at the end. At a 0-bit of k
    // every trie prefix taking the flipped branch already exceeds k; at
    // a 1-bit only the flipped branch can still reach k. Falling out of
    // the walk leaves prefixes matching all 30 bits, i.e. XOR == k,
    // which still qualifies. 30 bits cover every prefix: values are <=
    // 10^9 < 2^30. The answer is at most n(n+1)/2 = 5000050000, far
    // below 2^53, so plain numbers stay exact.
    const n = nums.length;
    const maxNodes = (n + 1) * 30 + 1;
    const child0 = new Int32Array(maxNodes);
    const child1 = new Int32Array(maxNodes);
    const cnt = new Int32Array(maxNodes);
    let nodes = 1;
    let ans = 0;
    let p = 0;
    for (let j = 0; j <= n; j++) {
        if (j > 0) {
            p ^= nums[j - 1];
        }
        let node = 0;
        for (let t = 29; t >= 0; t--) {
            const bit = (p >>> t) & 1;
            if (bit === 0) {
                if (child0[node] === 0) {
                    child0[node] = nodes;
                    nodes++;
                }
                node = child0[node];
            } else {
                if (child1[node] === 0) {
                    child1[node] = nodes;
                    nodes++;
                }
                node = child1[node];
            }
            cnt[node]++;
        }
        node = 0;
        let matched = true;
        for (let t = 29; t >= 0; t--) {
            const bit = (p >>> t) & 1;
            const flip = bit === 0 ? child1[node] : child0[node];
            if (((k >>> t) & 1) === 1) {
                if (flip === 0) {
                    matched = false;
                    break;
                }
                node = flip;
            } else {
                if (flip !== 0) {
                    ans += cnt[flip];
                }
                const same = bit === 0 ? child0[node] : child1[node];
                if (same === 0) {
                    matched = false;
                    break;
                }
                node = same;
            }
        }
        if (matched) {
            ans += cnt[node];
        }
    }
    return ans - (k === 0 ? n + 1 : 0);
};
