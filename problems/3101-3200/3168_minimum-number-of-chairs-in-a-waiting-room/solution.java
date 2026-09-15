class Solution {

    public int minimumChairs(String s) {
        int people = 0;
        int chairs = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == 'E') {
                people++;
                chairs = Math.max(chairs, people);
            } else {
                people--;
            }
        }
        return chairs;
    }
}
