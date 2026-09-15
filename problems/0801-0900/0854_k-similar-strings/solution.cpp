class Solution {
  public:
    int kSimilarity(string s1, string s2) {
        // Each swap is a move between strings, so BFS from s1 yields
        // the minimum swap count.
        queue<pair<string, int>> q;
        q.push({s1, 0});
        unordered_set<string> seen;
        seen.insert(s1);
        while (!q.empty()) {
            auto [s, steps] = q.front();
            q.pop();
            if (s == s2) {
                return steps;
            }
            // Always fix the leftmost mismatch first: some optimal
            // solution does, and the rule prunes the branching.
            int i = 0;
            while (s[i] == s2[i]) {
                i++;
            }
            for (int j = i + 1; j < (int)s.size(); j++) {
                // Install s2's letter at i, and never break an
                // already-matching j — such a swap is never minimal.
                if (s[j] == s2[i] && s[j] != s2[j]) {
                    swap(s[i], s[j]);
                    // Only novel strings join the queue; matched
                    // positions are never touched again.
                    if (seen.insert(s).second) {
                        q.push({s, steps + 1});
                    }
                    swap(s[i], s[j]);
                }
            }
        }
        // Unreachable: anagrams are always convertible.
        return -1;
    }
};
