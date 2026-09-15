class Solution {
  public:
    int minAbsoluteDifference(vector<int> &nums) {
        // Track the most recent 1 and most recent 2 seen so far; the closest
        // 1/2 pair is always caught the moment its second element is scanned.
        int last_one = -1;
        int last_two = -1;
        int best = -1;
        for (int index = 0; index < (int)nums.size(); ++index) {
            if (nums[index] == 1) {
                if (last_two != -1) {
                    int distance = index - last_two;
                    if (best == -1 || distance < best)
                        best = distance;
                }
                last_one = index;
            } else if (nums[index] == 2) {
                if (last_one != -1) {
                    int distance = index - last_one;
                    if (best == -1 || distance < best)
                        best = distance;
                }
                last_two = index;
            }
        }
        return best;
    }
};
