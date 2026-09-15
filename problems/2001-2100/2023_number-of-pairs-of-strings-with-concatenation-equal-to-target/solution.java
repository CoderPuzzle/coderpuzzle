class Solution {

    public int numOfPairs(String[] nums, String target) {
        int pairs = 0;
        for (int first = 0; first < nums.length; ++first) {
            for (int second = 0; second < nums.length; ++second) {
                if (first != second && (nums[first] + nums[second]).equals(target)) {
                    ++pairs;
                }
            }
        }
        return pairs;
    }
}
