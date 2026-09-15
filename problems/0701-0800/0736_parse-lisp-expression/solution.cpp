class Solution {
  public:
    int evaluate(string expression) {
        vector<string> tokens = tokenize(expression);
        int idx = 0;
        return parse(tokens, idx, {});
    }

  private:
    vector<string> tokenize(const string &s) {
        string spaced;
        spaced.reserve(s.size() + 8);
        for (char c : s) {
            if (c == '(')
                spaced += " ( ";
            else if (c == ')')
                spaced += " ) ";
            else
                spaced += c;
        }
        vector<string> tokens;
        stringstream ss(spaced);
        string t;
        while (ss >> t)
            tokens.push_back(t);
        return tokens;
    }

    static bool isVar(const string &t) {
        char c = t[0];
        return c >= 'a' && c <= 'z';
    }

    // A token at position i starts the final expression of a let iff it is
    // "(...", a literal, or a variable immediately followed by ")".
    static bool exprStart(const vector<string> &tokens, int i) {
        const string &t = tokens[i];
        if (t == "(" || !isVar(t))
            return true;
        return tokens[i + 1] == ")";
    }

    int parse(const vector<string> &tokens, int &i, unordered_map<string, int> env) {
        const string &token = tokens[i];
        if (token != "(") {
            int value = 0;
            if (isVar(token))
                value = env.at(token);
            else
                value = stoi(token);
            i++;
            return value;
        }
        const string &op = tokens[i + 1];
        i += 2;
        if (op == "add" || op == "mult") {
            int a = parse(tokens, i, env);
            int b = parse(tokens, i, env);
            i++; // consume ')'
            return op == "add" ? a + b : a * b;
        }
        // let
        int value = 0;
        while (tokens[i] != ")") {
            if (exprStart(tokens, i)) {
                value = parse(tokens, i, env);
            } else {
                string var = tokens[i];
                i++;
                value = parse(tokens, i, env);
                env[var] = value;
            }
        }
        i++; // consume ')'
        return value;
    }
};
