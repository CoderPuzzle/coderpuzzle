class Solution {
  public:
    string digitSum(string s, int k) {
        while (s.size() > static_cast<size_t>(k)) {
            string next;
            for (size_t i = 0; i < s.size(); i += k) {
                int sum = 0;
                for (size_t j = i; j < min(i + k, s.size()); j++) {
                    sum += s[j] - '0';
                }
                next += to_string(sum);
            }
            s = next;
        }
        return s;
    }
};
