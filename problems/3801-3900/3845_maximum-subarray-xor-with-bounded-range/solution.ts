// Bounds: nums[i] < 2^15 and XOR never widens a value, so every prefix
// xor, subarray value, and the answer stay below 2^15: 15 trie levels
// (bit 14 down to bit 0) cover the universe, and every intermediate sits
// far inside TS's exact 32-bit bitwise range.
function maxXor(nums: number[], k: number): number {
    const n = nums.length;
    const pref = new Int32Array(n + 1);
    for (let i = 0; i < n; i++) {
        pref[i + 1] = pref[i] ^ nums[i];
    }
    const size = 15 * n + 1;
    const child = new Int32Array(2 * size).fill(-1); // child[2j], child[2j+1]
    const cnt = new Int32Array(size);
    let nodes = 1; // next free node id; node 0 is the root
    const maxQ: number[] = []; // indices of max candidates, values decreasing
    const minQ: number[] = []; // indices of min candidates, values increasing
    let maxHead = 0;
    let minHead = 0;
    let left = 0;
    let best = 0;
    for (let right = 0; right < n; right++) {
        const x = nums[right];
        while (maxQ.length > maxHead && nums[maxQ[maxQ.length - 1]] <= x) {
            maxQ.pop();
        }
        maxQ.push(right);
        while (minQ.length > minHead && nums[minQ[minQ.length - 1]] >= x) {
            minQ.pop();
        }
        minQ.push(right);
        // Valid starts are exactly [left, right]: shrink from the left
        // while the window spread exceeds k, retiring pref[left] from the
        // trie as each start index leaves. A single element has spread
        // 0 <= k, so the loop always stops.
        while (nums[maxQ[maxHead]] - nums[minQ[minHead]] > k) {
            if (maxQ[maxHead] === left) {
                maxHead++;
            }
            if (minQ[minHead] === left) {
                minHead++;
            }
            const v = pref[left];
            let node = 0;
            cnt[0]--;
            for (let b = 14; b >= 0; b--) {
                node = child[2 * node + ((v >> b) & 1)];
                cnt[node]--;
            }
            left++;
        }
        // Insert pref[right]: start index right becomes eligible.
        const v = pref[right];
        let node = 0;
        cnt[0]++;
        for (let b = 14; b >= 0; b--) {
            const slot = 2 * node + ((v >> b) & 1);
            let nxt = child[slot];
            if (nxt < 0) {
                nxt = nodes++;
                child[slot] = nxt;
            }
            node = nxt;
            cnt[node]++;
        }
        // Best subarray ending at right: max pref[right + 1] ^ pref[l] over
        // l in [left, right]. Greedy walk, preferring the child whose bit
        // differs from pref[right + 1] (setting the result bit) while that
        // branch is alive (nonempty count).
        const q = pref[right + 1];
        node = 0;
        let cur = 0;
        for (let b = 14; b >= 0; b--) {
            const d = (q >> b) & 1;
            const nxt = child[2 * node + (d ^ 1)];
            if (nxt >= 0 && cnt[nxt] > 0) {
                cur |= 1 << b;
                node = nxt;
            } else {
                node = child[2 * node + d];
            }
        }
        if (cur > best) {
            best = cur;
        }
    }
    return best;
}
