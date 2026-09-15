import java.util.List;

class File {

    private final List<String> content;
    private long budget;
    private int position;

    public File(List<String> content, long budget) {
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
