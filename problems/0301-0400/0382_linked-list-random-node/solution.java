import java.util.concurrent.ThreadLocalRandom;

class Solution {

    // The list is materialized once as an array of node values (the wire
    // form already lists them in order); getRandom draws one slot uniformly.
    private final int[] values;

    public Solution(int[] head) {
        values = head.clone();
    }

    public int getRandom() {
        return values[ThreadLocalRandom.current().nextInt(values.length)];
    }
}
