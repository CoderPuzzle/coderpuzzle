class Solution {

    public long minimumCost(String s) {
        // A prefix flip ending at i-1 (cost i) toggles exactly the left side
        // of border i, and a suffix flip starting at i (cost n-i) toggles
        // exactly its right side; so whenever s[i-1] != s[i], one of the two
        // runs an odd number of times -- pay the cheaper. Borders touch no
        // shared operation, making each fix independent. The sum peaks at
        // n^2/4 ~= 2.5e9, hence the long accumulator.
        int n = s.length();
        long ans = 0;
        for (int i = 1; i < n; ++i) {
            if (s.charAt(i) != s.charAt(i - 1)) {
                ans += Math.min(i, n - i);
            }
        }
        return ans;
    }
}
