import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public String[][] deleteDuplicateFolder(String[][] paths) {
        // trie nodes: children maps name -> node id; node 0 is the root
        List<Map<String, Integer>> children = new ArrayList<>();
        children.add(new HashMap<>());
        int nextId = 1;
        for (String[] path : paths) {
            int node = 0;
            for (String name : path) {
                Integer next = children.get(node).get(name);
                if (next == null) {
                    children.add(new HashMap<>());
                    next = nextId;
                    children.get(node).put(name, next);
                    nextId++;
                }
                node = next;
            }
        }
        int total = nextId;

        // collect all nodes (parents always appear before their children)
        List<Integer> nodes = new ArrayList<>();
        List<Integer> stack = new ArrayList<>();
        stack.add(0);
        while (!stack.isEmpty()) {
            int u = stack.remove(stack.size() - 1);
            nodes.add(u);
            stack.addAll(children.get(u).values());
        }

        // assign subtree signature ids in post-order (children before parents)
        Map<String, Integer> sigToId = new HashMap<>();
        Map<Integer, Integer> sigCounts = new HashMap<>();
        int[] nodeSig = new int[total];
        for (int ni = nodes.size() - 1; ni >= 0; ni--) {
            int node = nodes.get(ni);
            List<Map.Entry<String, Integer>> entries = new ArrayList<>(children.get(node).entrySet());
            entries.sort((a, b) -> a.getKey().compareTo(b.getKey()));
            // build key with separator characters (names cannot contain them)
            StringBuilder sb = new StringBuilder();
            for (Map.Entry<String, Integer> e : entries) {
                sb.append(e.getKey()).append('').append(nodeSig[e.getValue()]).append('');
            }
            String key = sb.toString();
            Integer sidBoxed = sigToId.get(key);
            int sid;
            if (sidBoxed == null) {
                sid = sigToId.size();
                sigToId.put(key, sid);
            } else {
                sid = sidBoxed;
            }
            nodeSig[node] = sid;
            sigCounts.merge(sid, 1, Integer::sum);
        }

        boolean[] marked = new boolean[total];
        for (int node : nodes) {
            if (!children.get(node).isEmpty() && sigCounts.get(nodeSig[node]) >= 2) {
                List<Integer> markStack = new ArrayList<>();
                markStack.add(node);
                while (!markStack.isEmpty()) {
                    int cur = markStack.remove(markStack.size() - 1);
                    marked[cur] = true;
                    markStack.addAll(children.get(cur).values());
                }
            }
        }

        List<List<String>> result = new ArrayList<>();
        List<Object[]> collectStack = new ArrayList<>(); // {node, prefix}
        collectStack.add(new Object[] { 0, new ArrayList<String>() });
        while (!collectStack.isEmpty()) {
            Object[] top = collectStack.remove(collectStack.size() - 1);
            int u = (Integer) top[0];
            @SuppressWarnings("unchecked")
            List<String> prefix = (List<String>) top[1];
            for (Map.Entry<String, Integer> e : children.get(u).entrySet()) {
                if (marked[e.getValue()]) continue;
                List<String> newPath = new ArrayList<>(prefix);
                newPath.add(e.getKey());
                result.add(newPath);
                collectStack.add(new Object[] { e.getValue(), newPath });
            }
        }
        result.sort((a, b) -> {
            int len = Math.min(a.size(), b.size());
            for (int i = 0; i < len; i++) {
                int cmp = a.get(i).compareTo(b.get(i));
                if (cmp != 0) return cmp;
            }
            return Integer.compare(a.size(), b.size());
        });
        String[][] out = new String[result.size()][];
        for (int i = 0; i < result.size(); i++) {
            out[i] = result.get(i).toArray(new String[0]);
        }
        return out;
    }
}
