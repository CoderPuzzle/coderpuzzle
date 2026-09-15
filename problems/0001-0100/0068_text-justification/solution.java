import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] fullJustify(String[] words, int maxWidth) {
        // Greedy packing: the current line keeps accepting words while its
        // letters plus one joining space per gap still fit in maxWidth; the
        // first word that would overflow opens a new line.
        List<List<String>> lines = new ArrayList<>();
        List<String> current = new ArrayList<>();
        int letters = 0;
        for (String word : words) {
            if (!current.isEmpty() && letters + word.length() + current.size() > maxWidth) {
                lines.add(current);
                current = new ArrayList<>();
                letters = 0;
            }
            current.add(word);
            letters += word.length();
        }
        lines.add(current);

        String[] justified = new String[lines.size()];
        for (int index = 0; index < lines.size(); ++index) {
            List<String> line = lines.get(index);
            // The last line, and any line holding a single word, is
            // left-justified: single spaces, padding all on the tail.
            if (index == lines.size() - 1 || line.size() == 1) {
                StringBuilder text = new StringBuilder(String.join(" ", line));
                justified[index] = text.append(" ".repeat(maxWidth - text.length())).toString();
                continue;
            }
            letters = 0;
            for (String word : line) letters += word.length();
            int gaps = line.size() - 1;
            int base = (maxWidth - letters) / gaps;
            int extra = (maxWidth - letters) % gaps;
            StringBuilder text = new StringBuilder();
            for (int gap = 0; gap < gaps; ++gap) {
                text.append(line.get(gap));
                // Every gap gets `base` spaces and the leftmost `extra` gaps
                // one more, so left slots are never narrower than right ones.
                text.append(" ".repeat(base + (gap < extra ? 1 : 0)));
            }
            text.append(line.get(gaps));
            justified[index] = text.toString();
        }
        return justified;
    }
}
