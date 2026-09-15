class Solution {

    public boolean uniformArray(int[] nums1) {
        // All-even is achievable iff every element is even: an odd element
        // can only become even by subtracting a smaller odd element, which
        // the minimum odd element can never do. All-odd is achievable iff
        // the minimum element is odd, because then every even element can
        // subtract it. So the minimum plus an all-even check decides the
        // whole array in a single pass each.
        int smallest = nums1[0];
        for (int value : nums1) {
            smallest = Math.min(smallest, value);
        }
        if (smallest % 2 == 1) {
            return true;
        }
        for (int value : nums1) {
            if (value % 2 != 0) {
                return false;
            }
        }
        return true;
    }
}
