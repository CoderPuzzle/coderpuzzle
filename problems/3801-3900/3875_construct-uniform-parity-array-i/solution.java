class Solution {

    public boolean uniformArray(int[] nums1) {
        // All-even needs 0 odd elements, or at least 2 so each odd can
        // subtract another odd; all-odd needs at least one odd for the
        // even elements to subtract. One of the two always holds.
        int odd = 0;
        for (int x : nums1) {
            if ((x & 1) == 1) {
                odd++;
            }
        }
        boolean allEvenOk = odd == 0 || odd >= 2;
        boolean allOddOk = odd >= 1;
        return allEvenOk || allOddOk;
    }
}
