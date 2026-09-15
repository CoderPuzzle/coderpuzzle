import java.util.List;

class File {

    private final List<String> content;
    private long budget;
    private int position;

    // capacity is the judge's out-buffer allocation for the case; the file
    // itself does not use it.
    public File(List<String> content, int capacity, long budget) {
        this.content = content;
        this.budget = budget;
        this.position = 0;
    }

    public int read4(char[] buf4) {
        if (budget <= 0) {
            throw new RuntimeException("Oracle query budget exhausted");
        }
        --budget;
        int count = Math.min(4, content.size() - position);
        for (int index = 0; index < count; ++index) {
            buf4[index] = content.get(position + index).charAt(0);
        }
        position += count;
        return count;
    }
}
