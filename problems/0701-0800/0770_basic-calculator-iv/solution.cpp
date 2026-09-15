#include <algorithm>
#include <string>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    vector<string> basicCalculatorIV(string expression, vector<string> &evalvars, vector<int> &evalints) {
        // One scan, two stacks: a stack of polynomials — each a map from a
        // term (its variables, sorted, joined by '*'; "" is the constant
        // term) to its coefficient — and a stack of pending operators.
        // Every operand pushes a one-term polynomial; a variable listed in
        // evalvars (or a number) becomes the constant term. '+' and '-'
        // drain every pending operator down to '(', '*' drains only '*',
        // and ')' drains to its matching '(' — precedence and brackets in
        // four rules. Multiplying pairs every term of both sides, merging
        // the two variable lists into one sorted list; adding merges
        // coefficients of equal terms. Zero terms drop out at the end,
        // where terms print degree-descending first and lexicographic
        // within a degree, coefficient left of its variables.
        unordered_map<string, long long> evalmap;
        for (int k = 0; k < (int)evalvars.size(); k++) {
            evalmap[evalvars[k]] = evalints[k];
        }
        vector<unordered_map<string, long long>> polys;
        vector<char> ops;
        auto apply = [&polys, &ops]() {
            char op = ops.back();
            ops.pop_back();
            auto right = move(polys.back());
            polys.pop_back();
            auto left = move(polys.back());
            polys.pop_back();
            if (op == '*') {
                unordered_map<string, long long> product;
                for (const auto &leftEntry : left) {
                    vector<string> lvars = splitTerm(leftEntry.first);
                    for (const auto &rightEntry : right) {
                        vector<string> merged = lvars;
                        for (const string &v : splitTerm(rightEntry.first)) {
                            merged.push_back(v);
                        }
                        sort(merged.begin(), merged.end());
                        string key;
                        for (int m = 0; m < (int)merged.size(); m++) {
                            if (m > 0) {
                                key += '*';
                            }
                            key += merged[m];
                        }
                        product[key] += leftEntry.second * rightEntry.second;
                    }
                }
                polys.push_back(move(product));
            } else {
                long long sign = op == '+' ? 1 : -1;
                for (const auto &entry : right) {
                    left[entry.first] += sign * entry.second;
                }
                polys.push_back(move(left));
            }
        };
        int n = expression.size();
        int i = 0;
        while (i < n) {
            char ch = expression[i];
            if (ch == ' ') {
                ++i;
            } else if (ch == '(') {
                ops.push_back(ch);
                ++i;
            } else if (ch == ')') {
                while (ops.back() != '(') {
                    apply();
                }
                ops.pop_back();
                ++i;
            } else if (ch == '+' || ch == '-' || ch == '*') {
                while (!ops.empty() && (ch == '*' ? ops.back() == '*' : ops.back() != '(')) {
                    apply();
                }
                ops.push_back(ch);
                ++i;
            } else {
                int j = i;
                while (j < n && isalnum((unsigned char)expression[j])) {
                    ++j;
                }
                string token = expression.substr(i, j - i);
                unordered_map<string, long long> poly;
                if (isdigit((unsigned char)token[0])) {
                    poly[""] = stoll(token);
                } else if (evalmap.count(token)) {
                    poly[""] = evalmap[token];
                } else {
                    poly[token] = 1;
                }
                polys.push_back(move(poly));
                i = j;
            }
        }
        while (!ops.empty()) {
            apply();
        }
        unordered_map<string, long long> result = move(polys.back());
        vector<pair<string, long long>> terms;
        for (const auto &entry : result) {
            if (entry.second != 0) {
                terms.emplace_back(entry.first, entry.second);
            }
        }
        sort(terms.begin(), terms.end(), [](const pair<string, long long> &a, const pair<string, long long> &b) {
            int da = degree(a.first);
            int db = degree(b.first);
            if (da != db) {
                return da > db;
            }
            return a.first < b.first;
        });
        vector<string> out;
        out.reserve(terms.size());
        for (const auto &term : terms) {
            if (term.first.empty()) {
                out.push_back(to_string(term.second));
            } else {
                out.push_back(to_string(term.second) + "*" + term.first);
            }
        }
        return out;
    }

  private:
    static vector<string> splitTerm(const string &key) {
        vector<string> parts;
        if (key.empty()) {
            return parts;
        }
        string current;
        for (char ch : key) {
            if (ch == '*') {
                parts.push_back(current);
                current.clear();
            } else {
                current += ch;
            }
        }
        parts.push_back(current);
        return parts;
    }

    static int degree(const string &key) {
        if (key.empty()) {
            return 0;
        }
        return (int)count(key.begin(), key.end(), '*') + 1;
    }
};
