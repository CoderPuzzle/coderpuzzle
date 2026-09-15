class Solution {
  public:
    string smallestNumber(string n) {
        // The wire carries n as decimal text; 10^18 fits easily in a
        // signed 64-bit integer.
        long long value = stoll(n);
        if (value == 1) {
            return "1";
        }
        // Largest-first trial division packs the factors into as few
        // digits as possible and leaves the smallest remainders behind.
        int counts[10] = {};
        for (int digit = 9; digit >= 2; --digit) {
            while (value % digit == 0) {
                ++counts[digit];
                value /= digit;
            }
        }
        if (value != 1) {
            return "-1";
        }
        string answer;
        for (int digit = 2; digit <= 9; ++digit) {
            answer.append(counts[digit], static_cast<char>('0' + digit));
        }
        return answer;
    }
};
