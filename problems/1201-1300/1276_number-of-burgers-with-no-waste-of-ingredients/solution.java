import java.util.ArrayList;
import java.util.List;

class Solution {

    public List<Integer> numOfBurgers(int tomatoSlices, int cheeseSlices) {
        // Solve the system: 4J + 2S = tomatoes, J + S = cheese. Doubling
        // the cheese equation and subtracting isolates jumbo:
        // 2J = tomatoes - 2*cheese. The pair exists iff that value is a
        // non-negative even integer and the back-solved small count is
        // non-negative too.
        long twoJumbo = (long) tomatoSlices - 2L * cheeseSlices;
        if (twoJumbo < 0 || twoJumbo % 2 != 0) {
            return new ArrayList<>();
        }
        long jumbo = twoJumbo / 2;
        long small = cheeseSlices - jumbo;
        if (small < 0) {
            return new ArrayList<>();
        }
        return List.of((int) jumbo, (int) small);
    }
}
