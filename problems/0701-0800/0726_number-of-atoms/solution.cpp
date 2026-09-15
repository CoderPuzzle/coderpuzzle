class Solution {
  public:
    string countOfAtoms(string formula) {
        // Scan the formula once with an explicit stack of count maps. '('
        // opens a fresh map; an element name — one uppercase letter plus any
        // lowercase run — lands its count (implicit 1) in the top map; ')'
        // pops the top map, reads the optional trailing multiplier, and
        // folds every atom into the parent scaled by it. The bottom map left
        // at the end holds the totals, written in sorted name order with
        // counts of 1 omitted.
        vector<unordered_map<string, long long>> stack(1);
        int n = formula.size();
        int i = 0;
        while (i < n) {
            char c = formula[i];
            if (c == '(') {
                stack.emplace_back();
                ++i;
            } else if (c == ')') {
                int j = i + 1;
                while (j < n && isdigit(formula[j])) {
                    ++j;
                }
                long long mult = j > i + 1 ? stoll(formula.substr(i + 1, j - i - 1)) : 1;
                unordered_map<string, long long> group = move(stack.back());
                stack.pop_back();
                auto &top = stack.back();
                for (const auto &kv : group) {
                    top[kv.first] += kv.second * mult;
                }
                i = j;
            } else {
                int j = i + 1;
                while (j < n && islower(formula[j])) {
                    ++j;
                }
                string name = formula.substr(i, j - i);
                int k = j;
                while (k < n && isdigit(formula[k])) {
                    ++k;
                }
                long long cnt = k > j ? stoll(formula.substr(j, k - j)) : 1;
                stack.back()[name] += cnt;
                i = k;
            }
        }
        vector<string> names;
        names.reserve(stack.back().size());
        for (const auto &kv : stack.back()) {
            names.push_back(kv.first);
        }
        sort(names.begin(), names.end());
        string out;
        for (const string &name : names) {
            long long cnt = stack.back()[name];
            out += name;
            if (cnt > 1) {
                out += to_string(cnt);
            }
        }
        return out;
    }
};
