import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] restoreIpAddresses(String s) {
        List<String> addresses = new ArrayList<>();
        cut(s, 0, new ArrayList<>(), addresses);
        return addresses.toArray(new String[0]);
    }

    private void cut(String s, int start, List<String> segments, List<String> addresses) {
        int remaining = 4 - segments.size();
        // What is left must feed 1-3 digits to every remaining segment; at
        // zero segments left this accepts only a fully consumed string.
        if (remaining > s.length() - start || s.length() - start > 3 * remaining) {
            return;
        }
        if (remaining == 0) {
            addresses.add(String.join(".", segments));
            return;
        }
        // Shorter cuts first: a dot sorts before any digit, so the output
        // lands in ascending lexicographic order.
        for (int length = 1; length <= 3; ++length) {
            if (start + length > s.length()) {
                break;
            }
            String part = s.substring(start, start + length);
            // A segment is 0-255 with no leading zero unless it is exactly "0".
            if (part.length() > 1 && part.charAt(0) == '0') {
                continue;
            }
            if (Integer.parseInt(part) > 255) {
                continue;
            }
            segments.add(part);
            cut(s, start + length, segments, addresses);
            segments.remove(segments.size() - 1);
        }
    }
}
