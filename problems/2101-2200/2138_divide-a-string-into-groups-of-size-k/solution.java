import java.util.ArrayList;
import java.util.List;

class Solution {

    public String[] divideString(String s, int k, String fill) {
        StringBuilder padded = new StringBuilder(s);
        int padding = (k - (s.length() % k)) % k;
        for (int count = 0; count < padding; count++) {
            padded.append(fill.charAt(0));
        }

        List<String> groups = new ArrayList<>();
        for (int start = 0; start < padded.length(); start += k) {
            groups.add(padded.substring(start, start + k));
        }
        return groups.toArray(new String[0]);
    }
}
