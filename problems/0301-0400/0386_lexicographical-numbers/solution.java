class Solution {

    public int[] lexicalOrder(int n) {
        // Lexicographic order on 1..n is pre-order on the denary trie of
        // decimal spellings: descend with curr*10 while it stays within n.
        int[] result = new int[n];
        int curr = 1;
        for (int index = 0; index < n; ++index) {
            result[index] = curr;
            if (curr * 10 <= n) {
                curr *= 10;
            } else {
                // No child, so the successor is the next sibling curr+1 — but
                // a 9 has no next sibling digit and past n none is in range,
                // so climb toward the root until +1 is legal again.
                while (curr % 10 == 9 || curr + 1 > n) {
                    curr /= 10;
                }
                curr += 1;
            }
        }
        return result;
    }
}
