"""Typed-wire encodings for the v2 structure kinds: every kind gets an
exact byte assertion (the same wire the per-language wrappers decode) plus
the type_spec validation rules (see docs/CODECS.md)."""
import struct
import unittest

from runner.executors.base import ExecutorError
from runner.executors.typed import encode_case, type_spec

I32 = {"kind": "integer", "bits": 32}


def invocation(kind, **extra):
    spec = {"kind": kind, "items": I32, **extra}
    return {
        "type": "function",
        "method": "solve",
        "parameters": [{"name": "value", "value_type": spec}],
        "return_type": {"kind": "boolean"},
    }


class NaryAndNextTreeEncodingTests(unittest.TestCase):
    def test_display_arrays_use_binary_tree_slots(self) -> None:
        for kind in ("nary_tree", "next_tree"):
            with self.subTest(kind=kind):
                expected = (
                    struct.pack(">I", 3)
                    + b"\x01" + struct.pack(">i", 1)
                    + b"\x00"
                    + b"\x01" + struct.pack(">i", 2)
                )
                self.assertEqual(expected, encode_case(invocation(kind), [[1, None, 2]], "cpp"))

    def test_empty_display_encodes_as_zero_slots(self) -> None:
        for kind in ("nary_tree", "next_tree"):
            with self.subTest(kind=kind):
                self.assertEqual(struct.pack(">I", 0), encode_case(invocation(kind), [[]], "go"))


class QuadTreeEncodingTests(unittest.TestCase):
    def test_preorder_walks_the_pairs_with_four_slots_per_inner_node(self) -> None:
        invocation_spec = invocation("quad_tree")
        # [0,1] / leaf 0 / leaf 1 / leaf 0 / leaf 1 — one inner node.
        expected = (
            b"\x01\x00\x01"
            + b"\x01\x01\x00"
            + b"\x01\x01\x01"
            + b"\x01\x01\x00"
            + b"\x01\x01\x01"
        )
        self.assertEqual(
            expected,
            encode_case(invocation_spec, [[[0, 1], [1, 0], [1, 1], [1, 0], [1, 1]]], "cpp"),
        )
        self.assertEqual(b"\x00", encode_case(invocation_spec, [None], "cpp"))

    def test_pairs_must_be_two_booleans_and_cover_exactly(self) -> None:
        with self.assertRaisesRegex(ExecutorError, r"\[isLeaf, val\] pair"):
            encode_case(invocation("quad_tree"), [[[0, 1, 2]]], "cpp")
        # A leaf with children left in the display is a trailing-entries error.
        with self.assertRaisesRegex(ExecutorError, "trailing"):
            encode_case(invocation("quad_tree"), [[[1, 1], [1, 0]]], "cpp")


class NestedEncodingTests(unittest.TestCase):
    def test_integer_holds_and_list_holds(self) -> None:
        # [1, [2, 3]] → list hold of {int 1, list hold of {2, 3}}.
        expected = (
            b"\x02" + struct.pack(">I", 2)
            + b"\x01" + struct.pack(">i", 1)
            + b"\x02" + struct.pack(">I", 2)
            + b"\x01" + struct.pack(">i", 2)
            + b"\x01" + struct.pack(">i", 3)
        )
        self.assertEqual(expected, encode_case(invocation("nested"), [[1, [2, 3]]], "typescript"))
        self.assertEqual(
            b"\x01" + struct.pack(">i", 7),
            encode_case(invocation("nested"), [7], "typescript"),
        )

    def test_other_scalars_are_rejected(self) -> None:
        with self.assertRaisesRegex(ExecutorError, "integer or a nested array"):
            encode_case(invocation("nested"), ["1"], "typescript")


