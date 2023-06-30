
/**
 * @param {String|Number} id
 */
export const deleteUserById = async( id ) => {

    const url = `http://localhost:3001/users/${ id }` 
    const res = await fetch(url, {
        method: 'DELETE',
    });

    const deleteResult = await res.json();
    console.log({deleteResult});

    return true;

};