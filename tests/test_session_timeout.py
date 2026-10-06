import tempfile
import time
import unittest
from pathlib import Path
from unittest import mock

from api.app import database


class SessionTimeoutTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        path = Path(self.temporary.name) / "test.sqlite3"
        self.patcher = mock.patch.object(database, "DATABASE_PATH", path)
        self.patcher.start()
        self.addCleanup(self.patcher.stop)
        database.initialize_database()

    def _last_seen(self, session_id: str) -> float:
        with database.connect() as connection:
            row = connection.execute(
                "SELECT last_seen_at FROM sessions WHERE id = ?", (session_id,)
            ).fetchone()
        return row["last_seen_at"] if row else -1.0

    def _backdate(self, session_id: str, seconds: float) -> None:
        with database.connect() as connection:
            connection.execute(
                "UPDATE sessions SET last_seen_at = ? WHERE id = ?",
                (time.time() - seconds, session_id),
            )

    def test_expired_session_is_purged_regardless_of_touch(self):
        session_id = database.create_session()
        self._backdate(session_id, database.SESSION_IDLE_SECONDS + 10)
        self.assertIsNone(database.validate_session(session_id, touch=False))
        self.assertEqual(-1.0, self._last_seen(session_id))  # gone, not just stale

    def test_touch_false_does_not_extend_the_idle_clock(self):
        session_id = database.create_session()
        self._backdate(session_id, 120)  # older than the 60s touch threshold
        self.assertEqual(session_id, database.validate_session(session_id, touch=False))
        self.assertAlmostEqual(120, time.time() - self._last_seen(session_id), delta=5)

    def test_touch_true_extends_after_the_threshold(self):
        session_id = database.create_session()
        self._backdate(session_id, 120)
        self.assertEqual(session_id, database.validate_session(session_id, touch=True))
        self.assertLess(time.time() - self._last_seen(session_id), 5)


if __name__ == "__main__":
    unittest.main()
