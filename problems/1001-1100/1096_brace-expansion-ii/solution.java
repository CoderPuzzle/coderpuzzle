import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public String[] braceExpansionII(String expression) {
        // Iterative stack machine. cur holds the words of the concatenation
        // so far; a '{' pushes it as a saved prefix and starts a group whose
        // comma-separated alternatives accumulate in a union slot (an empty
        // set marks "no alternatives yet"); a '}' closes the group and
        // concatenates its union onto the saved prefix.
        List<Set<String>> stack = new ArrayList<>();
        Set<String> cur = new HashSet<>(Arrays.asList(""));
        for (char ch : expression.toCharArray()) {
            String c = String.valueOf(ch);
            if (c.equals("{")) {
                stack.add(new HashSet<>(cur));
                stack.add(new HashSet<>()); // group union slot
                cur = new HashSet<>(Arrays.asList(""));
            } else if (c.equals(",")) {
                Set<String> slot = stack.get(stack.size() - 1);
                if (slot.isEmpty()) {
                    stack.set(stack.size() - 1, cur);
                } else {
                    slot.addAll(cur);
                }
                cur = new HashSet<>(Arrays.asList(""));
            } else if (c.equals("}")) {
                Set<String> group = stack.get(stack.size() - 1);
                stack.remove(stack.size() - 1);
                if (group.isEmpty()) {
                    group = cur;
                } else {
                    group.addAll(cur);
                }
                Set<String> prev = stack.get(stack.size() - 1);
                stack.remove(stack.size() - 1);
                Set<String> next = new HashSet<>();
                for (String a : prev) {
                    for (String b : group) next.add(a + b);
                }
                cur = next;
            } else {
                Set<String> next = new HashSet<>();
                for (String w : cur) next.add(w + c);
                cur = next;
            }
        }
        List<String> result = new ArrayList<>(cur);
        Collections.sort(result);
        return result.toArray(new String[0]);
    }
}
