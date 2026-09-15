import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] removeComments(String[] source) {
        // Each comment is decided by reading order — line by line, left to
        // right, first marker wins — so one pass with a single flag (inside a
        // block comment) and one buffer for the line under construction is
        // the whole computation. Entering or leaving a comment skips two
        // characters, so the closer of "/*/" never overlaps its opener. The
        // buffer flushes only when a line ends outside a block: an emptied
        // line is dropped, code before an opener joins code after its closer.
        List<String> result = new ArrayList<>();
        StringBuilder buffer = new StringBuilder();
        boolean inBlock = false;
        for (String line : source) {
            int i = 0;
            while (i < line.length()) {
                if (inBlock) {
                    if (i + 1 < line.length() && line.charAt(i) == '*' && line.charAt(i + 1) == '/') {
                        inBlock = false;
                        i += 2;
                    } else {
                        i++;
                    }
                } else if (i + 1 < line.length() && line.charAt(i) == '/' && line.charAt(i + 1) == '/') {
                    break;
                } else if (i + 1 < line.length() && line.charAt(i) == '/' && line.charAt(i + 1) == '*') {
                    inBlock = true;
                    i += 2;
                } else {
                    buffer.append(line.charAt(i));
                    i++;
                }
            }
            if (!inBlock) {
                if (buffer.length() > 0) {
                    result.add(buffer.toString());
                }
                buffer.setLength(0);
            }
        }
        return result.toArray(new String[0]);
    }
}
