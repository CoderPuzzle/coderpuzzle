class Solution {
  public:
    long long numGoodSubarrays(vector<int> &nums, int k) {
        // Positional sweep: window [l, r] is good exactly when the prefixes
        // before l and through r leave the same remainder mod k. Residue
        // plus element can pass 2^31, so the running sum stays in 64 bits.
        unordered_map<int, long long> residue_counts;
        residue_counts[0] = 1;
        long long residue = 0;
        long long total = 0;
        for (int value : nums) {
            residue = (residue + value) % k;
            auto found = residue_counts.find((int)residue);
            if (found != residue_counts.end()) {
                total += found->second;
            }
            ++residue_counts[(int)residue];
        }
        // Identical value sequences repeat only inside one run of equal
        // values: a span crossing a strict increase is pinned by where it
        // crosses and how much it takes from each edge. A qualifying length
        // L inside a run of length a occupies a - L + 1 positions but counts
        // once, so subtract the a - L excess of every qualifying length. The
        // qualifying lengths are multiples of k / gcd(v, k).
        size_t i = 0;
        while (i < nums.size()) {
            size_t j = i;
            while (j < nums.size() && nums[j] == nums[i]) {
                ++j;
            }
            long long run_length = (long long)(j - i);
            long long step = (long long)k / std::gcd((long long)nums[i], (long long)k);
            long long repeated = run_length / step;
            total -= repeated * run_length - step * repeated * (repeated + 1) / 2;
            i = j;
        }
        return total;
    }
};
