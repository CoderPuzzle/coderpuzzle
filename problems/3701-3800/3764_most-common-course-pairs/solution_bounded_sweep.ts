function mostCommonCoursePair(completions: string[][]): string[] {
    // Group rows per student; every student is judged and sorted
    // independently of the rest.
    const byStudent = new Map<string, { date: string; course: string; rating: number }[]>();
    for (const [student, course, date, rating] of completions) {
        if (!byStudent.has(student)) {
            byStudent.set(student, []);
        }
        byStudent.get(student)!.push({ date, course, rating: Number(rating) });
    }
    const counts = new Map<string, number>();
    for (const records of byStudent.values()) {
        // Qualification without floats: sum >= 4 * n is exactly
        // "average >= 4" over integer ratings.
        const n = records.length;
        if (n < 5) {
            continue;
        }
        let total = 0;
        for (const record of records) {
            total += record.rating;
        }
        if (total < 4 * n) {
            continue;
        }
        // (date, course) sorts chronologically, name-breaking ties. Plain
        // string comparison is byte order, matching the other languages.
        records.sort((a, b) =>
            a.date < b.date ? -1 : a.date > b.date ? 1 : a.course < b.course ? -1 : a.course > b.course ? 1 : 0,
        );
        for (let i = 1; i < n; i++) {
            const key = records[i - 1].course + " " + records[i].course;
            counts.set(key, (counts.get(key) || 0) + 1);
        }
    }
    // The tuple (-count, first, second) totally orders distinct keys, so the
    // running champion is the same pair no matter how the hash map yields its
    // entries.
    let bestKey: string | null = null;
    let bestCount = -1;
    for (const [key, count] of counts) {
        const better = count > bestCount || (count === bestCount && key < bestKey!);
        if (better) {
            bestCount = count;
            bestKey = key;
        }
    }
    if (bestKey === null) {
        return [];
    }
    const split = bestKey.indexOf(" ");
    return [bestKey.slice(0, split), bestKey.slice(split + 1), String(bestCount)];
}
