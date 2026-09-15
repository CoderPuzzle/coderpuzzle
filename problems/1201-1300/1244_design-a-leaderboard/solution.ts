class Leaderboard {
    private scores = new Map<number, number>();

    constructor() {}

    addScore(playerId: number, score: number): void {
        this.scores.set(playerId, (this.scores.get(playerId) ?? 0) + score);
    }

    top(K: number): number {
        // Removing on reset (not zeroing) keeps zeros out of this sort.
        const values = [...this.scores.values()].sort((a, b) => b - a);
        let sum = 0;
        for (let i = 0; i < K; ++i) sum += values[i];
        return sum;
    }

    reset(playerId: number): void {
        this.scores.delete(playerId);
    }
}
