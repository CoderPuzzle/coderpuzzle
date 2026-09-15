class Solution {
  public:
    vector<string> findStrobogrammatic(int n) { return build(n, true); }

  private:
    // A strobogrammatic number of length n is one wrapping pair around one
    // of length n - 2, so the recursion shrinks by 2 per level — down to an
    // empty core (even n) or one self-rotating digit (odd n).
    vector<string> build(int length, bool outer) {
        if (length == 0)
            return {""};
        if (length == 1)
            return {"0", "1", "8"};
        // "00" would put a leading zero on the whole number, so it may
        // wrap only inner layers, never the outermost.
        vector<string> pairs;
        if (outer) {
            pairs = {"11", "69", "88", "96"};
        } else {
            pairs = {"00", "11", "69", "88", "96"};
        }
        vector<string> inners = build(length - 2, false);
        vector<string> results;
        results.reserve(pairs.size() * inners.size());
        // Pairs ascend by their left digit and every wrapped result has the
        // same length, so each layer emits its list in ascending
        // lexicographic order already — no final sort needed.
        for (const string &pair : pairs) {
            for (const string &inner : inners) {
                results.push_back(pair[0] + inner + pair[1]);
            }
        }
        return results;
    }
};
