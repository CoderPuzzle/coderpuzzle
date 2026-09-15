import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean canFormArray(int[] arr, int[][] pieces) {
        // Every value across pieces is distinct, so a piece is uniquely
        // identified by its first element. Map that value to the piece,
        // then walk arr and match pieces to consecutive slices.
        Map<Integer, int[]> first = new HashMap<>();
        for (int[] piece : pieces) first.put(piece[0], piece);

        int index = 0;
        while (index < arr.length) {
            int[] piece = first.get(arr[index]);
            if (piece == null || index + piece.length > arr.length) return false;
            for (int offset = 0; offset < piece.length; ++offset) {
                if (arr[index + offset] != piece[offset]) return false;
            }
            index += piece.length;
        }
        return true;
    }
}
