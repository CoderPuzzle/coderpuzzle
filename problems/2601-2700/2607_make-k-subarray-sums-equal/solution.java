import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class Solution {

    public long makeSubKSumEqual(int[] arr, int k) {
        int n = arr.length;
        // Adjacent windows of length k must agree, forcing arr[(i+k) mod n] =
        // arr[i]: stepping by k around the cycle visits exactly one residue
        // class mod g = gcd(n, k), and each class being constant is also
        // sufficient — any window then picks up each class k/g times.
        int g = gcd(n, k);
        long total = 0;
        for (int r = 0; r < g; r++) {
            List<Integer> group = new ArrayList<>();
            for (int i = r; i < n; i += g) group.add(arr[i]);
            Collections.sort(group);
            // Unit steps are cheapest around a median; classes are
            // independent, so costs simply add up.
            int median = group.get(group.size() / 2);
            for (int v : group) total += Math.abs((long) v - median);
        }
        return total;
    }

    private int gcd(int a, int b) {
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
