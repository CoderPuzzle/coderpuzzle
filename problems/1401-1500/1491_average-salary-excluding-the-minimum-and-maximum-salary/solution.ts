function average(salary: number[]): number {
    let total = 0;
    let low = Infinity;
    let high = -Infinity;
    for (const value of salary) {
        total += value;
        if (value < low) {
            low = value;
        }
        if (value > high) {
            high = value;
        }
    }
    return (total - low - high) / (salary.length - 2);
}
