import java.util.ArrayList;
import java.util.List;

class Solution {

    private static final String[] ONES = { "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine" };
    private static final String[] TEENS = {
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
    };
    private static final String[] TENS = {
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
    };

    // Walk the scales high to low: each non-empty group spells itself and
    // appends its scale word, so an all-zero middle group (1000010's
    // thousands) contributes nothing at all.
    public String numberToWords(int num) {
        int[] scaleValues = { 1000000000, 1000000, 1000 };
        String[] scaleNames = { "Billion", "Million", "Thousand" };
        List<String> pieces = new ArrayList<>();
        for (int i = 0; i < scaleValues.length; ++i) {
            if (num >= scaleValues[i]) {
                pieces.add(underThousand(num / scaleValues[i]));
                pieces.add(scaleNames[i]);
                num %= scaleValues[i];
            }
        }
        if (num > 0) pieces.add(underThousand(num));
        // Zero is the only input that leaves no piece — it spells itself.
        return pieces.isEmpty() ? "Zero" : String.join(" ", pieces);
    }

    // One group below 1000: the hundreds digit's word plus "Hundred", then
    // the remainder under 100 — taken wholesale through the teens, tens
    // word plus ones digit otherwise.
    private String underThousand(int value) {
        List<String> group = new ArrayList<>();
        if (value >= 100) {
            group.add(ONES[value / 100]);
            group.add("Hundred");
            value %= 100;
        }
        if (value >= 20) {
            group.add(TENS[value / 10]);
            value %= 10;
        } else if (value >= 10) {
            group.add(TEENS[value - 10]);
            value = 0;
        }
        if (value > 0) group.add(ONES[value]);
        return String.join(" ", group);
    }
}
