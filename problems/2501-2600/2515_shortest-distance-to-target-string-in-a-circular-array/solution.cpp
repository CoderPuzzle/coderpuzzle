class Solution {
  public:
    int closestTarget(vector<string> &words, string target, int startIndex) {
        // Going either way around the ring, a match at distance d (forward)
        // is also n - d backward, so each matching index yields
        // min(d, n - d); take the smallest over all matches.
        int n = (int)words.size();
        int best = -1;
        for (int i = 0; i < n; ++i) {
            if (words[i] != target)
                continue;
            int gap = abs(i - startIndex);
            int d = min(gap, n - gap);
            if (best == -1 || d < best)
                best = d;
        }
        return best;
    }
};
