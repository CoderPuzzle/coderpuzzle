class Solution {
  public:
    long long splitArray(vector<int> &nums) {
        // Sieve of Eratosthenes marks which indices are prime in
        // O(n log log n); a single pass then routes each element to A or B.
        int n = nums.size();
        vector<bool> isPrime(n, true);
        if (n > 0)
            isPrime[0] = false;
        if (n > 1)
            isPrime[1] = false;
        for (int p = 2; (long long)p * p < n; ++p) {
            if (!isPrime[p])
                continue;
            for (int multiple = p * p; multiple < n; multiple += p)
                isPrime[multiple] = false;
        }

        long long sumA = 0;
        long long sumB = 0;
        for (int index = 0; index < n; ++index) {
            if (isPrime[index])
                sumA += nums[index];
            else
                sumB += nums[index];
        }
        // |sum(A) - sum(B)| can reach ~1e14, so the sums are long long.
        return llabs(sumA - sumB);
    }
};
