class Solution {

    public int minOperations(int[] nums, int target) {
        // Bucket elements by their power-of-two exponent. Element sums reach
        // 1000 * 2^30, which overflows int: keep the running total in long.
        long[] count = new long[62];
        long total = 0;
        for (int num : nums) {
            count[31 - Integer.numberOfLeadingZeros(num)]++;
            total += num;
        }
        // Every operation preserves the array sum, so a subsequence can never
        // exceed it.
        if (total < target) {
            return -1;
        }
        long operations = 0;
        for (int bit = 0; bit <= 30; bit++) {
            if (((target >> bit) & 1) == 1) {
                if (count[bit] > 0) {
                    count[bit]--;
                } else {
                    int source = bit + 1;
                    while (count[source] == 0) {
                        source++;
                    }
                    // Unreachable given the total check; a defensive stop.
                    if (source > 60) {
                        return -1;
                    }
                    operations += source - bit;
                    count[source]--;
                    // The split chain banks one spare twin at every passed
                    // level and its own twin right at the needed level.
                    for (int spare = bit + 1; spare < source; spare++) {
                        count[spare]++;
                    }
                    count[bit]++;
                }
            }
            // Leftover pairs at this level stand in for the element one level
            // up, so they feed the next iteration for free.
            count[bit + 1] += count[bit] / 2;
        }
        return (int) operations;
    }
}
