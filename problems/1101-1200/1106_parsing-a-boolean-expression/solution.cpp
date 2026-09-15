class Solution {
  public:
    bool parseBoolExpr(string expression) { return parse(expression, 0).first; }

  private:
    pair<bool, int> parse(const string &expression, int index) {
        char ch = expression[index];
        if (ch == 't') {
            return {true, index + 1};
        }
        if (ch == 'f') {
            return {false, index + 1};
        }
        char op = ch;
        index += 2; // skip the operator and '('
        vector<bool> values;
        while (true) {
            auto [value, next] = parse(expression, index);
            values.push_back(value);
            index = next;
            if (expression[index] == ',') {
                index += 1;
            } else { // ')'
                index += 1;
                break;
            }
        }
        if (op == '!') {
            return {!values[0], index};
        }
        if (op == '&') {
            bool all = true;
            for (bool value : values) {
                all = all && value;
            }
            return {all, index};
        }
        bool any = false;
        for (bool value : values) {
            any = any || value;
        }
        return {any, index};
    }
};
