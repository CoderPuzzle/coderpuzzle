class Solution {

    public String removeDigit(String number, String digit) {
        String best = null;
        for (int i = 0; i < number.length(); i++) {
            if (number.charAt(i) == digit.charAt(0)) {
                String candidate = number.substring(0, i) + number.substring(i + 1);
                if (best == null || candidate.compareTo(best) > 0) {
                    best = candidate;
                }
            }
        }
        return best;
    }
}
