class Solution {
  public:
    long long countExcellentPairs(vector<int> &nums, int k) {
        // identity: popcount(a|b) + popcount(a&b) = popcount(a) + popcount(b),
        // so the pair condition depends only on the two individual bit counts
        // dedupe: pairs are counted over distinct values
        unordered_set<int> unique(nums.begin(), nums.end());
        // bucket distinct values by their set-bit count
        long long counts[64] = {0};
        for (int x : unique)
            counts[__builtin_popcount((unsigned)x)]++;
        long long answer = 0;
        // ordered bucket pairs: c1*c2 covers (a,b) and (b,a), plus (a,a) once
        for (int b1 = 0; b1 < 64; b1++) {
            if (counts[b1] == 0)
                continue;
            for (int b2 = 0; b2 < 64; b2++) {
                if (b1 + b2 >= k)
                    answer += counts[b1] * counts[b2];
            }
        }
        return answer;
    }
};
