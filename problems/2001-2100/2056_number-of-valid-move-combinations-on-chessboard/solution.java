import java.util.ArrayList;
import java.util.List;

class Solution {

    public int countCombinations(String[] pieces, int[][] positions) {
        List<int[]>[] options = new ArrayList[pieces.length];
        for (int index = 0; index < pieces.length; index++) {
            options[index] = movesFor(pieces[index], positions[index]);
        }
        return search(0, positions, options, new int[pieces.length][]);
    }

    private List<int[]> movesFor(String piece, int[] position) {
        int[][] orthogonal = { { 1, 0 }, { -1, 0 }, { 0, 1 }, { 0, -1 } };
        int[][] diagonal = { { 1, 1 }, { 1, -1 }, { -1, 1 }, { -1, -1 } };
        int[][] directions;
        if (piece.equals("rook")) {
            directions = orthogonal;
        } else if (piece.equals("bishop")) {
            directions = diagonal;
        } else {
            directions = new int[][] {
                { 1, 0 },
                { -1, 0 },
                { 0, 1 },
                { 0, -1 },
                { 1, 1 },
                { 1, -1 },
                { -1, 1 },
                { -1, -1 },
            };
        }
        List<int[]> moves = new ArrayList<>();
        moves.add(new int[] { 0, 0, 0 });
        for (int[] direction : directions) {
            for (int steps = 1; ; steps++) {
                int row = position[0] + direction[0] * steps;
                int column = position[1] + direction[1] * steps;
                if (row < 1 || row > 8 || column < 1 || column > 8) {
                    break;
                }
                moves.add(new int[] { direction[0], direction[1], steps });
            }
        }
        return moves;
    }

    private int search(int index, int[][] positions, List<int[]>[] options, int[][] chosen) {
        if (index == options.length) {
            return 1;
        }
        int total = 0;
        for (int[] move : options[index]) {
            boolean valid = true;
            for (int other = 0; other < index && valid; other++) {
                valid = compatible(index, move, other, chosen[other], positions);
            }
            if (valid) {
                chosen[index] = move;
                total += search(index + 1, positions, options, chosen);
            }
        }
        return total;
    }

    private boolean compatible(int index, int[] move, int other, int[] otherMove, int[][] positions) {
        for (int second = 0; second <= 7; second++) {
            int row = positions[index][0] + move[0] * Math.min(second, move[2]);
            int column = positions[index][1] + move[1] * Math.min(second, move[2]);
            int otherRow = positions[other][0] + otherMove[0] * Math.min(second, otherMove[2]);
            int otherColumn = positions[other][1] + otherMove[1] * Math.min(second, otherMove[2]);
            if (row == otherRow && column == otherColumn) {
                return false;
            }
        }
        return true;
    }
}
