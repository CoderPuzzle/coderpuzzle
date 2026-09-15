import java.util.Arrays;

class Solution {

    public int countElements(int[] nums, int k) {
        // Sorting lines every element up with its rank: the elements
        // strictly greater than a value are exactly the sorted suffix after
        // that value's run. The whole count hangs on one threshold, the
        // value at sorted index t = n - k - 1.
        int[] ordered = nums.clone();
        Arrays.sort(ordered);
        int n = ordered.length;
        int threshold = ordered[n - k - 1];
        // Elements strictly below the threshold all qualify: their runs end
        // before it. The run AT the threshold qualifies only when its last
        // member still sees >= k strictly greater values, i.e. the run ends
        // at or before t. Values above the threshold never qualify.
        int left = 0;
        while (ordered[left] < threshold) left++;
        int right = left;
        while (right < n && ordered[right] == threshold) right++;
        return n - right >= k ? right : left;
    }
}