class RingEncodingTests(unittest.TestCase):
    def test_circular_and_doubly_circular_are_value_arrays_or_null(self) -> None:
        for kind in ("circular_list", "doubly_circular"):
            with self.subTest(kind=kind):
                expected = struct.pack(">I", 2) + struct.pack(">ii", 1, 2)
                self.assertEqual(expected, encode_case(invocation(kind), [[1, 2]], "cpp"))
                self.assertEqual(struct.pack(">I", 0), encode_case(invocation(kind), [None], "cpp"))

    def test_alias_list_carries_the_splice_index(self) -> None:
        alias_invocation = {
            "type": "function",
            "method": "solve",
            "parameters": [
                {"name": "a", "value_type": {"kind": "linked_list", "items": I32}},
                {"name": "b", "value_type": {"kind": "alias_list", "items": I32, "alias": 0}},
            ],
            "return_type": {"kind": "boolean"},
        }
        expected = (
            b"\x00"  # the aliased listA parameter, null
            + struct.pack(">I", 2) + struct.pack(">ii", 5, 6)
            + struct.pack(">I", 2)
        )
        self.assertEqual(
            expected,
            encode_case(alias_invocation, [None, {"values": [5, 6], "splice_at": 2}], "cpp"),
        )
        with self.assertRaisesRegex(ExecutorError, "values and splice_at"):
            encode_case(alias_invocation, [None, [5, 6]], "cpp")
        with self.assertRaisesRegex(ExecutorError, "non-negative integer"):
            encode_case(
                alias_invocation,
                [None, {"values": [5], "splice_at": -1}],
                "cpp",
            )


class MultiListEncodingTests(unittest.TestCase):
    def test_chain_object_encodes_each_slot_with_a_child_flag(self) -> None:
        chain = {
            "values": [1, 2],
            "children": [None, {"values": [3], "children": [None]}],
        }
        expected = (
            struct.pack(">I", 2)
            + struct.pack(">i", 1) + b"\x00"
            + struct.pack(">i", 2) + b"\x01"
            + struct.pack(">I", 1)
            + struct.pack(">i", 3) + b"\x00"
        )
        self.assertEqual(expected, encode_case(invocation("multi_list"), [chain], "cpp"))

    def test_children_must_match_values_slot_for_slot(self) -> None:
        with self.assertRaisesRegex(ExecutorError, "slot for slot"):
            encode_case(
                invocation("multi_list"),
                [{"values": [1, 2], "children": [None]}],
                "cpp",
            )


class GraphAndRandomListEncodingTests(unittest.TestCase):
    def test_graph_rows_encode_neighbor_indices_zero_based(self) -> None:
        expected = (
            struct.pack(">I", 2)
            + struct.pack(">I", 1) + struct.pack(">i", 1)
            + struct.pack(">I", 1) + struct.pack(">i", 0)
        )
        self.assertEqual(expected, encode_case(invocation("graph"), [[[2], [1]]], "cpp"))
        with self.assertRaisesRegex(ExecutorError, "node index"):
            encode_case(invocation("graph"), [[[3], [1]]], "cpp")

    def test_random_list_rows_encode_null_as_the_none_marker(self) -> None:
        expected = (
            struct.pack(">I", 2)
            + struct.pack(">i", 7) + struct.pack(">I", 0xFFFFFFFF)
            + struct.pack(">i", 13) + struct.pack(">I", 0)
        )
        self.assertEqual(
            expected,
            encode_case(invocation("random_list"), [[[7, None], [13, 0]]], "cpp"),
        )
        with self.assertRaisesRegex(ExecutorError, "within the list"):
            encode_case(invocation("random_list"), [[[7, 5]]], "cpp")


