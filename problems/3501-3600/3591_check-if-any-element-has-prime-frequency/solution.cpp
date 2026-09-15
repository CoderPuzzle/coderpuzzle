class Solution {
  public:
    bool checkPrimeFrequency(vector<int> &nums) {
        // One pass counts each distinct value's frequency in a hash map,
        // then every frequency is tested for primality by trial division:
        // a factor with divisor * divisor <= frequency refutes it, 0 and 1
        // fail outright, and any frequency surviving the scan is prime.
        // Frequencies never exceed nums.length <= 100, so the checks are a
        // handful of divisions each.
        unordered_map<int, int> counts;
        for (int value : nums)
            ++counts[value];
        for (auto &[value, frequency] : counts) {
            if (frequency < 2)
                continue;
            bool isPrime = true;
            for (int divisor = 2; divisor * divisor <= frequency; ++divisor) {
                if (frequency % divisor == 0) {
                    isPrime = false;
                    break;
                }
            }
            if (isPrime)
                return true;
        }
        return false;
    }
};
