function minimumEffort(tasks: number[][]): number {
    // Order by slack (minimum - actual) descending: a high-slack task done
    // early banks its surplus while the budget is still high — exchange
    // arguments show an adjacent inversion never helps.
    const sorted = tasks.slice().sort((a, b) => b[1] - b[0] - (a[1] - a[0]));
    let spent = 0;
    let answer = 0;
    for (const [actual, minimum] of sorted) {
        // Each task needs current energy >= its minimum, so the answer is
        // the largest prefix requirement; only `actual` is consumed.
        answer = Math.max(answer, spent + minimum);
        spent += actual;
    }
    return answer;
}
