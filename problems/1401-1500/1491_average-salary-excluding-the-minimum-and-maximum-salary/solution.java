class Solution {

    public double average(long[] salary) {
        long total = 0;
        long low = Long.MAX_VALUE;
        long high = Long.MIN_VALUE;
        for (long value : salary) {
            total += value;
            low = Math.min(low, value);
            high = Math.max(high, value);
        }
        return (double) (total - low - high) / (salary.length - 2);
    }
}
