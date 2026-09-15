import java.util.ArrayList;
import java.util.List;

class Solution {

    public int minMutation(String startGene, String endGene, String[] bank) {
        // Already there: no character has to change, and no path through the
        // bank can beat zero mutations.
        if (startGene.equals(endGene)) {
            return 0;
        }
        // BFS over the mutation graph: genes are nodes, edges join genes that
        // differ in exactly one of the 8 characters, and every step after the
        // first must land on a bank entry.
        boolean[] visited = new boolean[bank.length];
        List<String> frontier = new ArrayList<>();
        frontier.add(startGene);
        int depth = 0;
        while (!frontier.isEmpty()) {
            depth++;
            List<String> next = new ArrayList<>();
            for (String gene : frontier) {
                for (int i = 0; i < bank.length; ++i) {
                    if (visited[i] || differences(gene, bank[i]) != 1) {
                        continue;
                    }
                    if (bank[i].equals(endGene)) {
                        return depth;
                    }
                    visited[i] = true;
                    next.add(bank[i]);
                }
            }
            frontier = next;
        }
        return -1;
    }

    // Number of positions in which two equal-length genes differ.
    private int differences(String a, String b) {
        int count = 0;
        for (int i = 0; i < a.length(); ++i) {
            if (a.charAt(i) != b.charAt(i)) {
                ++count;
            }
        }
        return count;
    }
}
