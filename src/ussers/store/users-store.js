import { loadUsersByPage } from '../use-cases/load-users-By-Page'  ;


const state = {
    currentPage: 0,
    users: [],
}

const loadNextPage = async() => {
    const users = await loadUsersByPage( state.currentPage + 1 );
    if ( users.length === 0 ) return; 
        
    state.currentPage += 1; 
    state.users = users;
}

const loadPreviusPage = async() => {
    throw new Error('no implementado');
}

const onUserChanged = () => {
    throw new Error('no implementado');
}

const reloadPage = async() => {
    throw new Error('no implementado');
}

export default {
    loadNextPage,
    loadPreviusPage,
    onUserChanged,
    reloadPage,

    /**
     * 
     * @returns {User[]}
     */
    getUsers: () => [...state.users],

    /**
     * 
     * @returns {Number}
     */
    getCurrentPage: () => state.currentPage,
}