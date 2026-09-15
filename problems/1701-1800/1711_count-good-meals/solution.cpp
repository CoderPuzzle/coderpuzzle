class Solution {
  public:
    // A good meal needs two values summing to a power of two. Values are
    // capped at 2^20, so a sum never exceeds 2^21: exactly the 22 powers
    // 2^0 .. 2^21 are possible targets and nothing else. Counting how
    // often each value occurs settles every pair at once. For a distinct
    // value v and a power p, the mate w = p - v contributes
    // count(v) * count(w) pairs when w > v, while w == v (p equal to 2v
    // exactly) contributes count(v) choose 2: the pairs of equal-valued
    // items at different indices. The raw total reaches n * (n - 1) / 2,
    // past 32 bits, so it accumulates in a long long and reduces mod
    // 10^9 + 7 at the end.
    int countPairs(vector<int> &deliciousness) {
        constexpr long long MOD = 1'000'000'007;
        unordered_map<int, int> count;
        for (int value : deliciousness) {
            ++count[value];
        }
        long long total = 0;
        for (const auto &[value, c] : count) {
            for (int power = 1; power <= 1 << 21; power <<= 1) {
                int mate = power - value;
                if (mate > value) {
                    auto it = count.find(mate);
                    if (it != count.end()) {
                        total += static_cast<long long>(c) * it->second;
                    }
                } else if (mate == value) {
                    total += static_cast<long long>(c) * (c - 1) / 2;
                }
            }
        }
        return static_cast<int>(total % MOD);
    }
};
