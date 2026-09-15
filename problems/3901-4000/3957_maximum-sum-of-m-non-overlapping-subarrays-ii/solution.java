class Solution {

    private int n;
    private int lowLength;
    private int highLength;
    private long[] prefix;
    private long[] values;
    private int[] counts;
    private int[] queue;

    private long[] evaluate(long penalty) {
        int head = 0;
        int tail = 0;
        values[0] = 0;
        counts[0] = 0;
        for (int end = 1; end <= n; end++) {
            int start = end - lowLength;
            if (start >= 0) {
                long key = values[start] - prefix[start];
                while (tail > head) {
                    int back = queue[tail - 1];
                    long backKey = values[back] - prefix[back];
                    if (backKey > key || (backKey == key && counts[back] > counts[start])) break;
                    tail--;
                }
                queue[tail++] = start;
            }
            while (head < tail && queue[head] < end - highLength) head++;

            values[end] = values[end - 1];
            counts[end] = counts[end - 1];
            if (head < tail) {
                start = queue[head];
                long takeValue = prefix[end] - penalty + values[start] - prefix[start];
                int takeCount = counts[start] + 1;
                if (takeValue > values[end] || (takeValue == values[end] && takeCount > counts[end])) {
                    values[end] = takeValue;
                    counts[end] = takeCount;
                }
            }
        }
        return new long[] { values[n], counts[n] };
    }

    public long maximumSum(int[] nums, int m, int l, int r) {
        n = nums.length;
        lowLength = l;
        highLength = r;
        prefix = new long[n + 1];
        values = new long[n + 1];
        counts = new int[n + 1];
        queue = new int[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];

        long[] result = evaluate(0);
        if (result[1] == 0) {
            int head = 0;
            int tail = 0;
            long best = Long.MIN_VALUE;
            for (int end = 1; end <= n; end++) {
                int start = end - l;
                if (start >= 0) {
                    while (tail > head && prefix[queue[tail - 1]] >= prefix[start]) tail--;
                    queue[tail++] = start;
                }
                while (head < tail && queue[head] < end - r) head++;
                if (head < tail) best = Math.max(best, prefix[end] - prefix[queue[head]]);
            }
            return best;
        }
        if (result[1] <= m) return result[0];

        long maxAbs = 0;
        for (int number : nums) maxAbs = Math.max(maxAbs, Math.abs((long) number));
        long lowPenalty = 0;
        long highPenalty = maxAbs * n + 1;
        while (lowPenalty < highPenalty) {
            long penalty = (lowPenalty + highPenalty + 1) / 2;
            if (evaluate(penalty)[1] >= m) lowPenalty = penalty;
            else highPenalty = penalty - 1;
        }
        return evaluate(lowPenalty)[0] + lowPenalty * m;
    }
}
