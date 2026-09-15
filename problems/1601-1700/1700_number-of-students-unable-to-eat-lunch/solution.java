class Solution {

    // A student who does not want the top sandwich just cycles to the
    // back, leaving the queue in the same state — so only the two
    // preference counts matter. Spend them down the stack and stop at
    // the first unwanted sandwich.
    public int countStudents(int[] students, int[] sandwiches) {
        int[] count = new int[2];
        for (int preference : students) {
            ++count[preference];
        }
        for (int sandwich : sandwiches) {
            // nobody left prefers this type, and nothing below the top of
            // the stack is reachable — everyone remaining goes hungry
            if (count[sandwich] == 0) {
                break;
            }
            --count[sandwich];
        }
        return count[0] + count[1];
    }
}
