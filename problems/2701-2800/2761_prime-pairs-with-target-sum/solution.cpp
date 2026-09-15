class Solution {
  public:
    vector<vector<int>> findPrimePairs(int n) {
        // Sieve of Eratosthenes up to n: assume every integer >= 2 is prime,
        // then cross off each prime's multiples. Any composite has a factor
        // <= its square root, so i * i is where the crossing-off starts.
        vector<char> isPrime(n + 1, 1);
        isPrime[0] = isPrime[1] = 0;
        for (long long i = 2; i * i <= n; ++i) {
            if (isPrime[i]) {
                for (long long multiple = i * i; multiple <= n; multiple += i) {
                    isPrime[multiple] = 0;
                }
            }
        }
        // Scan the smaller endpoint only: x <= n / 2 forces y = n - x >= x,
        // so every pair appears once, and ascending x gives the required
        // order for free. The smallest prime pair sums to 2 + 2 = 4, so any
        // n below that leaves the list empty.
        vector<vector<int>> pairs;
        for (int x = 2; x <= n / 2; ++x) {
            if (isPrime[x] && isPrime[n - x])
                pairs.push_back({x, n - x});
        }
        return pairs;
    }
};
