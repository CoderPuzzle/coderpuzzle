import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[] findItinerary(String[][] tickets) {
        Map<String, List<String>> graph = new HashMap<>();
        for (String[] ticket : tickets) {
            graph.computeIfAbsent(ticket[0], k -> new ArrayList<>()).add(ticket[1]);
        }
        for (List<String> adj : graph.values()) {
            adj.sort((a, b) -> b.compareTo(a)); // descending
        }

        // Iterative Hierholzer: always take the lexicographically smallest
        // unused ticket (last element of the descending-sorted list).
        List<String> route = new ArrayList<>();
        Deque<String> stack = new ArrayDeque<>();
        stack.push("JFK");
        while (!stack.isEmpty()) {
            String airport = stack.peek();
            List<String> adj = graph.get(airport);
            if (adj != null && !adj.isEmpty()) {
                stack.push(adj.remove(adj.size() - 1));
            } else {
                // No unused edges left: emit in postorder so dead-end
                // airports land at their latest possible position.
                route.add(airport);
                stack.pop();
            }
        }
        String[] result = new String[route.size()];
        for (int i = 0; i < route.size(); i++) {
            result[i] = route.get(route.size() - 1 - i);
        }
        return result;
    }
}
