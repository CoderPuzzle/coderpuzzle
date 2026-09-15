class Solution {

    public int numOfSubarrays(int[] arr, int k, int threshold) {
        // window_sum >= k * threshold is the exact integer form of
        // "average >= threshold"; the window updates in O(1) per slide.
        int need = k * threshold;
        int window = 0;
        for (int i = 0; i < k; ++i) {
            window += arr[i];
        }
        int count = window >= need ? 1 : 0;
        for (int i = k; i < arr.length; ++i) {
            window += arr[i] - arr[i - k];
            if (window >= need) {
                ++count;
            }
        }
        return count;
    }
}
