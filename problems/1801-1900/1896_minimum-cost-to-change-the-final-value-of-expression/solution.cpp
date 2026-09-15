class Solution {
  public:
    // item: kind 0 -> operator ch; kind 1 -> value/cost pair (v, c)
    struct Item {
        int kind;
        char ch;
        int v;
        int c;
    };

    static pair<int, int> combine(pair<int, int> a, pair<int, int> b, char op) {
        int va = a.first, ca = a.second;
        int vb = b.first, cb = b.second;
        int v, c;
        if (op == '&') {
            v = va & vb;
            if (v == 0) {
                if (va == 0 && vb == 0) {
                    c = min(ca, cb) + 1;
                } else if (va == 0) { // 0 & 1
                    c = min(ca, 1);
                } else { // 1 & 0
                    c = min(cb, 1);
                }
            } else { // 1 & 1
                c = min(ca, cb);
            }
        } else { // '|'
            v = va | vb;
            if (v == 0) { // 0 | 0 -> flip one operand to 1
                c = min(ca, cb);
            } else if (va == 0) { // 0 | 1 -> flip b to 0 or switch to '&'
                c = min(cb, 1);
            } else if (vb == 0) { // 1 | 0 -> flip a to 0 or switch to '&'
                c = min(ca, 1);
            } else { // 1 | 1 -> both must become 0, or flip one and switch to '&'
                c = min(ca, cb) + 1;
            }
        }
        return make_pair(v, c);
    }

    static pair<int, int> evalSeq(vector<pair<int, int>> &values, vector<char> &ops) {
        pair<int, int> result = values[0];
        for (size_t i = 0; i < ops.size(); i++) {
            result = combine(result, values[i + 1], ops[i]);
        }
        return result;
    }

    int minOperationsToFlip(string expression) {
        vector<Item> stack;
        auto pushOp = [&](char ch) {
            Item it;
            it.kind = 0;
            it.ch = ch;
            it.v = 0;
            it.c = 0;
            stack.push_back(it);
        };
        auto pushVal = [&](int v, int c) {
            Item it;
            it.kind = 1;
            it.ch = 0;
            it.v = v;
            it.c = c;
            stack.push_back(it);
        };

        for (char ch : expression) {
            if (ch == '(') {
                pushOp('(');
            } else if (ch == '&' || ch == '|') {
                pushOp(ch);
            } else if (ch == '0' || ch == '1') {
                pushVal(ch - '0', 1);
            } else { // ')'
                vector<pair<int, int>> values;
                vector<char> ops;
                while (!stack.empty() && !(stack.back().kind == 0 && stack.back().ch == '(')) {
                    Item it = stack.back();
                    stack.pop_back();
                    if (it.kind == 0) {
                        ops.push_back(it.ch);
                    } else {
                        values.push_back(make_pair(it.v, it.c));
                    }
                }
                stack.pop_back(); // remove '('
                reverse(values.begin(), values.end());
                reverse(ops.begin(), ops.end());
                pair<int, int> res = evalSeq(values, ops);
                pushVal(res.first, res.second);
            }
        }
        vector<pair<int, int>> values;
        vector<char> ops;
        for (Item &it : stack) {
            if (it.kind == 0) {
                ops.push_back(it.ch);
            } else {
                values.push_back(make_pair(it.v, it.c));
            }
        }
        return evalSeq(values, ops).second;
    }
};
