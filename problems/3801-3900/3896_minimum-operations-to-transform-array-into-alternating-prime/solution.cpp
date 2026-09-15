class Solution {
  public:
    int minOperations(vector<int> &nums) {
        // Sieve of Eratosthenes up to a fixed bound. Every nums[i] is at
        // most 1e5, and the largest prime gap below 1e5 is far smaller
        // than the margin, so the next prime (or next non-prime) after any
        // element always lies inside the table.
        int limit = 300000;
        vector<bool> isPrime(limit + 1, true);
        isPrime[0] = isPrime[1] = false;
        for (int p = 2; p * p <= limit; p++) {
            if (isPrime[p]) {
                for (int multiple = p * p; multiple <= limit; multiple += p) {
                    isPrime[multiple] = false;
                }
            }
        }

        int total = 0;
        for (int i = 0; i < (int)nums.size(); i++) {
            int x = nums[i];
            if (i % 2 == 0) {
                while (!isPrime[x]) {
                    x++;
                }
            } else {
                while (isPrime[x]) {
                    x++;
                }
            }
            total += x - nums[i];
        }
        return total;
    }
};
