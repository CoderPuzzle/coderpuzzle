class Solution {

    public String reorderSpaces(String text) {
        String[] words = text.trim().split("\\s+");
        // Empty input trims to "" and split still yields [""], but the
        // statement guarantees at least one word, so that case never occurs.
        int spaces = 0;
        for (int i = 0; i < text.length(); i++) {
            if (text.charAt(i) == ' ') {
                spaces++;
            }
        }

        if (words.length == 1) {
            // A single word: every space is trailing.
            StringBuilder sb = new StringBuilder(words[0]);
            for (int i = 0; i < spaces; i++) {
                sb.append(' ');
            }
            return sb.toString();
        }

        // Distribute spaces as evenly as possible between the gaps, and
        // push whatever does not divide evenly to the end.
        int gaps = words.length - 1;
        int between = spaces / gaps;
        int extra = spaces % gaps;

        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            if (i > 0) {
                for (int j = 0; j < between; j++) {
                    sb.append(' ');
                }
            }
            sb.append(words[i]);
        }
        for (int i = 0; i < extra; i++) {
            sb.append(' ');
        }
        return sb.toString();
    }
}
