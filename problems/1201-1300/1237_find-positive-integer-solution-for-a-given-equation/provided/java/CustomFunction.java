class CustomFunction {

    private final int functionId;
    private long budget;

    public CustomFunction(int functionId, long budget) {
        this.functionId = functionId;
        this.budget = budget;
    }

    // Returns some positive integer f(x, y) for two positive integers x and y
    // based on a formula.
    public int f(int x, int y) {
        if (budget <= 0) {
            throw new RuntimeException("Oracle query budget exhausted");
        }
        --budget;
        long a = x;
        long b = y;
        long value;
        switch (functionId) {
            case 1:
                value = a + b;
                break;
            case 2:
                value = a * b;
                break;
            case 3:
                value = a * a + b;
                break;
            case 4:
                value = a + b * b;
                break;
            case 5:
                value = a * a + b * b;
                break;
            case 6:
                value = 10 * a + b;
                break;
            case 7:
                value = a * a * a + b * b * b;
                break;
            case 8:
                value = (a + b) * (a + b);
                break;
            case 9:
                value = a * b + a + b;
                break;
            default:
                throw new RuntimeException("Unknown function_id");
        }
        return (int) value;
    }
}
