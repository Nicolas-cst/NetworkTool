export interface Packet {
    id: number;
    timestamp: string;
    src_ip: string;
    dest_ip: string;
    protocol: string;
    length: number;
}