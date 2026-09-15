class Solution {
  public:
    int maximumBeauty(vector<int> &flowers) {
        // A valid garden keeps two equally beautiful endpoints i < j and,
        // since removal is free, every positive strictly between them: its
        // sum is 2v + P[j] - P[i+1] with P[k] the sum of max(flowers[t], 0)
        // below k. seen[v] tracks the smallest P[i+1] over past occurrences
        // of v (P only grows, so that is the first one). Totals stay under
        // 1e5 * 1e4 + 2e4 < 2^31 - 1, so int is exact throughout.
        unordered_map<int, int> seen;
        int pos = 0;
        int answer = -(1 << 30);
        for (int v : flowers) {
            auto found = seen.find(v);
            if (found != seen.end()) {
                answer = max(answer, 2 * v + pos - found->second);
            }
            if (v > 0) {
                pos += v;
            }
            if (found == seen.end() || pos < found->second) {
                seen[v] = pos;
            }
        }
        return answer;
    }
};
