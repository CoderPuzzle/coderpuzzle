class Solution {

    public long maxAlternatingSum(int[] nums) {
        // Two running optima over subsequences of the prefix: `even` is the
        // best alternating sum whose last picked element sits at an even
        // reindexed position, `odd` the best with one extra odd-position
        // element, so each new element costs two O(1) transitions.
        long even = 0;
        long odd = 0;
        for (int x : nums) {
            long nextEven = Math.max(even, odd + x);
            long nextOdd = Math.max(odd, even - x);
            even = nextEven;
            odd = nextOdd;
        }
        return even;
    }
}
