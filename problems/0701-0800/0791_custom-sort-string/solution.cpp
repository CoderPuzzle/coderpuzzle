class Solution {
  public:
    string customSortString(string order, string s) {
        // How many of each letter s holds; the alphabet is a fixed
        // constant, so 26 slots replace a hash map.
        int counts[26] = {0};
        for (char c : s) {
            counts[c - 'a']++;
        }
        string out;
        out.reserve(s.size());
        // Emission pass 1: walk order itself, emitting each letter it
        // names as many times as s holds it. order's sequence IS the
        // relative order the answer must carry, so this prefix already
        // satisfies it; letters absent from s contribute nothing. The
        // zeroing doubles as a membership mark for pass 2.
        for (char c : order) {
            int slot = c - 'a';
            if (counts[slot] > 0) {
                out.append(counts[slot], c);
                counts[slot] = 0;
            }
        }
        // Emission pass 2: leftovers. Letters order never mentions are
        // unconstrained, so the pinned form sends them to the tail in
        // their original s order — walk s and keep the still-counted.
        for (char c : s) {
            int slot = c - 'a';
            if (counts[slot] > 0) {
                out.push_back(c);
                counts[slot]--;
            }
        }
        return out;
    }
};
