class Solution {
  public:
    int maxDivScore(vector<int> &nums, vector<int> &divisors) {
        // Brute-force scoring straight from the statement: for every divisor
        // walk all of nums once. At most 1000 * 1000 = 10^6 modulo checks,
        // which fits the limits with room to spare.
        int bestScore = -1;
        int bestDivisor = 0;
        for (int divisor : divisors) {
            int score = 0;
            for (int value : nums)
                if (value % divisor == 0)
                    score++;
            // Strictly larger wins outright; equal scores go to the smaller
            // divisor, which is exactly what `<` checks here.
            if (score > bestScore || (score == bestScore && divisor < bestDivisor)) {
                bestScore = score;
                bestDivisor = divisor;
            }
        }
        return bestDivisor;
    }
};
