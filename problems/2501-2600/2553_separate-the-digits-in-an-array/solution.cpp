class Solution {
  public:
    std::vector<int> separateDigits(std::vector<int> &nums) {
        // First pass sizes the result from each number's digit count; the
        // second strips digits by division into a small buffer and flushes
        // it reversed, keeping numbers in order while digits lift low-first.
        // Values reach 10^5, whose six-digit ceiling bounds the buffer.
        int total = 0;
        for (int x : nums) {
            for (int v = x; v > 0; v /= 10)
                ++total;
        }
        std::vector<int> out;
        out.reserve(total);
        std::vector<int> buf(6);
        for (int x : nums) {
            int t = 0;
            for (int v = x; v > 0; v /= 10) {
                buf[t++] = v % 10;
            }
            while (t > 0) {
                out.push_back(buf[--t]);
            }
        }
        return out;
    }
};
