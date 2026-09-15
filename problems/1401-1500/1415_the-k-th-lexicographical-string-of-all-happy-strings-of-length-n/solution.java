class Solution {

    public String getHappyString(int n, int k) {
        int total = 3 * (1 << (n - 1));
        if (k > total) {
            return "";
        }
        char[] letters = { 'a', 'b', 'c' };
        StringBuilder result = new StringBuilder();
        int block = total / 3;
        int rank = k - 1;
        for (int i = 0; i < n; i++) {
            char[] candidates;
            if (i == 0) {
                candidates = letters;
            } else {
                char previous = result.charAt(result.length() - 1);
                candidates = new char[2];
                int fill = 0;
                for (char c : letters) {
                    if (c != previous) {
                        candidates[fill++] = c;
                    }
                }
            }
            int index = rank / block;
            rank %= block;
            result.append(candidates[index]);
            block /= 2;
        }
        return result.toString();
    }
}
