class Solution {
  public:
    int minMirrorPairDistance(vector<int> &nums) {
        int best = -1;
        // Most recent index for each reversed value (-1 marks "not seen
        // yet"); a nearer supplier beats a farther one for every future
        // match, so older entries never matter again.
        unordered_map<int, int> latest;
        for (int index = 0; index < (int)nums.size(); index++) {
            int num = nums[index];
            // Look up before recording: an index cannot pair with itself, so
            // palindromic values wait here for a genuine second occurrence.
            auto it = latest.find(num);
            if (it != latest.end() && (best == -1 || index - it->second < best)) {
                best = index - it->second;
            }
            // Reversal peels last digits off until none remain; trailing
            // zeros drop out on their own (120 -> 21, 100 -> 1).
            int reversedValue = 0;
            for (int value = num; value > 0; value /= 10) {
                reversedValue = reversedValue * 10 + value % 10;
            }
            latest[reversedValue] = index;
        }
        return best;
    }
};
