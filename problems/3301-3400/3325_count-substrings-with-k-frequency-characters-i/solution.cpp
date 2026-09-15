class Solution {
  public:
    int numberOfSubstrings(string s, int k) {
        // For each right end, grow the window left-to-right and shrink
        // from the left while some character inside has frequency k or
        // more; the last start dropped marks left-1 as the smallest start
        // making s[left-1..right] valid, so exactly `left` substrings
        // ending at right qualify (starts 0..left-1). The first valid end
        // only moves right as the start advances — dropping a character
        // never lowers an inside frequency — so the two pointers sweep
        // once. The answer counts pairs, at most n(n+1)/2 for n = 3000,
        // far inside 32 bits.
        vector<int> freq(26, 0);
        int saturated = 0;
        int ans = 0;
        int left = 0;
        for (int right = 0; right < (int)s.size(); ++right) {
            int i = s[right] - 'a';
            ++freq[i];
            if (freq[i] == k) {
                ++saturated;
            }
            while (saturated > 0) {
                int j = s[left] - 'a';
                if (freq[j] == k) {
                    --saturated;
                }
                --freq[j];
                ++left;
            }
            ans += left;
        }
        return ans;
    }
};
