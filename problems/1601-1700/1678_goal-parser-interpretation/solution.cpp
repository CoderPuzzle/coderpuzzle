class Solution {
  public:
    string interpret(string command) {
        // Scan left to right. 'G' emits "G" and advances 1. An open paren
        // can only begin "()" or "(al)": peek the next character — ')'
        // emits "o" and advances 2, 'a' emits "al" and advances 4.
        string out;
        out.reserve(command.size());
        for (size_t i = 0; i < command.size();) {
            if (command[i] == 'G') {
                out += 'G';
                i += 1;
            } else if (command[i + 1] == ')') {
                out += 'o';
                i += 2;
            } else {
                out += "al";
                i += 4;
            }
        }
        return out;
    }
};
