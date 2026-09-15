class Solution {
  public:
    int numOfWays(vector<int> &nums) {
        const long long MOD = 1000000007LL;
        int n = (int)nums.size();

        // Factorials and their modular inverses (Fermat's little theorem:
        // MOD is prime, so inv(k!) == (k!)^(MOD - 2) mod MOD) answer every
        // C(a, b) query in O(1).
        vector<long long> fact(n + 1), invFact(n + 1);
        fact[0] = 1;
        for (int i = 1; i <= n; i++)
            fact[i] = fact[i - 1] * i % MOD;
        auto power = [&](long long base, long long exp) {
            long long result = 1;
            base %= MOD;
            while (exp > 0) {
                if (exp & 1)
                    result = result * base % MOD;
                base = base * base % MOD;
                exp >>= 1;
            }
            return result;
        };
        invFact[n] = power(fact[n], MOD - 2);
        for (int i = n; i >= 1; i--)
            invFact[i - 1] = invFact[i] * i % MOD;

        auto comb = [&](int a, int b) { return fact[a] * invFact[b] % MOD * invFact[a - b] % MOD; };

        // ways(arr) counts every reordering of arr (including arr itself)
        // that builds the same BST: split at the root arr[0], recurse on
        // the smaller-than-root and larger-than-root runs (each must keep
        // its own relative order), then multiply by the number of ways to
        // interleave the two runs into one sequence of their combined
        // length, which is the binomial coefficient of the two run sizes.
        std::function<long long(const vector<int> &)> ways = [&](const vector<int> &arr) -> long long {
            if (arr.size() <= 1)
                return 1;
            int root = arr[0];
            vector<int> left, right;
            for (size_t i = 1; i < arr.size(); i++) {
                if (arr[i] < root)
                    left.push_back(arr[i]);
                else
                    right.push_back(arr[i]);
            }
            long long c = comb((int)(left.size() + right.size()), (int)left.size());
            return c * ways(left) % MOD * ways(right) % MOD;
        };

        // The problem excludes the original array from the count.
        return (int)((ways(nums) - 1 + MOD) % MOD);
    }
};
