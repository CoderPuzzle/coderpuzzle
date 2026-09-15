class Solution {
  public:
    int sumOfPrimesInRange(int n) {
        const int limit = 1000;
        vector<bool> isPrime(limit + 1, true);
        isPrime[0] = isPrime[1] = false;
        for (int p = 2; p * p <= limit; ++p) {
            if (!isPrime[p])
                continue;
            for (int multiple = p * p; multiple <= limit; multiple += p)
                isPrime[multiple] = false;
        }

        vector<int> prefix(limit + 1, 0);
        for (int value = 1; value <= limit; ++value)
            prefix[value] = prefix[value - 1] + (isPrime[value] ? value : 0);

        int reverse = 0;
        int remaining = n;
        while (remaining > 0) {
            reverse = reverse * 10 + remaining % 10;
            remaining /= 10;
        }

        return prefix[max(n, reverse)] - prefix[min(n, reverse) - 1];
    }
};
