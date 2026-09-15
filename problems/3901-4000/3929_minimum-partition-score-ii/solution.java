class Solution {

    private static class Line {

        long slope, intercept, start;
        int count;

        Line(long slope, long intercept, int count, long start) {
            this.slope = slope;
            this.intercept = intercept;
            this.count = count;
            this.start = start;
        }
    }

    public long minPartitionScore(int[] nums, int k) {
        long[] prefix = new long[nums.length];
        long total = 0;
        for (int i = 0; i < nums.length; i++) {
            total += nums[i];
            prefix[i] = total;
        }
        long low = 0,
            high = total * total;
        while (low < high) {
            long middle = low + (high - low + 1) / 2;
            if (run(prefix, middle)[1] >= k) low = middle;
            else high = middle - 1;
        }
        long relaxed = run(prefix, low)[0];
        return (relaxed - low * k + total) / 2;
    }

    private long[] run(long[] prefix, long penalty) {
        java.util.ArrayList<Line> hull = new java.util.ArrayList<>();
        hull.add(new Line(0, 0, 0, Long.MIN_VALUE));
        int head = 0;
        long cost = 0;
        int count = 0;
        for (long x : prefix) {
            while (head + 1 < hull.size() && hull.get(head + 1).start <= x) head++;
            Line best = hull.get(head);
            cost = x * x + penalty + best.slope * x + best.intercept;
            count = best.count + 1;
            long slope = -2 * x;
            long intercept = cost + x * x;
            long start = Long.MIN_VALUE;
            while (!hull.isEmpty()) {
                Line old = hull.get(hull.size() - 1);
                long difference = intercept - old.intercept;
                long denominator = old.slope - slope;
                start = count > old.count ? ceilDiv(difference, denominator) : floorDiv(difference, denominator) + 1;
                if (start > old.start) break;
                hull.remove(hull.size() - 1);
                head = Math.min(head, hull.size() - 1);
            }
            if (hull.isEmpty()) {
                start = Long.MIN_VALUE;
                head = 0;
            }
            hull.add(new Line(slope, intercept, count, start));
        }
        return new long[] { cost, count };
    }

    private long floorDiv(long value, long divisor) {
        long quotient = value / divisor;
        if (value < 0 && value % divisor != 0) quotient--;
        return quotient;
    }

    private long ceilDiv(long value, long divisor) {
        long quotient = value / divisor;
        if (value > 0 && value % divisor != 0) quotient++;
        return quotient;
    }
}
