import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

class Solution {

    public String[] getFolderNames(String[] names) {
        Set<String> used = new HashSet<>();
        Map<String, Integer> nextK = new HashMap<>();
        String[] result = new String[names.length];
        for (int i = 0; i < names.length; i++) {
            String name = names[i];
            if (!used.contains(name)) {
                used.add(name);
                if (!nextK.containsKey(name)) {
                    nextK.put(name, 1);
                }
                result[i] = name;
                continue;
            }
            String base = name;
            int k = nextK.getOrDefault(base, 1);
            String candidate = base + "(" + k + ")";
            while (used.contains(candidate)) {
                k++;
                candidate = base + "(" + k + ")";
            }
            used.add(candidate);
            nextK.put(base, k + 1);
            int idx = candidate.lastIndexOf('(');
            if (idx > 0 && candidate.endsWith(")")) {
                String digits = candidate.substring(idx + 1, candidate.length() - 1);
                boolean numeric = !digits.isEmpty();
                for (char c : digits.toCharArray()) {
                    if (!Character.isDigit(c)) {
                        numeric = false;
                        break;
                    }
                }
                if (numeric) {
                    String stem = candidate.substring(0, idx);
                    int val = Integer.parseInt(digits) + 1;
                    if (!nextK.containsKey(stem) || nextK.get(stem) < val) {
                        nextK.put(stem, Math.max(nextK.getOrDefault(stem, 1), val));
                    }
                }
            }
            result[i] = candidate;
        }
        return result;
    }
}
