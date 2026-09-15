class Solution {
  public:
    int maxOperations(vector<int> &nums) {
        // The first operation fixes the score, and its pair is one of three:
        // the two head elements, the two tail elements, or both end elements.
        int n = nums.size();
        int headPair = nums[0] + nums[1];
        int endPair = nums[0] + nums[n - 1];
        int tailPair = nums[n - 2] + nums[n - 1];
        int best = 0;
        for (int target : {headPair, endPair, tailPair}) {
            // Every operation deletes exactly two elements, so a window keeps
            // its width parity; roll one dp layer per reachable width.
            vector<int> previous(n + 2, 0);
            for (int width = 2 + n % 2; width <= n; width += 2) {
                vector<int> current(n + 2, 0);
                for (int left = 0; left + width <= n; ++left) {
                    int right = left + width - 1;
                    int value = 0;
                    if (nums[left] + nums[right] == target)
                        value = max(value, 1 + previous[left + 1]);
                    if (nums[left] + nums[left + 1] == target)
                        value = max(value, 1 + previous[left + 2]);
                    if (nums[right - 1] + nums[right] == target)
                        value = max(value, 1 + previous[left]);
                    current[left] = value;
                }
                previous.swap(current);
            }
            best = max(best, previous[0]);
        }
        return best;
    }
};
