class Solution {

    public String findLatestTime(String s) {
        // Enumeration per the hint: try every one of the 12 * 60 legal times
        // in ascending order and keep the last pattern match; that last match
        // is the latest obtainable time.
        String best = "";
        for (int hh = 0; hh < 12; ++hh) {
            for (int mm = 0; mm < 60; ++mm) {
                String candidate = String.format("%02d:%02d", hh, mm);
                boolean ok = true;
                for (int i = 0; i < 5 && ok; ++i) {
                    if (s.charAt(i) != '?' && s.charAt(i) != candidate.charAt(i)) ok = false;
                }
                if (ok) best = candidate;
            }
        }
        return best;
    }
}
