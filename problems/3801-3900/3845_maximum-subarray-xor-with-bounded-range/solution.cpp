#include <vector>

class Solution {
  public:
    int maxXor(vector<int> &nums, int k) {
        // Bounds: nums[i] < 2^15 and XOR never widens a value, so every
        // prefix xor, subarray value, and the answer stay below 2^15: 15
        // trie levels (bit 14 down to bit 0) cover the universe.
        int n = (int)nums.size();
        vector<int> pref(n + 1);
        for (int i = 0; i < n; i++) {
            pref[i + 1] = pref[i] ^ nums[i];
        }
        int size = 15 * n + 1;
        vector<int> child(2 * size, -1); // children of node j: child[2j], child[2j+1]
        vector<int> cnt(size, 0);
        int nodes = 1;       // next free node id; node 0 is the root
        vector<int> maxQ(n); // indices of max candidates, values decreasing
        vector<int> minQ(n); // indices of min candidates, values increasing
        int maxHead = 0, maxTail = 0, minHead = 0, minTail = 0;
        int left = 0;
        int best = 0;
        for (int right = 0; right < n; right++) {
            int x = nums[right];
            while (maxHead < maxTail && nums[maxQ[maxTail - 1]] <= x) {
                maxTail--;
            }
            maxQ[maxTail++] = right;
            while (minHead < minTail && nums[minQ[minTail - 1]] >= x) {
                minTail--;
            }
            minQ[minTail++] = right;
            // Valid starts are exactly [left, right]: shrink from the left
            // while the window spread exceeds k, retiring pref[left] from
            // the trie as each start index leaves. A single element has
            // spread 0 <= k, so the loop always stops.
            while (nums[maxQ[maxHead]] - nums[minQ[minHead]] > k) {
                if (maxQ[maxHead] == left) {
                    maxHead++;
                }
                if (minQ[minHead] == left) {
                    minHead++;
                }
                int v = pref[left];
                int node = 0;
                cnt[0]--;
                for (int b = 14; b >= 0; b--) {
                    node = child[2 * node + ((v >> b) & 1)];
                    cnt[node]--;
                }
                left++;
            }
            // Insert pref[right]: start index right becomes eligible.
            int v = pref[right];
            int node = 0;
            cnt[0]++;
            for (int b = 14; b >= 0; b--) {
                int slot = 2 * node + ((v >> b) & 1);
                int nxt = child[slot];
                if (nxt < 0) {
                    nxt = nodes++;
                    child[slot] = nxt;
                }
                node = nxt;
                cnt[node]++;
            }
            // Best subarray ending at right: max pref[right + 1] ^ pref[l]
            // over l in [left, right]. Greedy walk, preferring the child
            // whose bit differs from pref[right + 1] (setting the result
            // bit) while that branch is alive (nonempty count).
            int q = pref[right + 1];
            node = 0;
            int cur = 0;
            for (int b = 14; b >= 0; b--) {
                int d = (q >> b) & 1;
                int nxt = child[2 * node + (d ^ 1)];
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
};
