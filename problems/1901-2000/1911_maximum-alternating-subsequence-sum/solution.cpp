class Solution {
  public:
    long long maxAlternatingSum(vector<int> &nums) {
        // Two running optima over subsequences of the prefix: `even` is the
        // best alternating sum whose last picked element sits at an even
        // reindexed position, `odd` the best with one extra odd-position
        // element, so each new element costs two O(1) transitions.
        long long even = 0;
        long long odd = 0;
        for (int x : nums) {
            long long nextEven = max(even, odd + x);
            long long nextOdd = max(odd, even - x);
            even = nextEven;
            odd = nextOdd;
        }
        return even;
    }
};
