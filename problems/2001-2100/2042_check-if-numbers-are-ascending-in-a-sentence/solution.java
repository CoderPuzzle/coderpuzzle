class Solution {

    public boolean areNumbersAscending(String s) {
        int previous = 0;

        for (String token : s.split(" ")) {
            char first = token.charAt(0);
            if (first >= '0' && first <= '9') {
                int current = Integer.parseInt(token);
                if (current <= previous) {
                    return false;
                }
                previous = current;
            }
        }

        return true;
    }
}
