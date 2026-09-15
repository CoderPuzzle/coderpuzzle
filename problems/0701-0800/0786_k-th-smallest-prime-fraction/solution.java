class Solution {

    public int[] kthSmallestPrimeFraction(int[] arr, int k) {
        int n = arr.length;
        double lo = 0.0,
            hi = 1.0;
        int[] ans = { arr[0], arr[n - 1] };
        // Binary search on the fraction value; count fractions <= mid.
        for (int it = 0; it < 50; it++) {
            double mid = (lo + hi) / 2.0;
            int count = 0;
            double best = 0.0;
            int[] bestPair = { arr[0], arr[n - 1] };
            int j = 1;
            for (int i = 0; i < n - 1; i++) {
                while (j < n && arr[i] > mid * arr[j]) {
                    j += 1;
                }
                count += n - j;
                if (j < n) {
                    double val = (double) arr[i] / arr[j];
                    if (val > best) {
                        best = val;
                        bestPair[0] = arr[i];
                        bestPair[1] = arr[j];
                    }
                }
            }
            if (count >= k) {
                hi = mid;
                ans = bestPair.clone();
            } else {
                lo = mid;
            }
        }
        return ans;
    }
}
