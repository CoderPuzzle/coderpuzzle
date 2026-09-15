class Solution {
  public:
    long long numberOfSpecialSubstrings(string s) {
        // last[c] is the most recent index of c; left is the smallest
        // window start keeping s[left..i] free of repeating characters.
        vector<int> last(26, -1);
        int left = 0;
        long long ans = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            int c = s[i] - 'a';
            // An occurrence left of the window yields last[c] + 1 <= left,
            // so stale entries leave the window untouched.
            left = max(left, last[c] + 1);
            // Every start in [left..i] ends a special substring at i.
            ans += i - left + 1;
            last[c] = i;
        }
        return ans;
    }
};
