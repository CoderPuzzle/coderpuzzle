import java.util.Arrays;

class Solution {

    public int maximizeGreatness(int[] nums) {
        // Sort the array; then scan a second sorted copy of the same
        // multiset with a fast pointer that always offers the smallest not
        // yet committed value strictly greater than the current element.
        // Spending the cheapest sufficient value on each position in
        // increasing order is an exchange-argument optimum, so the number
        // of commitments is the greatness.
        int[] arr = nums.clone();
        int[] supply = nums.clone();
        Arrays.sort(arr);
        Arrays.sort(supply);
        int count = 0;
        int j = 0;
        for (int x : arr) {
            while (j < supply.length && supply[j] <= x) {
                ++j;
            }
            if (j == supply.length) {
                break;
            }
            ++count;
            ++j;
        }
        return count;
    }
}
