class Solution {
  public:
    string lexSmallest(string s) {
        // Reversing a single character changes nothing, so s itself is
        // always one of the reachable strings and seeds the minimum.
        int n = s.size();
        string best = s;
        // Flip the first k characters: the reversed head lands in front of
        // whatever the operation left untouched.
        for (int k = 2; k <= n; k++) {
            string candidate = s;
            reverse(candidate.begin(), candidate.begin() + k);
            best = min(best, candidate);
        }
        // Flip the last k characters: the untouched head keeps its order
        // while the reversed tail closes the string.
        for (int k = 2; k <= n; k++) {
            string candidate = s;
            reverse(candidate.end() - k, candidate.end());
            best = min(best, candidate);
        }
        return best;
    }
};
