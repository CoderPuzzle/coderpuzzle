class Solution {

    public int minOperations(int[] nums) {
        // One operation on the whole array replaces every element with
        // their common bitwise AND, so any array equalizes in at most one
        // step; zero steps suffice only when it already is constant.
        for (int x : nums) {
            if (x != nums[0]) {
                return 1;
            }
        }
        return 0;
    }
}
