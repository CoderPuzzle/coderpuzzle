class Solution {

    public long countSubarrays(int[] nums, int k) {
        // Suffix ANDs ending at one index take at most ~30 distinct values:
        // walking the left end rightward can only clear bits, so every value
        // change drops at least one bit. (value, count) buckets make the
        // scan O(n * 30) instead of enumerating all subarrays. The answer
        // reaches n * (n + 1) / 2 = 5,000,050,000, past int range, so it
        // accumulates in a long.
        long total = 0L;
        long[] counts = new long[32];
        int[] values = new int[32];
        long[] nextCounts = new long[32];
        int[] nextValues = new int[32];
        int size = 0;
        for (int index = 0; index < nums.length; index++) {
            int value = nums[index];
            int newSize = 1;
            nextValues[0] = value;
            nextCounts[0] = 1L;
            for (int i = 0; i < size; i++) {
                int merged = values[i] & value;
                if (nextValues[newSize - 1] == merged) {
                    nextCounts[newSize - 1] += counts[i];
                } else {
                    nextValues[newSize] = merged;
                    nextCounts[newSize] = counts[i];
                    newSize++;
                }
            }
            int[] swapValues = values;
            values = nextValues;
            nextValues = swapValues;
            long[] swapCounts = counts;
            counts = nextCounts;
            nextCounts = swapCounts;
            size = newSize;
            for (int i = 0; i < size; i++) {
                if (values[i] == k) {
                    total += counts[i];
                }
            }
        }
        return total;
    }
}
