import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[] subdomainVisits(String[] cpdomains) {
        // One pass: each entry fans its count out over every dot-suffix of
        // its domain — the domain itself and each subdomain cut at a dot.
        Map<String, Integer> counts = new HashMap<>();
        for (String cpdomain : cpdomains) {
            String[] parts = cpdomain.split(" ", -1);
            int rep = Integer.parseInt(parts[0]);
            String domain = parts[1];
            int from = 0;
            while (true) {
                String subdomain = domain.substring(from);
                counts.merge(subdomain, rep, Integer::sum);
                int dot = domain.indexOf('.', from);
                if (dot == -1) {
                    break;
                }
                from = dot + 1;
            }
        }
        // Pinned output order: ascending lexicographic by domain name —
        // an explicit comparator, never map iteration order.
        List<String> names = new ArrayList<>(counts.keySet());
        names.sort(String::compareTo);
        String[] result = new String[names.size()];
        for (int i = 0; i < names.size(); i++) {
            result[i] = counts.get(names.get(i)) + " " + names.get(i);
        }
        return result;
    }
}
