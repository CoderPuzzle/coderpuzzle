class Solution {

    public String getSmallestString(String s, int k) {
        // Greedy per position: the smallest feasible letter is 'a' when its
        // cyclic distance still fits the budget; otherwise every smaller
        // letter is out of reach and exactly `budget` steps down from s[i]
        // is the first affordable letter.
        StringBuilder result = new StringBuilder();
        int budget = k;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            int step = ch - 'a';
            int toA = Math.min(step, 26 - step);
            if (toA <= budget) {
                result.append('a');
                budget -= toA;
            } else {
                result.append((char) (ch - budget));
                budget = 0;
            }
        }
        return result.toString();
    }
}
