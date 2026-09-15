import java.util.HashSet;
import java.util.Set;

class Solution {

    public int uniqueEmailGroups(String[] emails) {
        // A group is identified by its normalized address: the local part
        // loses its dots and anything from the first '+', then both parts
        // are lowercased.
        Set<String> seen = new HashSet<>();
        for (String email : emails) {
            int at = email.indexOf('@');
            String local = email.substring(0, at);
            int plus = local.indexOf('+');
            if (plus != -1) {
                local = local.substring(0, plus);
            }
            String key = local.replace(".", "").toLowerCase() + "@" + email.substring(at + 1).toLowerCase();
            seen.add(key);
        }
        return seen.size();
    }
}
