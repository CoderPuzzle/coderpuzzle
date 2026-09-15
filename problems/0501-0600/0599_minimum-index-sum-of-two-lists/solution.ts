function findRestaurant(list1: string[], list2: string[]): string[] {
    // The strings of each list are unique, so one map from a string to
    // its index in list1 settles every "where does it count from" query.
    const indexOf = new Map<string, number>();
    list1.forEach((s, i) => indexOf.set(s, i));
    let best = 0;
    const result: string[] = [];
    list2.forEach((s, j) => {
        const i = indexOf.get(s);
        if (i === undefined) {
            return;
        }
        // A strictly smaller index sum restarts the winners at the new
        // minimum; an equal one extends the tie, so the winners come out
        // in the order they appear in list2.
        if (result.length === 0 || i + j < best) {
            best = i + j;
            result.length = 0;
            result.push(s);
        } else if (i + j === best) {
            result.push(s);
        }
    });
    return result;
}
