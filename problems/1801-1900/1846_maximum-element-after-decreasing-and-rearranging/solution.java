import java.util.*;

class Solution {

    // After sorting, each element can be raised to at most one more than
    // the previous; the answer is the running value min(prev + 1, v).
    public int maximumElementAfterDecrementingAndRearranging(int[] arr) {
        Arrays.sort(arr);
        int cur = 1;
        for (int i = 1; i < arr.length; i++) {
            cur = Math.min(cur + 1, arr[i]);
        }
        return cur;
    }
}
