function minimumDeletions(s: string): number {
    // Cost of putting the a/b boundary right before index 0: delete
    // every 'a' (the whole string would sit in the b-region).
    let cost = 0;
    for (const c of s) {
        if (c === "a") {
            cost++;
        }
    }
    let best = cost;
    // Slide the boundary one character right at a time. Passing an 'a'
    // removes it from the future deletion cost; passing a 'b' adds it,
    // since it now sits left of the boundary.
    for (const c of s) {
        if (c === "a") {
            cost--;
        } else {
            cost++;
        }
        best = Math.min(best, cost);
    }
    return best;
}
