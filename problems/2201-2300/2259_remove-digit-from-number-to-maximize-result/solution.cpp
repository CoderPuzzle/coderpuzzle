class Solution {
  public:
    string removeDigit(string number, string digit) {
        const char d = digit[0];
        string best;
        for (size_t i = 0; i < number.size(); i++) {
            if (number[i] == d) {
                string candidate = number.substr(0, i) + number.substr(i + 1);
                if (best.empty() || candidate > best) {
                    best = candidate;
                }
            }
        }
        return best;
    }
};
