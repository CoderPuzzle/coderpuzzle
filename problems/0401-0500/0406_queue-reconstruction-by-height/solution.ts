function reconstructQueue(people: number[][]): number[][] {
    // Tallest first, ties by smaller k: everyone already placed is then
    // taller-or-equal, so inserting at index k puts exactly k such people
    // in front.
    const ordered = people.map((p) => [p[0], p[1]]).sort((a, b) => (a[0] !== b[0] ? b[0] - a[0] : a[1] - b[1]));
    const queue: number[][] = [];
    // Shorter people inserted later never disturb taller people's counts:
    // they are invisible to a "taller or equal" count.
    for (const person of ordered) {
        queue.splice(person[1], 0, person);
    }
    return queue;
}
