class Solution {

    public boolean isAdditiveNumber(String num) {
        // The first two numbers fix the whole sequence, so try each split of
        // them and let string addition verify the remainder. No machine
        // integers anywhere: rejected candidates can outgrow 64 bits.
        int n = num.length();
        for (int i = 1; i < n; i++) {
            if (!valid(num, 0, i)) continue;
            // j < n leaves at least one digit for the third number.
            for (int j = i + 1; j < n; j++) {
                if (!valid(num, i, j)) continue;
                if (consumes(num, num.substring(0, i), num.substring(i, j), j)) return true;
            }
        }
        return false;
    }

    private boolean valid(String num, int start, int end) {
        // Multi-digit numbers may not open with '0'; a lone 0 is legal.
        return end - start == 1 || num.charAt(start) != '0';
    }

    private boolean consumes(String num, String first, String second, int start) {
        // Greedy walk: the next number's digits are exactly the sum's
        // digits, so its length is never a choice.
        while (start < num.length()) {
            String total = add(first, second);
            if (!num.startsWith(total, start)) return false;
            start += total.length();
            first = second;
            second = total;
        }
        return true;
    }

    private String add(String a, String b) {
        // Schoolbook addition on digit characters, least significant
        // first, carrying as we go.
        StringBuilder digits = new StringBuilder();
        int carry = 0;
        int i = a.length() - 1,
            j = b.length() - 1;
        while (i >= 0 || j >= 0 || carry > 0) {
            int total = carry;
            if (i >= 0) total += a.charAt(i--) - '0';
            if (j >= 0) total += b.charAt(j--) - '0';
            digits.append((char) ('0' + (total % 10)));
            carry = total / 10;
        }
        return digits.reverse().toString();
    }
}
