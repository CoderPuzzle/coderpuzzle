class Solution {
  public:
    vector<string> reverseString(vector<string> &s) {
        // Two indexes walk inward from both ends and swap each pair they
        // form: position i trades places with position n-1-i, so every
        // element crosses the middle exactly once and the array is reversed
        // when the indexes meet. std::swap on two strings trades their
        // internal pointers without rebuilding either, so the reversal
        // happens in place with O(1) extra memory; the mutated array is
        // the answer.
        int lo = 0, hi = (int)s.size() - 1;
        while (lo < hi) {
            swap(s[lo], s[hi]);
            ++lo;
            --hi;
        }
        return s;
    }
};
