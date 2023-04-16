import bcrypt from 'bcrypt';

export const Encrypt = {
  cryptPassword: async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  },
  
  comparePassword: async (password: string, hashPassword: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(password, hashPassword);
    } catch (error) {
      console.error(error);
      return false;
    }
  }
};
