/// <reference types="node" />
export declare class BcryptAdapter {
    static hashSync(data: string | Buffer, saltOrRounds: string | number): string;
    static compareSync(data: string | Buffer, encrypted: string): boolean;
}
