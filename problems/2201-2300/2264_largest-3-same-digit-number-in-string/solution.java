class Solution {

    public String largestGoodInteger(String num) {
        String best = "";
        int run = 1;
        for (int i = 1; i < num.length(); i++) {
            if (num.charAt(i) == num.charAt(i - 1)) {
                run++;
            } else {
                run = 1;
            }
            if (run == 3) {
                String candidate = num.substring(i - 2, i + 1);
                if (candidate.compareTo(best) > 0) {
                    best = candidate;
                }
            }
        }
        return best;
    }
}
