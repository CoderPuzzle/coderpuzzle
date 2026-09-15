import java.util.*;

class Solution {

    public String shortestSuperstring(String[] words) {
        int k = words.length;
        int[][] overlap = new int[k][k];
        for (int i = 0; i < k; i++) {
            for (int j = 0; j < k; j++) {
                if (i == j) continue;
                int best = 0;
                int limit = Math.min(words[i].length(), words[j].length());
                for (int size = 1; size <= limit; size++) {
                    if (words[i].substring(words[i].length() - size).equals(words[j].substring(0, size))) {
                        best = size;
                    }
                }
                overlap[i][j] = best;
            }
        }

        int total = 1 << k;
        int[][] dpLen = new int[total][k];
        String[][] dpStr = new String[total][k];
        int[][][] dpSeq = new int[total][k][];
        for (int i = 0; i < k; i++) {
            dpLen[1 << i][i] = words[i].length();
            dpStr[1 << i][i] = words[i];
            dpSeq[1 << i][i] = new int[] { i };
        }

        for (int mask = 0; mask < total; mask++) {
            for (int j = 0; j < k; j++) {
                if (dpStr[mask][j] == null) continue;
                int curLen = dpLen[mask][j];
                String curStr = dpStr[mask][j];
                int[] curSeq = dpSeq[mask][j];
                for (int nxt = 0; nxt < k; nxt++) {
                    if (((mask >> nxt) & 1) != 0) continue;
                    int candLen = curLen + words[nxt].length() - overlap[j][nxt];
                    String candStr = curStr + words[nxt].substring(overlap[j][nxt]);
                    int[] candSeq = Arrays.copyOf(curSeq, curSeq.length + 1);
                    candSeq[curSeq.length] = nxt;
                    int newMask = mask | (1 << nxt);
                    String existing = dpStr[newMask][nxt];
                    if (
                        existing == null ||
                        candLen < dpLen[newMask][nxt] ||
                        (candLen == dpLen[newMask][nxt] && seqLess(candSeq, dpSeq[newMask][nxt]))
                    ) {
                        dpLen[newMask][nxt] = candLen;
                        dpStr[newMask][nxt] = candStr;
                        dpSeq[newMask][nxt] = candSeq;
                    }
                }
            }
        }

        int full = total - 1;
        int bestJ = -1;
        for (int j = 0; j < k; j++) {
            if (dpStr[full][j] == null) continue;
            if (
                bestJ == -1 ||
                dpLen[full][j] < dpLen[full][bestJ] ||
                (dpLen[full][j] == dpLen[full][bestJ] && seqLess(dpSeq[full][j], dpSeq[full][bestJ]))
            ) {
                bestJ = j;
            }
        }
        return dpStr[full][bestJ];
    }

    private boolean seqLess(int[] x, int[] y) {
        for (int q = 0; q < x.length; q++) {
            if (x[q] != y[q]) return x[q] < y[q];
        }
        return false;
    }
}
