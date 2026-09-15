class Solution {
  public:
    string minimizeResult(string expression) {
        size_t plus = expression.find('+');
        string left = expression.substr(0, plus);
        string right = expression.substr(plus + 1);
        long long best_value = LLONG_MAX;
        string best_form;
        for (size_t i = 0; i < left.size(); i++) {
            long long outer_left = i > 0 ? stoll(left.substr(0, i)) : 1;
            long long inner_left = stoll(left.substr(i));
            for (size_t j = 1; j <= right.size(); j++) {
                long long inner_right = stoll(right.substr(0, j));
                long long outer_right = j < right.size() ? stoll(right.substr(j)) : 1;
                long long value = outer_left * (inner_left + inner_right) * outer_right;
                if (value < best_value) {
                    best_value = value;
                    best_form =
                        left.substr(0, i) + "(" + left.substr(i) + "+" + right.substr(0, j) + ")" + right.substr(j);
                }
            }
        }
        return best_form;
    }
};
