class Solution {
  public:
    int countKConstraintSubstrings(string s, int k) {
        int n = s.size();
        int answer = 0;
        for (int left = 0; left < n; left++) {
            int zeros = 0;
            for (int right = left; right < n; right++) {
                if (s[right] == '0') {
                    zeros++;
                }
                int ones = right - left + 1 - zeros;
                if (zeros <= k || ones <= k) {
                    answer++;
                }
            }
        }
        return answer;
    }
};
