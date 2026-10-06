"""Trusted-validator contracts through api.app.judge._compare: every
registry entry gets a valid answer (accepted) and at least one near-miss
(rejected), plus the design-list threading and the unknown-name error path.

Each validator spec is trusted authoring content (see docs/TRUST-BOUNDARIES.md);
these tests pin the acceptance boundary the judge enforces at run time.
"""
import unittest

from api.app.judge import _compare


def spec(name, params=None):
    return {"mode": "validator", "name": name, "params": params or {}}


def accepts(actual, validator_spec, case_input=None):
    return _compare(actual, validator_spec, "exact", case_input)


class FizzBuzzValidatorTests(unittest.TestCase):
    # fizzbuzz (1195): recorded prints in order — ints or rendered tokens.
    def test_accepts_printed_numbers_and_rendered_tokens(self) -> None:
        self.assertTrue(
            accepts([1, 2, 3, 4, 5, 6, 7], spec("fizzbuzz", {"n": 7}), None)
        )
        self.assertTrue(
            accepts(
                ["1", "2", "fizz", "4", "buzz", "fizz", "7"],
                spec("fizzbuzz", {"n": 7}),
                None,
            )
        )

    def test_rejects_wrong_order_length_and_non_integer_prints(self) -> None:
        self.assertFalse(
            accepts([1, 2, 4, 3, 5, 15, 7], spec("fizzbuzz", {"n": 7}), None)
        )
        self.assertFalse(accepts([1, 2, 3], spec("fizzbuzz", {"n": 7}), None))
        self.assertFalse(
            accepts([1, "x", 3, 4, 5, 15, 7], spec("fizzbuzz", {"n": 7}), None)
        )


class KnightTourValidatorTests(unittest.TestCase):
    # knight_tour (2664): LC example board.
    def setUp(self) -> None:
        self.board = [[0, 3, 6, 9], [11, 8, 1, 4], [2, 5, 10, 7]]

    def test_accepts_the_lc_tour(self) -> None:
        self.assertTrue(
            accepts(self.board, spec("knight_tour"), [3, 4, 0, 0])
        )

    def test_rejects_broken_chain_and_wrong_start(self) -> None:
        broken = [row[:] for row in self.board]
        broken[0][0], broken[1][1] = broken[1][1], broken[0][0]
        self.assertFalse(
            accepts(broken, spec("knight_tour"), [3, 4, 0, 0])
        )
        self.assertFalse(
            accepts(self.board, spec("knight_tour"), [3, 4, 1, 0])
        )


class GridLayoutValidatorTests(unittest.TestCase):
    # grid_layout (3311): LC example 1 plus its reflection.
    def test_accepts_the_lc_grid_and_a_reflection(self) -> None:
        case_input = [4, [[0, 1], [0, 2], [1, 3], [2, 3]]]
        self.assertTrue(accepts([[3, 1], [2, 0]], spec("grid_layout"), case_input))
        self.assertTrue(accepts([[0, 2], [1, 3]], spec("grid_layout"), case_input))

    def test_rejects_wrong_adjacency_and_repeated_id(self) -> None:
        case_input = [4, [[0, 1], [0, 2], [1, 3], [2, 3]]]
        self.assertFalse(accepts([[3, 1], [0, 2]], spec("grid_layout"), case_input))
        self.assertFalse(accepts([[3, 1], [2, 3]], spec("grid_layout"), case_input))


