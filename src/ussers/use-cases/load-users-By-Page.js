import { localhostUserToModel } from '../mappers/localhost-user.mapper';
import { User } from '../models/user';



/**
 * 
 * @param {Number} page 
 * @returns { Promise<User[]> }
 */
export const loadUsersByPage = async( page = 1 ) => {

    // const url = `${ import.meta.env.VITE_BASE_URL }/users?_page=${ page }`;
    const url = `http://localhost:3001/users?_page=${ page }` 
    const res = await fetch(url);
    const data = await res.json();

    console.log(import.meta.env);

    const users = data.map( localhostUserToModel );

    return users;
};