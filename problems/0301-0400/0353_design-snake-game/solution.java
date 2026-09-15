import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashSet;
import java.util.Set;

class SnakeGame {

    // The body as a deque (head at the front, tail at the back) plus a
    // hash set of the cells it covers, each encoded as row * width + col;
    // move() pushes the new head on and — unless food is eaten — pops
    // the tail in the same step, so the snake slides forward exactly one
    // cell and the set answers the body-collision question in O(1).
    private final int width;
    private final int height;
    private final int[][] food;
    private final Deque<Long> body = new ArrayDeque<>();
    private final Set<Long> occupied = new HashSet<>();
    private int nextFood = 0;
    private int score = 0;

    public SnakeGame(int width, int height, int[][] food) {
        this.width = width;
        this.height = height;
        this.food = food;
        body.add(0L);
        occupied.add(0L);
    }

    public int move(String direction) {
        long head = body.peekFirst();
        int row = (int) (head / width);
        int col = (int) (head % width);
        switch (direction) {
            case "U":
                --row;
                break;
            case "D":
                ++row;
                break;
            case "L":
                --col;
                break;
            default:
                ++col;
        }
        if (row < 0 || row >= height || col < 0 || col >= width) {
            return -1;
        }
        boolean eating = nextFood < food.length && food[nextFood][0] == row && food[nextFood][1] == col;
        if (!eating) {
            // The tail vacates its cell in this very step, so a head
            // landing on the CURRENT tail position is legal.
            occupied.remove(body.pollLast());
        }
        long cell = (long) row * width + col;
        if (occupied.contains(cell)) {
            return -1;
        }
        body.addFirst(cell);
        occupied.add(cell);
        if (eating) {
            ++nextFood;
            ++score;
        }
        return score;
    }
}
