import java.util.ArrayList;
import java.util.List;

class MRUQueue {

    // The queue lives in consecutive blocks of about sqrt(n) slots: fetch
    // walks the blocks, subtracting each size from k, to find the kth
    // element, lifts it out of its own block, and re-appends it at the tail
    // — an empty block is dropped, a full tail rolls the value into a fresh
    // block.
    private final List<List<Integer>> blocks = new ArrayList<>();
    private final int width;

    public MRUQueue(int n) {
        width = (int) Math.sqrt(n) + 1;
        for (int start = 1; start <= n; start += width) {
            int end = Math.min(start + width, n + 1);
            List<Integer> block = new ArrayList<>(width);
            for (int value = start; value < end; value++) {
                block.add(value);
            }
            blocks.add(block);
        }
    }

    public int fetch(int k) {
        int index = 0;
        while (k > blocks.get(index).size()) {
            k -= blocks.get(index).size();
            index++;
        }
        List<Integer> block = blocks.get(index);
        int value = block.remove(k - 1);
        if (block.isEmpty()) {
            blocks.remove(index);
        }
        List<Integer> tail = blocks.isEmpty() ? null : blocks.get(blocks.size() - 1);
        if (tail == null || tail.size() >= width) {
            List<Integer> fresh = new ArrayList<>();
            fresh.add(value);
            blocks.add(fresh);
        } else {
            tail.add(value);
        }
        return value;
    }
}
