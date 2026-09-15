class Solution {
  public:
    bool isValid(string code) {
        // One left-to-right scan with a stack of open tag names. The
        // outermost tag is special: it must open at position 0 and its end
        // tag must be the last thing in the string, so any content seen
        // while the stack is empty is an immediate rejection.
        vector<string> stack;
        int n = code.size();
        int i = 0;
        while (i < n) {
            if (code.compare(i, 9, "<![CDATA[") == 0) {
                // Cdata is legal only inside tag content, and its body runs
                // to the first "]]>" — everything between is opaque text.
                if (stack.empty())
                    return false;
                size_t end = code.find("]]>", i);
                if (end == string::npos)
                    return false;
                i = end + 3;
            } else if (code.compare(i, 2, "</") == 0) {
                // An end tag's name runs to the next ">"; it must equal the
                // most recently opened tag, or the nesting is unbalanced.
                if (stack.empty())
                    return false;
                size_t j = code.find('>', i);
                if (j == string::npos || code.substr(i + 2, j - i - 2) != stack.back())
                    return false;
                stack.pop_back();
                if (stack.empty() && j != (size_t)(n - 1))
                    return false;
                // The outer tag closed, yet content remains.
                i = j + 1;
            } else if (code[i] == '<') {
                // A start tag: parse the name to the next ">" and gate it
                // through the strict grammar before it enters the stack.
                size_t j = code.find('>', i);
                if (j == string::npos)
                    return false;
                string name = code.substr(i + 1, j - i - 1);
                if (!tagName(name))
                    return false;
                stack.push_back(name);
                i = j + 1;
            } else if (stack.empty()) {
                return false; // plain text outside any tag
            } else {
                i++;
            }
        }
        return stack.empty();
    }

  private:
    // 1-9 characters, upper-case letters only.
    bool tagName(const string &name) {
        if (name.size() < 1 || name.size() > 9)
            return false;
        for (char ch : name) {
            if (ch < 'A' || ch > 'Z')
                return false;
        }
        return true;
    }
};
