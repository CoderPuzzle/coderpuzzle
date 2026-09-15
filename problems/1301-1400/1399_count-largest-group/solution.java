class Solution {

    public int countLargestGroup(int n) {
        // Digit sums stay below 37 for n <= 10^4, so a fixed array replaces
        // a hash map: bucket every value by its digit sum, then count the
        // buckets reaching the maximum.
        int[] counts = new int[37];
        int best = 0;
        for (int value = 1; value <= n; ++value) {
            int digitSum = 0;
            for (int rest = value; rest > 0; rest /= 10) {
                digitSum += rest % 10;
            }
            ++counts[digitSum];
            if (counts[digitSum] > best) {
                best = counts[digitSum];
            }
        }
        int result = 0;
        for (int count : counts) {
            if (count == best) {
                ++result;
            }
        }
        return result;
    }
}
