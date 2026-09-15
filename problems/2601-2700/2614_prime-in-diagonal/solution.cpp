#include <vector>

class Solution {
  public:
    int diagonalPrime(vector<vector<int>> &nums) {
        // Only the two diagonals can contribute, so walk both index legs
        // once and keep the largest value that survives a primality test.
        // Trial division by 2 and then odd factors up to sqrt(value) caps
        // each check near 2000 steps, since values never exceed 4*10^6.
        auto isPrime = [](int value) {
            if (value < 2)
                return false;
            if (value % 2 == 0)
                return value == 2;
            for (long long factor = 3; factor * factor <= value; factor += 2)
                if (value % factor == 0)
                    return false;
            return true;
        };
        int best = 0;
        int size = nums.size();
        for (int i = 0; i < size; i++) {
            int primary = nums[i][i];
            int secondary = nums[i][size - 1 - i];
            if (isPrime(primary) && primary > best)
                best = primary;
            if (isPrime(secondary) && secondary > best)
                best = secondary;
        }
        return best;
    }
};