class StructEncodingTests(unittest.TestCase):
    STRUCT = {
        "kind": "struct",
        "class": "Employee",
        "fields": [
            {"name": "id", "value_type": I32},
            {"name": "importance", "value_type": I32},
        ],
    }

    def test_provided_node_class_interpolates_from_value_type(self) -> None:
        # Graph/random-list nodes are the using problem's provided/ class;
        # value_type.class names it, legacy manifests fall back to Node.
        from runner.executors.typed import provided_node_class

        named = invocation("graph")
        named["parameters"][0]["value_type"]["class"] = "GraphNode"
        named["return_type"] = {"kind": "graph", "items": I32, "class": "GraphNode"}
        self.assertEqual("GraphNode", provided_node_class(named, "graph"))
        self.assertEqual("Node", provided_node_class(named, "random_list"))
        self.assertEqual("Node", provided_node_class(invocation("graph"), "graph"))
        with self.assertRaisesRegex(ExecutorError, "'class' must be an identifier"):
            type_spec({"kind": "graph", "items": I32, "class": "9bad"}, "Parameter 1")

    def test_graph_renders_the_provided_class_name(self) -> None:
        from runner.executors.typed import cpp_type, go_type, rust_type, typescript_type

        spec = {"kind": "graph", "items": I32, "class": "GraphNode"}
        self.assertEqual("GraphNode*", cpp_type(spec))
        self.assertEqual("*GraphNode", go_type(spec))
        self.assertEqual("GraphNode | null", typescript_type(spec))
        # Wrapper preludes keep fully-qualified paths — no `use` lines.
        self.assertEqual(
            "Option<std::rc::Rc<std::cell::RefCell<GraphNode>>>", rust_type(spec)
        )
        legacy = {"kind": "graph", "items": I32}
        self.assertEqual("Node*", cpp_type(legacy))

    def test_records_encode_field_values_in_declaration_order(self) -> None:
        invocation_spec = {
            "type": "function",
            "method": "solve",
            "parameters": [{"name": "employees", "value_type": {
                "kind": "array", "items": self.STRUCT,
            }}],
            "return_type": {"kind": "integer", "bits": 32},
        }
        expected = (
            struct.pack(">I", 1)
            + struct.pack(">ii", 1, 5)
        )
        self.assertEqual(expected, encode_case(invocation_spec, [[[1, 5]]], "go"))

    def test_struct_specs_need_a_class_and_non_empty_fields(self) -> None:
        with self.assertRaisesRegex(ExecutorError, "'class' identifier"):
            type_spec({"kind": "struct", "fields": []}, "Parameter 1")
        with self.assertRaisesRegex(ExecutorError, "non-empty 'fields'"):
            type_spec({"kind": "struct", "class": "Employee", "fields": []}, "Parameter 1")

    def test_alias_list_must_reference_an_earlier_linked_list(self) -> None:
        from runner.executors.typed import function_signature

        base = {
            "type": "function",
            "method": "solve",
            "parameters": [
                {"name": "a", "value_type": {"kind": "linked_list", "items": I32}},
                {"name": "b", "value_type": {"kind": "alias_list", "items": I32, "alias": 0}},
            ],
            "return_type": {"kind": "boolean"},
        }
        parameters, _, _ = function_signature(base, "cpp")
        self.assertEqual(["linked_list", "alias_list"], [item["kind"] for item in parameters])
        with self.assertRaisesRegex(ExecutorError, "earlier parameter"):
            function_signature({**base, "parameters": base["parameters"][::-1]}, "cpp")
        with self.assertRaisesRegex(ExecutorError, "linked_list parameter"):
            function_signature({
                **base,
                "parameters": [
                    {"name": "a", "value_type": I32},
                    {"name": "b", "value_type": {"kind": "alias_list", "items": I32, "alias": 0}},
                ],
            }, "cpp")


