class Solution {

    public String countAndSay(int n) {
        // The first term is fixed; each later term is the run-length encoding
        // of the one before it, so n - 1 encoding passes reach the nth term.
        String term = "1";
        for (int step = 1; step < n; ++step) {
            StringBuilder next = new StringBuilder();
            int index = 0;
            while (index < term.length()) {
                // Measure the maximal run starting at index: the group the
                // encoder must emit as <count><digit>, then skip past it.
                int run = 1;
                while (index + run < term.length() && term.charAt(index + run) == term.charAt(index)) ++run;
                next.append(run).append(term.charAt(index));
                index += run;
            }
            term = next.toString();
        }
        return term;
    }
}
