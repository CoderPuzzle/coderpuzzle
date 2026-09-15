import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[][] findPrimePairs(int n) {
        // Sieve of Eratosthenes up to n: assume every integer >= 2 is prime,
        // then cross off each prime's multiples. Any composite has a factor
        // <= its square root, so i * i is where the crossing-off starts.
        boolean[] isPrime = new boolean[n + 1];
        Arrays.fill(isPrime, 2, n + 1, true);
        for (int i = 2; i * i <= n; ++i) {
            if (isPrime[i]) {
                for (int multiple = i * i; multiple <= n; multiple += i) {
                    isPrime[multiple] = false;
                }
            }
        }
        // Scan the smaller endpoint only: x <= n / 2 forces y = n - x >= x,
        // so every pair appears once, and ascending x gives the required
        // order for free. The smallest prime pair sums to 2 + 2 = 4, so any
        // n below that leaves the list empty.
        List<int[]> collected = new ArrayList<>();
        for (int x = 2; x <= n / 2; ++x) {
            if (isPrime[x] && isPrime[n - x]) collected.add(new int[] { x, n - x });
        }
        return collected.toArray(new int[0][]);
    }
}
