import { userModelToLocalhost } from '../mappers/user-to-localhost.mapper';
import { User } from '../models/user';
import { localhostUserToModel } from '../mappers/localhost-user.mapper';

/**
 * 
 * @param {Like<User>} userLike 
 */
export const saveUser = async( userLike ) => {
    
    const user = new User(userLike)
    
    if ( !user.firstName || !user.lastName ) {
        throw 'First & last name are required';
    }

    const userToSave = userModelToLocalhost( user )
    let userUpdated;

    if (user.id) {
        userUpdated = await updatedUser( userToSave )
    } else {
        userUpdated = await createUser( userToSave )
    }

    return localhostUserToModel( userUpdated );

}

/**
 * @param {Like<User>}
 */
const createUser = async( user ) => {

    const url = `http://localhost:3001/users` 
    const res = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const newUser = await res.json();
    console.log({newUser});
    return newUser;

};

/**
 * @param {Like<User>}
 */
const updatedUser = async( user ) => {

    const url = `http://localhost:3001/users/${ user.id }` 
    const res = await fetch(url, {
        method: 'PATCH',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const updatedUser = await res.json();
    console.log({updatedUser});
    return updatedUser;

};