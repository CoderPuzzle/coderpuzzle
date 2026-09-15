import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

class Solution {

    public String[] findAllRecipes(String[] recipes, String[][] ingredients, String[] supplies) {
        Set<String> have = new HashSet<>(Arrays.asList(supplies));
        Map<String, Integer> index = new HashMap<>();
        for (int i = 0; i < recipes.length; i++) {
            index.put(recipes[i], i);
        }
        int n = recipes.length;
        List<List<Integer>> dependents = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            dependents.add(new ArrayList<>());
        }
        int[] indegree = new int[n];
        boolean[] impossible = new boolean[n];
        for (int i = 0; i < n; i++) {
            Set<Integer> seen = new HashSet<>();
            for (String item : ingredients[i]) {
                // An initial supply satisfies the requirement outright.
                if (have.contains(item)) {
                    continue;
                }
                Integer j = index.get(item);
                if (j == null) {
                    // Neither supply nor recipe: never makeable.
                    impossible[i] = true;
                } else if (seen.add(j)) {
                    // seen dedupes repeated ingredients so the indegree
                    // counts each recipe dependency once.
                    indegree[i]++;
                    dependents.get(j).add(i);
                }
            }
        }

        // Kahn's algorithm: recipes needing nothing beyond the supplies start
        // made; cycles never reach indegree zero and drop out automatically.
        List<Integer> queue = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0 && !impossible[i]) {
                queue.add(i);
            }
        }
        List<String> made = new ArrayList<>();
        for (int head = 0; head < queue.size(); head++) {
            int i = queue.get(head);
            made.add(recipes[i]);
            for (int j : dependents.get(i)) {
                // Skip impossible recipes so their failure never blocks or
                // corrupts the rest.
                if (impossible[j]) {
                    continue;
                }
                if (--indegree[j] == 0) {
                    queue.add(j);
                }
            }
        }
        // comparison is order-insensitive; sort for determinism
        made.sort(null);
        return made.toArray(new String[0]);
    }
}
