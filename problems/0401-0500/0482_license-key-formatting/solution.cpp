class Solution {
  public:
    string licenseKeyFormatting(string s, int k) {
        // Dashes are separators, not content: build the cleaned key by
        // dropping them and uppercasing everything that remains.
        string key;
        for (char ch : s) {
            if (ch != '-') {
                key += toupper((unsigned char)ch);
            }
        }
        int n = (int)key.size();
        if (n == 0) {
            return "";
        }
        // Only the first group may be short, and only when the key length
        // leaves a remainder — otherwise it holds the full k characters.
        int head = n % k == 0 ? k : n % k;
        string result = key.substr(0, head);
        for (int i = head; i < n; i += k) {
            result += '-';
            result += key.substr(i, k);
        }
        return result;
    }
};
