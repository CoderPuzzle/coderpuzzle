function matchPlayersAndTrainers(players: number[], trainers: number[]): number {
    players = players.slice().sort((a, b) => a - b);
    trainers = trainers.slice().sort((a, b) => a - b);
    // Greedy: pair the weakest unmatched player with the weakest
    // unmatched trainer — optimal by an exchange argument.
    let i = 0;
    let j = 0;
    let matches = 0;
    while (i < players.length && j < trainers.length) {
        if (players[i] <= trainers[j]) {
            matches += 1;
            i += 1;
            j += 1;
        } else {
            // Trainer too weak for the weakest remaining player; players
            // only get stronger, so it is useless forever — skip it.
            j += 1;
        }
    }
    return matches;
}
