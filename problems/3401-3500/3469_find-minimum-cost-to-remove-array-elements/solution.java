class Solution {

    public long minCost(int[] nums) {
        // Every operation removes two of the three frontmost elements, so
        // what remains is always an untouched suffix plus at most one
        // element left behind in front of it. Row j holds, at index c + 1,
        // the cheapest finish when nums[c] is that leftover (index 0 =
        // no leftover); computing row j reads only rows j + 2 and j + 3,
        // so a three-row ring bounds the table at O(n) memory. Costs sum
        // to at most 5 * 10^8, far inside long range.
        int n = nums.length;
        if (n < 3) {
            return Math.max(nums[0], nums[n - 1]);
        }

        long[] rowN = new long[n + 1];
        for (int c = 0; c < n; c++) {
            rowN[c + 1] = nums[c];
        }
        long[] rowNm1 = new long[n];
        rowNm1[0] = nums[n - 1];
        for (int c = 0; c < n - 1; c++) {
            rowNm1[c + 1] = Math.max(nums[c], nums[n - 1]);
        }
        long[] rowNm2 = new long[n - 1];
        rowNm2[0] = Math.max(nums[n - 2], nums[n - 1]);
        for (int c = 0; c < n - 2; c++) {
            long a = nums[c];
            long b = nums[n - 2];
            long d = nums[n - 1];
            rowNm2[c + 1] = Math.min(Math.min(Math.max(a, b) + d, Math.max(a, d) + b), Math.max(b, d) + a);
        }

        long[][] ring = { rowNm2, rowNm1, rowN };
        for (int j = n - 3; j >= 0; j--) {
            long[] r2 = ring[1];
            long[] r3 = ring[2];
            long a = nums[j];
            long b = nums[j + 1];
            long pair = Math.max(a, b);
            // No leftover: nums[j], nums[j+1], nums[j+2] meet one
            // operation and the survivor becomes the next leftover.
            long[] row = new long[j + 1];
            row[0] = Math.min(
                Math.min(Math.max(b, nums[j + 2]) + r3[j + 1], Math.max(a, nums[j + 2]) + r3[j + 2]),
                pair + r3[j + 3]
            );
            // With leftover nums[c]: the front three are nums[c], a, b.
            long k1 = r2[j + 2];
            long k2 = r2[j + 1];
            for (int c = 0; c < j; c++) {
                long v = nums[c];
                row[c + 1] = Math.min(Math.min(Math.max(v, a) + k1, Math.max(v, b) + k2), pair + r2[c + 1]);
            }
            ring[2] = ring[1];
            ring[1] = ring[0];
            ring[0] = row;
        }
        return ring[0][0];
    }
}
