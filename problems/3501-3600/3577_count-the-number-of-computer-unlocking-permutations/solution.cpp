class Solution {
  public:
    int countPermutations(vector<int> &complexity) {
        // Computer i can only be unlocked through some already-unlocked
        // j < i with lower complexity, so the leftmost minimum of the whole
        // array can never be unlocked unless it is computer 0 itself: no
        // smaller label exists to unlock it through. Hence the answer is
        // (n - 1)! when complexity[0] is the strict minimum, else 0.
        const long long MOD = 1000000007LL;
        for (size_t i = 1; i < complexity.size(); ++i)
            if (complexity[i] <= complexity[0])
                return 0;
        long long count = 1;
        for (long long multiplier = 2; multiplier < (long long)complexity.size(); ++multiplier)
            count = count * multiplier % MOD;
        return (int)count;
    }
};
