class Solution {

    public int minimumAverageDifference(int[] nums) {
        int n = nums.length;
        long total = 0;
        for (int x : nums) {
            total += x;
        }
        long prefix = 0;
        int bestIndex = 0;
        long bestDiff = Long.MAX_VALUE;
        for (int i = 0; i < n; i++) {
            prefix += nums[i];
            long leftAvg = prefix / (i + 1);
            int rightCount = n - i - 1;
            long rightAvg = rightCount > 0 ? (total - prefix) / rightCount : 0;
            long diff = Math.abs(leftAvg - rightAvg);
            if (diff < bestDiff) {
                bestDiff = diff;
                bestIndex = i;
            }
        }
        return bestIndex;
    }
}
