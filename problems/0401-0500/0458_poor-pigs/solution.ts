function poorPigs(buckets: number, minutesToDie: number, minutesToTest: number): number {
    // The budget fits minutesToTest / minutesToDie feeding rounds — a
    // partial extra wait never reaches a death — and through those rounds
    // plus final survival each pig lands in exactly one of rounds + 1
    // states: it dies in round 1..rounds, or never. p pigs are then p
    // digits of a base-(rounds + 1) number whose outcome vectors cover
    // (rounds + 1)^p buckets, and by counting fewer pigs cannot. The
    // answer is the smallest p whose coverage reaches buckets; buckets
    // = 1 starts covered, needing 0 pigs. Multiplying out (never a
    // floating log) keeps power boundaries like 512 = 2^9 versus 513
    // exact; buckets <= 1000 caps the loop at ten steps.
    const states = Math.floor(minutesToTest / minutesToDie) + 1;
    let pigs = 0;
    let covered = 1;
    while (covered < buckets) {
        covered *= states;
        pigs++;
    }
    return pigs;
}
