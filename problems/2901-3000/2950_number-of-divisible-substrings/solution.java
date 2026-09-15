class Solution {

    public int countDivisibleSubstrings(String word) {
        String digit = "11222333444555666777788899";
        int n = word.length();
        int[] pre = new int[n + 1];
        for (int i = 0; i < n; i++) {
            pre[i + 1] = pre[i] + digit.charAt(word.charAt(i) - 'a') - '0';
        }
        int count = 0;
        for (int start = 0; start < n; start++) {
            for (int end = start + 1; end <= n; end++) {
                if ((pre[end] - pre[start]) % (end - start) == 0) {
                    count++;
                }
            }
        }
        return count;
    }
}