class SecondWaveEncodingTests(unittest.TestCase):
    def test_doubly_list_shares_the_linked_list_wire(self) -> None:
        expected = b"\x01" + struct.pack(">I", 2) + struct.pack(">i", 1) + struct.pack(">i", 2)
        self.assertEqual(expected, encode_case(invocation("doubly_list"), [[1, 2]], "cpp"))
        self.assertEqual(b"\x00", encode_case(invocation("doubly_list"), [None], "cpp"))

    def test_doubly_list_node_appends_the_target_value(self) -> None:
        invocation_spec = {
            "type": "function",
            "method": "solve",
            "parameters": [{"name": "value", "value_type": {"kind": "doubly_list_node", "items": I32}}],
            "return_type": {"kind": "boolean"},
        }
        expected = (
            b"\x01" + struct.pack(">I", 2) + struct.pack(">i", 7) + struct.pack(">i", 3)
            + struct.pack(">i", 3)
        )
        self.assertEqual(expected, encode_case(invocation_spec, [{"values": [7, 3], "node": 3}], "cpp"))
        with self.assertRaisesRegex(ExecutorError, "values and node"):
            encode_case(invocation_spec, [{"values": [1]}], "cpp")

    def test_random_tree_rows_carry_val_plus_random_index(self) -> None:
        expected = (
            struct.pack(">I", 2)
            + b"\x01" + struct.pack(">i", 7) + struct.pack(">I", 0xFFFFFFFF)
            + b"\x01" + struct.pack(">i", 13) + struct.pack(">I", 0)
        )
        self.assertEqual(expected, encode_case(invocation("random_tree"), [[[7, None], [13, 0]]], "cpp"))
        self.assertEqual(struct.pack(">I", 0), encode_case(invocation("random_tree"), [[]], "cpp"))
        with self.assertRaisesRegex(ExecutorError, "random index must be null or within"):
            encode_case(invocation("random_tree"), [[[7, 5]]], "cpp")

    def test_special_tree_and_nary_tree_nodes_ride_the_plain_display_wires(self) -> None:
        display = [1, None, 3, 2]
        expected = (
            struct.pack(">I", 4)
            + b"\x01" + struct.pack(">i", 1)
            + b"\x00"
            + b"\x01" + struct.pack(">i", 3)
            + b"\x01" + struct.pack(">i", 2)
        )
        self.assertEqual(expected, encode_case(invocation("special_tree"), [display], "rust"))
        self.assertEqual(expected, encode_case(invocation("nary_tree_nodes"), [display], "go"))

    def test_nary_tree_ref_is_just_the_value(self) -> None:
        invocation_spec = {
            "type": "function",
            "method": "solve",
            "parameters": [
                {"name": "tree", "value_type": {"kind": "nary_tree", "items": I32, "alias": 0}},
                {"name": "value", "value_type": {"kind": "nary_tree_ref", "items": I32, "alias": 0}},
            ],
            "return_type": {"kind": "boolean"},
        }
        expected = (
            struct.pack(">I", 2) + b"\x01" + struct.pack(">i", 1) + b"\x00"
            + struct.pack(">i", 3)
        )
        self.assertEqual(expected, encode_case(invocation_spec, [[1, None], 3], "rust"))

    def test_json_frames_compact_json_behind_a_length(self) -> None:
        payload = b'[1,[2,{"a":null}]]'
        expected = struct.pack(">I", len(payload)) + payload
        self.assertEqual(expected, encode_case(invocation("json"), [[1, [2, {"a": None}]]], "javascript"))

    def test_json_accepts_a_top_level_object(self) -> None:
        payload = b'{"a":1,"b":[2,null]}'
        expected = struct.pack(">I", len(payload)) + payload
        self.assertEqual(expected, encode_case(invocation("json"), [{"a": 1, "b": [2, None]}], "javascript"))

    def test_nary_tree_ref_alias_must_reference_an_earlier_nary_parameter(self) -> None:
        from runner.executors.typed import function_signature

        base = {
            "type": "function",
            "method": "solve",
            "parameters": [
                {"name": "a", "value_type": {"kind": "nary_tree", "items": I32, "alias": 0}},
                {"name": "b", "value_type": {"kind": "nary_tree_ref", "items": I32, "alias": 0}},
            ],
            "return_type": {"kind": "boolean"},
        }
        parameters, _, _ = function_signature(base, "rust")
        self.assertEqual(["nary_tree", "nary_tree_ref"], [item["kind"] for item in parameters])
        with self.assertRaisesRegex(ExecutorError, "earlier parameter"):
            function_signature({**base, "parameters": base["parameters"][::-1]}, "rust")
        with self.assertRaisesRegex(ExecutorError, "nary_tree parameter"):
            function_signature({
                **base,
                "parameters": [
                    {"name": "a", "value_type": I32},
                    {"name": "b", "value_type": {"kind": "nary_tree_ref", "items": I32, "alias": 0}},
                ],
            }, "rust")


class TopLevelAliasKindTests(unittest.TestCase):
    """alias_list/nary_tree_ref name an earlier parameter, so only the
    top-level parameter position can decode them; nested under an array or
    struct field the readers fall into the plain-integer path and fail late
    on the wire (see type_spec's _nested guard)."""

    def test_nested_alias_kinds_are_rejected_at_prepare_time(self) -> None:
        for kind in ("alias_list", "nary_tree_ref"):
            with self.subTest(kind=kind):
                nested = {"kind": kind, "items": I32, "alias": 0}
                with self.assertRaisesRegex(ExecutorError, "top-level parameter kinds"):
                    type_spec({"kind": "array", "items": nested}, "Parameter 1")
                struct_field = {
                    "kind": "struct",
                    "class": "Holder",
                    "fields": [{"name": "tail", "value_type": nested}],
                }
                with self.assertRaisesRegex(ExecutorError, "top-level parameter kinds"):
                    type_spec(struct_field, "Parameter 1")

    def test_top_level_alias_list_return_still_validates(self) -> None:
        spec = type_spec({"kind": "alias_list", "items": I32, "alias": 0}, "Return value")
        self.assertEqual("alias_list", spec["kind"])


if __name__ == "__main__":
    unittest.main()
