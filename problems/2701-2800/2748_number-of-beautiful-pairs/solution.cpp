class Solution {
  public:
    int countBeautifulPairs(vector<int> &nums) {
        // A pair is beautiful iff the first digit of nums[i] and the last
        // digit of nums[j] are coprime; n <= 100, so test every pair.
        int count = 0;
        for (int i = 0; i < (int)nums.size(); ++i) {
            // Leading digit of nums[i] straight from its decimal string.
            int first = to_string(nums[i]).front() - '0';
            for (int j = i + 1; j < (int)nums.size(); ++j) {
                // Last digit is nonzero by the constraints, and gcd(1, d)
                // == 1 makes every pair with a first digit of 1 beautiful,
                // including two 1s.
                if (gcd(first, nums[j] % 10) == 1)
                    ++count;
            }
        }
        return count;
    }

  private:
    int gcd(int a, int b) {
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
};
