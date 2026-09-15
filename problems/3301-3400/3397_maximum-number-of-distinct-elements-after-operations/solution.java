import java.util.Arrays;

class Solution {

    // Each element may land anywhere in [v-k, v+k]; assigning the values in
    // sorted order leaves every element the smallest value that is still
    // free and inside its window, which never hurts later ones.
    public int maxDistinctElements(int[] nums, int k) {
        int[] a = nums.clone();
        Arrays.sort(a);
        long last = (long) a[0] - k - 1;
        int count = 0;
        for (int v : a) {
            long target = (long) v - k;
            if (target <= last) target = last + 1;
            if (target <= (long) v + k) {
                last = target;
                ++count;
            }
        }
        return count;
    }
}
