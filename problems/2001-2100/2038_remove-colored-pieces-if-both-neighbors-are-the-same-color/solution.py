class Solution:
    def winnerOfGame(self, colors: str) -> bool:
        alice_moves = 0
        bob_moves = 0

        for i in range(1, len(colors) - 1):
            if colors[i - 1] == colors[i] == colors[i + 1]:
                if colors[i] == "A":
                    alice_moves += 1
                else:
                    bob_moves += 1

        return alice_moves > bob_moves
