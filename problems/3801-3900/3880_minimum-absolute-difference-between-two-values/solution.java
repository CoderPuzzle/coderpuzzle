class Solution {

    public int minAbsoluteDifference(int[] nums) {
        // Track the most recent 1 and most recent 2 seen so far; the closest
        // 1/2 pair is always caught the moment its second element is scanned.
        int lastOne = -1;
        int lastTwo = -1;
        int best = -1;
        for (int index = 0; index < nums.length; ++index) {
            if (nums[index] == 1) {
                if (lastTwo != -1) {
                    int distance = index - lastTwo;
                    if (best == -1 || distance < best) best = distance;
                }
                lastOne = index;
            } else if (nums[index] == 2) {
                if (lastOne != -1) {
                    int distance = index - lastOne;
                    if (best == -1 || distance < best) best = distance;
                }
                lastTwo = index;
            }
        }
        return best;
    }
}
