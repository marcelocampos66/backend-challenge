import 'dotenv/config';
import joi from 'joi';
import md5 from 'md5';

class Helpers {

  public hashPassword(password: string) {
    return md5(password);
  }

  public verifyUserInfosJoi = (infos: IUser) => (
    joi.object({
      msisdn: joi.string().length(14).required(),
      name: joi.string().min(4).required(),
      password: joi.string().min(6).required(),
    }).validate(infos)
  );

  public getNewAcessLevel(actualAcess: Access, action: Action) {
    const levels: ILevels = {
      free: {
        upgrade: 'pro',
        downgrade: 'free',
      },
      pro: {
        upgrade: 'premium',
        downgrade: 'free',
      },
      premium: {
        upgrade: 'premium',
        downgrade: 'pro',
      }
    };
    return levels[actualAcess][action];
  }

}

export default Helpers;
