class Solution {

    public int countKConstraintSubstrings(String s, int k) {
        int n = s.length();
        int answer = 0;
        for (int left = 0; left < n; left++) {
            int zeros = 0;
            for (int right = left; right < n; right++) {
                if (s.charAt(right) == '0') {
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
}
