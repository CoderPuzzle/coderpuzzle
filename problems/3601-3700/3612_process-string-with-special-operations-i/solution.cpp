class Solution {
  public:
    string processStr(string s) {
        // The specials mutate the result built so far: letters append,
        // '*' drops the tail, '#' doubles, '%' reverses. With s capped at
        // 20 chars the result never exceeds 2^19 characters, so building
        // the string directly is cheap and obviously correct.
        string result;
        for (char ch : s) {
            if (ch >= 'a' && ch <= 'z') {
                result += ch;
            } else if (ch == '*') {
                if (!result.empty()) {
                    result.pop_back();
                }
            } else if (ch == '#') {
                string doubled = result;
                result += doubled;
            } else { // '%'
                reverse(result.begin(), result.end());
            }
        }
        return result;
    }
};
