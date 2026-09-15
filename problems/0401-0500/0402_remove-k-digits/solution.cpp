class Solution {
  public:
    string removeKdigits(string num, int k) {
        string stack;
        for (char ch : num) {
            // A kept digit larger than the arriving one should go: a smaller
            // digit in a more significant position outweighs anything later.
            while (k > 0 && !stack.empty() && stack.back() > ch) {
                stack.pop_back();
                --k;
            }
            stack.push_back(ch);
        }
        // Unspent removals mean the digits were non-decreasing; drop from the
        // end, where the largest digits sit.
        if (k > 0) {
            stack.resize(stack.size() - (size_t)k);
        }
        // Strip leading zeros; a fully consumed input yields "0", not "".
        size_t pos = stack.find_first_not_of('0');
        string result = (pos == string::npos) ? "" : stack.substr(pos);
        return result.empty() ? "0" : result;
    }
};
