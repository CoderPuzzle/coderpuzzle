class Leaderboard {
    constructor() {
        this.scores = new Map();
    }

    addScore(playerId, score) {
        this.scores.set(playerId, (this.scores.get(playerId) ?? 0) + score);
    }

    top(K) {
        // Removing on reset (not zeroing) keeps zeros out of this sort.
        const values = [...this.scores.values()].sort((a, b) => b - a);
        let sum = 0;
        for (let i = 0; i < K; ++i) sum += values[i];
        return sum;
    }

    reset(playerId) {
        this.scores.delete(playerId);
    }
}
