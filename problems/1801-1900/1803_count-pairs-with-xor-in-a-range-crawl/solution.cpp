// Number of trie values y with x XOR y <= k: a 1 bit of k counts the whole
// subtree that keeps the xor prefix equal so far (the remaining suffix is
// then strictly smaller) and descends the other child, while a 0 bit only
// lets the matching child continue.
int countAtMost(vector<int> &nxt, vector<int> &cnt, int x, int k) {
    int node = 0, total = 0;
    for (int b = 14; b >= 0; --b) {
        int xb = (x >> b) & 1;
        if ((k >> b) & 1) {
            if (nxt[2 * node + xb] != -1)
                total += cnt[nxt[2 * node + xb]];
            node = nxt[2 * node + 1 - xb];
        } else {
            node = nxt[2 * node + xb];
        }
        if (node == -1)
            return total;
    }
    return total + cnt[node];
}

class Solution {
  public:
    int countPairs(vector<int> &nums, int low, int high) {
        // The range condition splits into two "at most" counts: the answer is
        // f(high) - f(low - 1), where f(K) counts earlier values y with
        // x XOR y <= K. Every value fits in 15 bits (2 * 10^4 < 2^15), so the
        // trie walks 15 levels, top bit first. Children of node live at
        // 2 * node and 2 * node + 1 in nxt; each element is counted against
        // the trie before it is inserted, so every unordered pair is counted
        // exactly once.
        int cap = 15 * (int)nums.size() + 1;
        vector<int> nxt(2 * cap, -1);
        vector<int> cnt(cap, 0);
        int size = 1, answer = 0;
        for (int x : nums) {
            answer += countAtMost(nxt, cnt, x, high);
            answer -= countAtMost(nxt, cnt, x, low - 1);
            int node = 0;
            for (int b = 14; b >= 0; --b) {
                int d = (x >> b) & 1;
                if (nxt[2 * node + d] == -1)
                    nxt[2 * node + d] = size++;
                node = nxt[2 * node + d];
                cnt[node]++;
            }
        }
        return answer;
    }
};