class LastMarkedNodesValidatorTests(unittest.TestCase):
    # last_marked_nodes (3313): any farthest node per position.
    STAR = [[0, 1], [0, 2], [0, 3], [0, 4]]

    def test_accepts_the_lc_example_and_alternate_ties(self) -> None:
        edges = [[0, 1], [0, 2]]
        self.assertTrue(accepts([2, 2, 1], spec("last_marked_nodes"), [edges]))
        # nodes[0] may also pick leaf 1 — "choose any one answer".
        self.assertTrue(accepts([1, 2, 1], spec("last_marked_nodes"), [edges]))
        self.assertTrue(accepts([1, 0], spec("last_marked_nodes"), [[[0, 1]]]))

    def test_star_accepts_any_leaf_from_the_hub(self) -> None:
        # The farthest set from the hub is ALL leaves, not just the two
        # diameter endpoints this run happened to find.
        self.assertTrue(
            accepts([3, 2, 4, 1, 2], spec("last_marked_nodes"), [self.STAR])
        )
        self.assertTrue(
            accepts([1, 2, 3, 4, 3], spec("last_marked_nodes"), [self.STAR])
        )

    def test_rejects_near_misses(self) -> None:
        # hub naming itself, a non-farthest pick, wrong length, bad index.
        self.assertFalse(
            accepts([0, 2, 4, 1, 2], spec("last_marked_nodes"), [self.STAR])
        )
        self.assertFalse(
            accepts([3, 3, 1, 0], spec("last_marked_nodes"), [[[0, 1], [1, 2], [2, 3]]])
        )
        self.assertFalse(
            accepts([2, 1], spec("last_marked_nodes"), [[[0, 1], [0, 2]]])
        )
        self.assertFalse(
            accepts([2, 2, 5], spec("last_marked_nodes"), [[[0, 1], [0, 2]]])
        )

    def test_many_distinct_answers_take_the_lca_path(self) -> None:
        # 40-leaf star, each position naming a different leaf (all at
        # distance 2 from each other): 40 distinct answers, so the LCA
        # branch runs. The hub naming itself must still fail there.
        edges = [[0, leaf] for leaf in range(1, 41)]
        answer = [1] + [leaf % 40 + 1 for leaf in range(1, 41)]
        self.assertTrue(accepts(answer, spec("last_marked_nodes"), [edges]))
        broken = list(answer)
        broken[0] = 0
        self.assertFalse(accepts(broken, spec("last_marked_nodes"), [edges]))


class GridPathsValidatorTests(unittest.TestCase):
    # grid_paths (3963): exactly one monotone path.
    def test_accepts_a_one_path_grid(self) -> None:
        self.assertTrue(accepts(["..#", "#.."], spec("grid_paths"), [2, 3]))

    def test_rejects_many_paths_and_wrong_shape(self) -> None:
        self.assertFalse(accepts(["...", "..."], spec("grid_paths"), [2, 3]))
        self.assertFalse(accepts(["..#"], spec("grid_paths"), [2, 3]))


class GridKPathsValidatorTests(unittest.TestCase):
    # grid_k_paths (3988): k paths or an honest empty array.
    def test_accepts_k_2_and_the_lc_k_4_example(self) -> None:
        self.assertTrue(accepts(["...", "#.."], spec("grid_k_paths"), [2, 3, 2]))
        self.assertTrue(accepts(["..#", "...", "#.."], spec("grid_k_paths"), [3, 3, 4]))

    def test_rejects_the_wrong_k(self) -> None:
        self.assertFalse(accepts(["...", "#.."], spec("grid_k_paths"), [2, 3, 3]))

    def test_impossible_claims(self) -> None:
        # 1x4 with k=2 is genuinely impossible — an empty array is honest.
        self.assertTrue(accepts([], spec("grid_k_paths"), [1, 4, 2]))
        # 2x3 admits two paths — an empty claim is a lie.
        self.assertFalse(accepts([], spec("grid_k_paths"), [2, 3, 2]))
        # params.impossible overrides the shape reasoning.
        self.assertTrue(
            accepts([], spec("grid_k_paths", {"impossible": True}), [2, 2, 7])
        )


