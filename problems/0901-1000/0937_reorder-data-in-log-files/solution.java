import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] reorderLogFiles(String[] logs) {
        // Each letter entry carries [content, identifier, original log];
        // digit logs are set aside untouched.
        List<String[]> letter = new ArrayList<>();
        List<String> digit = new ArrayList<>();
        for (String log : logs) {
            int space = log.indexOf(' ');
            String ident = log.substring(0, space);
            String content = log.substring(space + 1);
            // The content's first character classifies the log: a digit
            // makes it a digit-log, which the sort never touches.
            if (Character.isDigit(content.charAt(0))) {
                digit.add(log);
            } else {
                letter.add(new String[] { content, ident, log });
            }
        }
        // Letter-logs order by (content, identifier) — a total order, since
        // equal keys mean identical logs — then every digit-log follows in
        // its input position.
        letter.sort((a, b) -> {
            int byContent = a[0].compareTo(b[0]);
            if (byContent != 0) {
                return byContent;
            }
            return a[1].compareTo(b[1]);
        });
        String[] result = new String[logs.length];
        int i = 0;
        for (String[] entry : letter) {
            result[i++] = entry[2];
        }
        for (String log : digit) {
            result[i++] = log;
        }
        return result;
    }
}
