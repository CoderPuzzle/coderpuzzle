class Solution {

    public int[] kthRemainingInteger(int[] nums, int[][] queries) {
        int[] positions = new int[nums.length];
        int[] adjusted = new int[nums.length];
        int evenCount = 0;
        for (int index = 0; index < nums.length; index++) {
            if (nums[index] % 2 == 0) {
                positions[evenCount] = index;
                adjusted[evenCount] = nums[index] / 2 - evenCount;
                evenCount++;
            }
        }

        int[] result = new int[queries.length];
        for (int queryIndex = 0; queryIndex < queries.length; queryIndex++) {
            int left = queries[queryIndex][0];
            int right = queries[queryIndex][1];
            int k = queries[queryIndex][2];
            int first = lowerBound(positions, left, 0, evenCount);
            int last = upperBound(positions, right, 0, evenCount);
            int crossed = upperBound(adjusted, k - first, first, last) - first;
            result[queryIndex] = 2 * (k + crossed);
        }
        return result;
    }

    private int lowerBound(int[] values, int target, int from, int to) {
        while (from < to) {
            int middle = (from + to) >>> 1;
            if (values[middle] < target) from = middle + 1;
            else to = middle;
        }
        return from;
    }

    private int upperBound(int[] values, int target, int from, int to) {
        while (from < to) {
            int middle = (from + to) >>> 1;
            if (values[middle] <= target) from = middle + 1;
            else to = middle;
        }
        return from;
    }
}
