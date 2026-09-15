class Solution {
  public:
    string betterCompression(string compressed) {
        vector<int> counts(26, 0);
        int i = 0;
        int n = compressed.size();
        while (i < n) {
            int letter = compressed[i] - 'a';
            i++;
            int freq = 0;
            while (i < n && compressed[i] >= '0' && compressed[i] <= '9') {
                freq = freq * 10 + (compressed[i] - '0');
                i++;
            }
            counts[letter] += freq;
        }
        string result;
        for (int letter = 0; letter < 26; letter++) {
            if (counts[letter] > 0) {
                result += char('a' + letter);
                result += to_string(counts[letter]);
            }
        }
        return result;
    }
};
