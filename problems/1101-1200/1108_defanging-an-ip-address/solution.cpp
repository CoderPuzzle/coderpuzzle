class Solution {
  public:
    string defangIPaddr(string address) {
        // Build the result character by character: the input is a valid IPv4
        // address, so every '.' sits between numeric segments and each one
        // expands to the three characters "[.]".
        string result;
        result.reserve(address.size() + 6);
        for (char ch : address) {
            if (ch == '.') {
                result += "[.]";
            } else {
                result += ch;
            }
        }
        return result;
    }
};
