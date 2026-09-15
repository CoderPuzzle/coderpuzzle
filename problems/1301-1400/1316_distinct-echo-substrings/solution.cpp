class Solution {
  public:
    int distinctEchoSubstrings(string text) {
        int n = text.size();
        // An echo is exactly an even-length substring whose two halves are
        // identical, so each one is characterized by a half length and a
        // start index — enumerate every such (half, i) pair.
        unordered_set<string> seen;
        for (int half = 1; half <= n / 2; half++) {
            // Start positions with room for the full doubled substring.
            for (int i = 0; i + 2 * half <= n; i++) {
                // Direct half comparison: no non-echo can pass, and every
                // echo appears for exactly its own (half, i).
                if (text.compare(i, half, text, i + half, half) == 0) {
                    // The set silently discards repeats — equal substrings
                    // hash/compare identically — so its size is the answer.
                    seen.insert(text.substr(i, 2 * half));
                }
            }
        }
        return seen.size();
    }
};
