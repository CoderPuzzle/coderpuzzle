import java.util.Map;

class Solution {

    public String convertNumber(String s) {
        // Left-to-right greedy scan: at most one digit word can start at any
        // position (no word is a prefix of another), so taking the first hit
        // is unambiguous. Lengths 3, 4, 5 cover all ten words.
        Map<String, String> words = Map.of(
            "zero",
            "0",
            "one",
            "1",
            "two",
            "2",
            "five",
            "5",
            "three",
            "3",
            "four",
            "4",
            "nine",
            "9",
            "six",
            "6",
            "seven",
            "7",
            "eight",
            "8"
        );
        StringBuilder digits = new StringBuilder();
        int n = s.length();
        int i = 0;
        while (i < n) {
            boolean matched = false;
            for (int length = 3; length <= 5 && i + length <= n; ++length) {
                String digit = words.get(s.substring(i, i + length));
                if (digit != null) {
                    digits.append(digit);
                    i += length;
                    matched = true;
                    break;
                }
            }
            if (!matched) {
                ++i;
            }
        }
        return digits.toString();
    }
}
