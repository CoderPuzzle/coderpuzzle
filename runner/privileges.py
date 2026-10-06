import ctypes
import os


PR_SET_NO_NEW_PRIVS = 38
LINUX_CAPABILITY_VERSION_3 = 0x20080522


class CapabilityHeader(ctypes.Structure):
    _fields_ = [("version", ctypes.c_uint32), ("pid", ctypes.c_int)]


class CapabilityData(ctypes.Structure):
    _fields_ = [
        ("effective", ctypes.c_uint32),
        ("permitted", ctypes.c_uint32),
        ("inheritable", ctypes.c_uint32),
    ]


def drop_privileges(uid: int, gid: int) -> None:
    """Irreversibly drop the child identity and lock out exec-time privilege."""
    os.setgroups([])
    os.setgid(gid)
    os.setuid(uid)
    libc = ctypes.CDLL(None, use_errno=True)
    header = CapabilityHeader(LINUX_CAPABILITY_VERSION_3, 0)
    empty_capabilities = (CapabilityData * 2)()
    if libc.capset(ctypes.byref(header), ctypes.byref(empty_capabilities)) != 0:
        error_number = ctypes.get_errno()
        raise OSError(error_number, os.strerror(error_number))
    if libc.prctl(PR_SET_NO_NEW_PRIVS, 1, 0, 0, 0) != 0:
        error_number = ctypes.get_errno()
        raise OSError(error_number, os.strerror(error_number))
