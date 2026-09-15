class Solution {
  public:
    long long appealSum(string s) {
        // flip the accounting: per character, count the substrings containing it
        long long last[26];
        // -1 = not yet seen, so i - last[c] counts all i + 1 possible starts
        fill(begin(last), end(last), -1);
        long long total = 0;
        // current = total appeal of all substrings ending at i
        long long current = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            int c = s[i] - 'a';
            // s[i] is newly counted in the substrings starting after its previous
            // occurrence
            current += i - last[c];
            last[c] = i;
            // each substring is charged once per distinct char it contains: its appeal
            total += current;
        }
        return total;
    }
};
