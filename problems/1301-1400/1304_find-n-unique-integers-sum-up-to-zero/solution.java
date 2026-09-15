class Solution {

    public int[] sumZero(int n) {
        // Walk from -n/2 to n/2, skipping 0 for even n; every value pairs
        // with its negation so the array sums to zero with n distinct values.
        int half = n / 2;
        int[] result = new int[n];
        int index = 0;
        for (int value = -half; value <= half; ++value) {
            if (value == 0 && n % 2 == 0) {
                continue;
            }
            result[index++] = value;
        }
        return result;
    }
}
