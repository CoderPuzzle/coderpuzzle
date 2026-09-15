class Solution {
  public:
    long long countPalindromePaths(vector<int> &parent, string s) {
        int n = parent.size();
        vector<vector<int>> children(n);
        for (int i = 1; i < n; i++)
            children[parent[i]].push_back(i);

        // mask[v]: parity bitmask of letters on the root-to-v path; a
        // multiset forms a palindrome iff at most one parity is odd, so only
        // parities matter. BFS from the root derives each child's mask as
        // its parent's XOR the edge letter's bit.
        vector<int> masks(n, 0);
        vector<int> order;
        order.reserve(n);
        order.push_back(0);
        for (size_t qi = 0; qi < order.size(); qi++) {
            int v = order[qi];
            for (int c : children[v]) {
                masks[c] = masks[v] ^ (1 << (s[c] - 'a'));
                order.push_back(c);
            }
        }

        unordered_map<int, long long> freq;
        long long ans = 0;
        for (int m : masks) {
            // Path letters between u and v have parity mask[u] ^ mask[v] —
            // the shared prefix above their LCA cancels — so partners are
            // masks equal to m (all even) or one bit away (single odd).
            // Consulting before inserting counts each pair exactly once.
            auto it = freq.find(m);
            if (it != freq.end())
                ans += it->second;
            for (int b = 0; b < 26; b++) {
                it = freq.find(m ^ (1 << b));
                if (it != freq.end())
                    ans += it->second;
            }
            freq[m]++;
        }
        return ans;
    }
};
