class Solution {
  public:
    // Positive: insert before the first digit < x (else append).
    // Negative: insert before the first digit > x (else append).
    string maxValue(string n, int x) {
        char d = static_cast<char>('0' + x);
        size_t start = (n[0] == '-') ? 1 : 0;
        for (size_t i = start; i < n.size(); i++) {
            bool better = (n[0] == '-') ? n[i] > d : n[i] < d;
            if (better) {
                return n.substr(0, i) + d + n.substr(i);
            }
        }
        return n + d;
    }
};
