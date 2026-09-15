class Solution {

    public int[] maxUpgrades(int[] count, int[] upgrade, int[] sell, int[] money) {
        // For one data center, upgrading u servers is feasible exactly when
        // selling some of the remaining servers can bridge the shortfall:
        // u * upgrade may exceed money only if ceil(shortfall / sell) extra
        // servers sold still leave u un-upgraded hosts. Feasibility never
        // flips back as u grows, so a binary search on u finds the maximum.
        // Products reach 10^5 * 10^5 = 10^10, past int range: compute in long.
        int n = count.length;
        int[] answer = new int[n];
        for (int i = 0; i < n; ++i) {
            int lo = 0;
            int hi = count[i];
            while (lo < hi) {
                int mid = lo + (hi - lo + 1) / 2;
                long spent = (long) mid * upgrade[i];
                boolean feasible;
                if (spent <= money[i]) {
                    feasible = true;
                } else {
                    long shortfall = spent - money[i];
                    long toSell = (shortfall + sell[i] - 1) / sell[i];
                    feasible = toSell + mid <= count[i];
                }
                if (feasible) {
                    lo = mid;
                } else {
                    hi = mid - 1;
                }
            }
            answer[i] = lo;
        }
        return answer;
    }
}
