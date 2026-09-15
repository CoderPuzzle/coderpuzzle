class Solution {
  public:
    int distinctPoints(string s, int k) {
        int n = s.size();
        // Moves add like vectors, so the endpoint left after deleting a
        // window is the full-walk endpoint minus the window's own
        // displacement — only window sums matter, never the re-walk.
        auto dx = [](char c) { return c == 'L' ? -1 : c == 'R' ? 1 : 0; };
        auto dy = [](char c) { return c == 'D' ? -1 : c == 'U' ? 1 : 0; };
        int tx = 0, ty = 0;
        for (char c : s) {
            tx += dx(c);
            ty += dy(c);
        }
        // Slide the length-k window, updating its displacement in O(1) per
        // step — drop the outgoing move, pick up the incoming one — and
        // collect the endpoint every deletion produces.
        int wx = 0, wy = 0;
        for (int i = 0; i < k; i++) {
            wx += dx(s[i]);
            wy += dy(s[i]);
        }
        unordered_set<long long> seen;
        for (int i = 0; i + k <= n; i++) {
            // Both components lie in [-n, n]; shifting them positive packs
            // the pair into one injective 64-bit key.
            seen.insert(((long long)(tx - wx + n) << 32) | (unsigned)(ty - wy + n));
            if (i + k < n) {
                wx += dx(s[i + k]) - dx(s[i]);
                wy += dy(s[i + k]) - dy(s[i]);
            }
        }
        return (int)seen.size();
    }
};
