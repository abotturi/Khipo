import * as bcrypt from 'bcrypt';

export const encryptPass = async (pass: string) => {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(pass, salt);
}

export const comparePass = async (pass: string, passHash: string) => {
    return await bcrypt.compare(pass, passHash);
}