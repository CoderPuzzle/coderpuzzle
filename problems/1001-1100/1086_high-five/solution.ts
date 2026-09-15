function highFive(items: number[][]): number[][] {
    // Bucket every score by student, sort each bucket descending, and
    // average the top five with integer division.
    const scores = new Map<number, number[]>();
    for (const [sid, score] of items) {
        const list = scores.get(sid);
        if (list === undefined) scores.set(sid, [score]);
        else list.push(score);
    }
    const ids = [...scores.keys()].sort((a, b) => a - b);
    const result: number[][] = [];
    for (const sid of ids) {
        const list = scores.get(sid)!.sort((a, b) => b - a);
        let total = 0;
        for (let i = 0; i < 5; i++) total += list[i];
        result.push([sid, Math.floor(total / 5)]);
    }
    return result;
}
