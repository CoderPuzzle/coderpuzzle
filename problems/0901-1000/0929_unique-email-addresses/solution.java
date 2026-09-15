import java.util.HashSet;
import java.util.Set;

class Solution {

    public int numUniqueEmails(String[] emails) {
        Set<String> distinct = new HashSet<>();
        StringBuilder normalized = new StringBuilder();
        for (String email : emails) {
            normalized.setLength(0);
            boolean ignored = false;
            for (int i = 0; i < email.length(); i++) {
                char ch = email.charAt(i);
                if (ch == '@') {
                    // The domain is untouched: take it verbatim from '@' on.
                    normalized.append(email, i, email.length());
                    break;
                }
                if (ignored) {
                    continue; // everything after the first '+' is dropped
                }
                if (ch == '.') {
                    continue; // dots in the local name vanish
                }
                if (ch == '+') {
                    ignored = true;
                    continue;
                }
                normalized.append(ch);
            }
            distinct.add(normalized.toString());
        }
        return distinct.size();
    }
}
