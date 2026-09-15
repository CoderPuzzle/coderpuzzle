import java.util.ArrayList;
import java.util.List;

class Solution {

    public String toHexspeak(String num) {
        // Peel hex digits by repeated divmod — no format strings, so the
        // digit alphabet stays explicit: 0->O, 1->I, 10..15 -> A..F, and
        // digits 2..9 make the representation invalid.
        List<Integer> digits = new ArrayList<>();
        long n = Long.parseLong(num);
        while (true) {
            int r = (int) (n % 16);
            digits.add(r);
            n /= 16;
            if (n == 0) {
                break;
            }
        }
        StringBuilder letters = new StringBuilder();
        for (int i = digits.size() - 1; i >= 0; i--) {
            int r = digits.get(i);
            if (r >= 2 && r <= 9) {
                return "ERROR";
            }
            if (r == 0) {
                letters.append('O');
            } else if (r == 1) {
                letters.append('I');
            } else {
                letters.append((char) ('A' + r - 10));
            }
        }
        return letters.toString();
    }
}
