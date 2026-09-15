class Solution {
  public:
    string smallestEquivalentString(string s1, string s2, string baseStr) {
        array<int, 26> parent;
        for (int i = 0; i < 26; i++) {
            parent[i] = i;
        }
        // Path halving: re-point each visited node at its grandparent so the
        // trees flatten as we walk.
        auto find = [&](int a) {
            while (parent[a] != a) {
                parent[a] = parent[parent[a]];
                a = parent[a];
            }
            return a;
        };
        for (size_t i = 0; i < s1.size(); i++) {
            int ra = find(s1[i] - 'a');
            int rb = find(s2[i] - 'a');
            if (ra != rb) {
                // The union rule encodes the answer: always attach the larger
                // root under the smaller one, so a component's root is its
                // lexicographically smallest letter.
                if (rb < ra) {
                    swap(ra, rb);
                }
                parent[rb] = ra;
            }
        }
        // Each character maps to its component root — the smallest equivalent
        // letter (singletons map to themselves).
        string out;
        out.reserve(baseStr.size());
        for (char c : baseStr) {
            out.push_back((char)('a' + find(c - 'a')));
        }
        return out;
    }
};