class GridKPathsFreeValidatorTests(unittest.TestCase):
    # grid_k_paths_free (3990): submission-chosen dimensions.
    def test_accepts_constructions(self) -> None:
        self.assertTrue(accepts(["..#", "#..", "#.."], spec("grid_k_paths_free"), [2]))
        self.assertTrue(accepts(["..#", "...", "#.."], spec("grid_k_paths_free"), [4]))

    def test_rejects_wrong_count_oversized_grids_and_empty_answers(self) -> None:
        self.assertFalse(accepts(["..#", "#..", "#.."], spec("grid_k_paths_free"), [3]))
        self.assertFalse(accepts(["." * 26], spec("grid_k_paths_free"), [1]))
        self.assertFalse(accepts([], spec("grid_k_paths_free"), [5]))


class RearrangePairOrderValidatorTests(unittest.TestCase):
    # rearrange_pair_order (3992).
    def test_accepts_a_valid_rearrangement(self) -> None:
        self.assertTrue(
            accepts("cbaa", spec("rearrange_pair_order"), ["aabc", "a", "c"])
        )

    def test_rejects_x_before_y_and_non_permutations(self) -> None:
        self.assertFalse(
            accepts("acba", spec("rearrange_pair_order"), ["aabc", "a", "c"])
        )
        self.assertFalse(
            accepts("cbb", spec("rearrange_pair_order"), ["aabc", "a", "c"])
        )

    def test_absent_x_is_vacuously_satisfied(self) -> None:
        # y never followed by x: with x absent from the answer there is no
        # ordering left to violate, so any permutation is accepted.
        self.assertTrue(
            accepts("cbaa", spec("rearrange_pair_order"), ["aabc", "z", "c"])
        )


class FlipPermutationValidatorTests(unittest.TestCase):
    # flip_permutation (519): every cell exactly once after reset.
    ACTION_INPUT = {
        "actions": [{}, {"call": "reset"}, {"call": "flip", "repeat": 6}],
        "params": [[2, 3], [], []],
    }

    def test_accepts_a_full_cycle(self) -> None:
        table = {repr([r, c]): 1 for r in range(2) for c in range(3)}
        self.assertTrue(
            accepts(table, spec("flip_permutation"), self.ACTION_INPUT)
        )

    def test_rejects_repeated_out_of_bounds_and_overlong_cycles(self) -> None:
        table = {repr([r, c]): 1 for r in range(2) for c in range(3)}
        double = dict(table)
        double[repr([0, 0])] = 2
        del double[repr([1, 1])]
        self.assertFalse(
            accepts(double, spec("flip_permutation"), self.ACTION_INPUT)
        )
        outside = dict(table)
        del outside[repr([0, 0])]
        outside[repr([5, 5])] = 1
        self.assertFalse(
            accepts(outside, spec("flip_permutation"), self.ACTION_INPUT)
        )
        self.assertFalse(
            accepts(
                {**table, repr([0, 0]): 2},
                spec("flip_permutation"),
                self.ACTION_INPUT,
            )
        )


class DesignListThreadingTests(unittest.TestCase):
    def test_validator_element_threads_and_exact_elements_stay_exact(self) -> None:
        # The validator spec rides inside the outputs list.
        table = {repr([r, c]): 1 for r in range(2) for c in range(3)}
        case_input = {
            "actions": [{}, {"call": "reset"}, {"call": "flip", "repeat": 6}],
            "params": [[2, 3], [], []],
        }
        self.assertTrue(
            accepts([None, table], [None, spec("flip_permutation")], case_input)
        )
        # The same output against a [3, 3] constructor is an incomplete
        # cycle — threading the case input in is what lets the validator
        # judge it, and it must judge it False.
        self.assertFalse(
            accepts(
                [None, table],
                [None, spec("flip_permutation")],
                {"actions": case_input["actions"], "params": [[3, 3], [], []]},
            )
        )


class UnknownValidatorTests(unittest.TestCase):
    def test_unknown_validator_raises(self) -> None:
        # Trusted content, authoring-time error: it must fail loudly.
        with self.assertRaises(ValueError):
            accepts(1, spec("no_such_validator"))


if __name__ == "__main__":
    unittest.main()
