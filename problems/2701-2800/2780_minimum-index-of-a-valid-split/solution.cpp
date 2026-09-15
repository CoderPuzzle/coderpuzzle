class Solution {
  public:
    int minimumIndex(vector<int> &nums) {
        // One pass tallies every value; the promised sole dominant is the
        // value whose tally ends largest. Only the dominant can anchor a
        // valid split: a value dominating both halves holds more than half
        // of each, and doubling and adding the two inequalities gives more
        // than half of the whole array.
        unordered_map<int, int> counts;
        int dominant = nums[0];
        int frequency = 0;
        for (int num : nums) {
            // ++ both records and reports the tally after adding one.
            if (++counts[num] > frequency) {
                dominant = num;
                frequency = counts[num];
            }
        }
        // Second sweep carries prefix, the count of dominant copies so far.
        // Splitting after i, the prefix holds i + 1 elements and the suffix
        // n - i - 1; both comparisons are strict, so a tally tying its
        // half's length does not dominate.
        int prefix = 0;
        int n = (int)nums.size();
        for (int i = 0; i < n - 1; i++) {
            if (nums[i] == dominant) {
                prefix++;
            }
            if (prefix * 2 > i + 1 && (frequency - prefix) * 2 > n - i - 1) {
                return i;
            }
        }
        return -1;
    }
};
