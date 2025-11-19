from typing import List
import psutil
from scapy.all import get_if_list

class NetworkService:
    def all_network_interfaces(self):
        return list(psutil.net_if_addrs().keys())