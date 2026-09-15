class Solution {

    public int maxScore(String s) {
        int zerosLeft = 0;
        int onesRight = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '1') {
                onesRight++;
            }
        }
        int best = Integer.MIN_VALUE;
        for (int i = 0; i < s.length() - 1; i++) {
            if (s.charAt(i) == '0') {
                zerosLeft++;
            } else {
                onesRight--;
            }
            int score = zerosLeft + onesRight;
            best = Math.max(best, score);
        }
        return best;
    }
}
