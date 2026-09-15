import java.util.Arrays;

class Solution {

    public double trimMean(int[] arr) {
        int[] a = arr.clone();
        Arrays.sort(a);
        int n = a.length;
        int trim = n / 20; // 5% of n, always a whole number since n is a multiple of 20
        double total = 0;
        for (int i = trim; i < n - trim; i++) {
            total += a[i];
        }
        return total / (n - 2 * trim);
    }
}
