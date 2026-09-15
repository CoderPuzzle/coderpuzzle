class Solution {

    public String maskPII(String s) {
        // The '@' sign only appears in emails, so finding it settles
        // which of the two shapes the input is. An email answer keeps
        // the name's first and last letters and everything from the '@'
        // on, folds uppercase to lowercase by adding 32, and pins the
        // name's middle to five asterisks; the name is at least two
        // letters, so even "ab" wears the full five. A phone answer
        // needs only the digits: ten of them form the bare local number,
        // and each digit beyond ten contributes one masked asterisk
        // behind a '+', ahead of the shared "***-***-" tail and the
        // last four digits.
        int at = s.indexOf('@');
        StringBuilder out = new StringBuilder();
        if (at >= 0) {
            for (int i = 0; i < s.length(); i++) {
                // Position 1 opens the fixed five-asterisk middle; the
                // name's first and last letters and the whole domain
                // are the only characters kept.
                if (i == 1) out.append("*****");
                if (i == 0 || i >= at - 1) {
                    char c = s.charAt(i);
                    if (c >= 'A' && c <= 'Z') c += 32;
                    out.append(c);
                }
            }
        } else {
            int count = 0;
            char[] digits = new char[13];
            for (int i = 0; i < s.length(); i++) {
                char c = s.charAt(i);
                if (c >= '0' && c <= '9') digits[count++] = c;
            }
            // Every digit past ten is one masked country-code star.
            if (count > 10) {
                out.append('+');
                for (int i = 10; i < count; i++) out.append('*');
                out.append('-');
            }
            out.append("***-***-");
            for (int i = count - 4; i < count; i++) out.append(digits[i]);
        }
        return out.toString();
    }
}
