import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] countPairsOfConnectableServers(int[][] edges, int signalSpeed) {
        int n = edges.length + 1;
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(new int[] { e[1], e[2] });
            adj.get(e[1]).add(new int[] { e[0], e[2] });
        }

        int[] answer = new int[n];

        // For each server c, flood every branch (one component per neighbor)
        // separately, counting the servers whose distance from c is divisible
        // by signalSpeed. Two paths out of c share an edge exactly when they
        // leave along the same first edge, so cross-branch pairs are exactly
        // the connectable ones; c itself sits in no branch. A parent guard
        // prevents revisits -- sufficient in a tree -- and the explicit
        // stack (each tree node enters it at most once, so size n holds)
        // keeps the walk off the call stack.
        int[] stackU = new int[n];
        int[] stackP = new int[n];
        int[] stackD = new int[n];
        for (int c = 0; c < n; c++) {
            int total = 0,
                squareSum = 0;
            for (int[] root : adj.get(c)) {
                int count = 0,
                    sp = 0;
                stackU[sp] = root[0];
                stackP[sp] = c;
                stackD[sp] = root[1] % signalSpeed;
                sp++;
                while (sp > 0) {
                    sp--;
                    int u = stackU[sp],
                        parent = stackP[sp],
                        dist = stackD[sp];
                    if (dist == 0) count++;
                    for (int[] vw : adj.get(u)) {
                        if (vw[0] != parent) {
                            stackU[sp] = vw[0];
                            stackP[sp] = u;
                            stackD[sp] = (dist + vw[1]) % signalSpeed;
                            sp++;
                        }
                    }
                }
                total += count;
                squareSum += count * count;
            }
            // Cross-branch pairs: sum of cnt_i * cnt_j over i < j.
            answer[c] = (total * total - squareSum) / 2;
        }
        return answer;
    }
}
