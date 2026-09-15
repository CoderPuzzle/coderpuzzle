class Solution {

    public boolean increasingTriplet(int[] nums) {
        long first = Long.MAX_VALUE;
        long second = Long.MAX_VALUE;
        for (int value : nums) {
            if (value <= first) {
                first = value;
            } else if (value <= second) {
                second = value;
            } else {
                return true;
            }
        }
        return false;
    }
}
