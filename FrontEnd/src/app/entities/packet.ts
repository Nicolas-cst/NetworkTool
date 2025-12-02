export class Packet {
    id: number;
    timestamp: string;
    src_ip: string;
    dest_ip: string;
    protocol: string;
    length: number;

    constructor() {
        this.id = 0;
        this.timestamp = "";
        this.src_ip = "";
        this.dest_ip = "";
        this.protocol = "";
        this.length = 0;
    }
}