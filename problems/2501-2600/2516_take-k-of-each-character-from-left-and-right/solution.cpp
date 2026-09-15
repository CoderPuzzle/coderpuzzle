class Solution {
  public:
    int takeCharacters(string s, int k) {
        // Equivalently: keep the longest middle stretch whose letter counts
        // stay at or under total - k; the ends taken to delete it are then
        // k of each letter or more. Answer = n - that longest window.
        int n = (int)s.size();
        long long total[3] = {};
        for (char ch : s)
            total[ch - 'a']++;
        if (total[0] < k || total[1] < k || total[2] < k)
            return -1;
        long long window[3] = {};
        int left = 0;
        int best = 0;
        for (int right = 0; right < n; ++right) {
            ++window[s[right] - 'a'];
            while (window[0] > total[0] - k || window[1] > total[1] - k || window[2] > total[2] - k) {
                --window[s[left] - 'a'];
                ++left;
            }
            best = max(best, right - left + 1);
        }
        return n - best;
    }
};
