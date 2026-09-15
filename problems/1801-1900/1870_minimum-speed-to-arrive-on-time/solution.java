class Solution {

    public int minSpeedOnTime(int[] dist, double hour) {
        int n = dist.length;
        // hour has at most two decimals; work in exact integer hundredths.
        long H = Math.round(hour * 100.0); // hour has at most two decimals
        long last = 100L * dist[n - 1];

        // On-time is monotone in speed — if s works, every faster speed
        // works — so search for the smallest feasible s; 10^7 is the
        // guaranteed ceiling, and -1 if even it fails.
        long lo = 1,
            hi = 10000000L;
        if (!onTime(dist, H, last, hi)) return -1;
        while (lo < hi) {
            long mid = (lo + hi) / 2;
            if (onTime(dist, H, last, mid)) hi = mid;
            else lo = mid + 1;
        }
        return (int) lo;
    }

    private boolean onTime(int[] dist, long H, long last, long speed) {
        // Every leg but the last must end on an integer hour (the next train
        // departs then), costing ceil(d/s); the final leg has no successor
        // and costs exactly d/s — compared here in hundredths.
        long c = 0;
        for (int i = 0; i + 1 < dist.length; i++) {
            c += (dist[i] + speed - 1) / speed;
        }
        long budget = H - 100 * c;
        if (budget < 0) return false;
        return budget * speed >= last;
    }
}
