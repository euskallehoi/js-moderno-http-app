import { localhostUserToModel } from '../mappers/localhost-user.mapper';
import { User } from '../models/user';



/**
 * 
 * @param {String|Number} id
 * @returns { Promise<User> }
 */
export const getUserById = async( id ) => {

    // const url = `${ import.meta.env.VITE_BASE_URL }/users?_page=${ page }`;
    const url = `http://localhost:3001/users/${ id }` 
    const res = await fetch(url);
    const data = await res.json();

    console.log(import.meta.env);

    const user = localhostUserToModel(data) 
    console.log({user});

    return user;
};
