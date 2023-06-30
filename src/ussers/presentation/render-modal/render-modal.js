import modalHtml from './render-modal.html?raw';
import './render-modal.css';
import { User } from '../../models/user';
import { getUserById } from '../../use-cases/get-user-by-id';

let modal, form;
let loadedUser = {};

/**
 * 
 * @param {String|Number} id 
 */
export const showModal = async( id ) => {
    modal?.classList.remove('hide-modal');
    loadedUser = {};

    if (!id) return;
    const user = await getUserById( id );
    setFormValues(user)
}

export const hideModal = () => {
    modal?.classList.add('hide-modal');
    form?.reset();
}


/**
 * 
 * @param {User} user 
 */
const setFormValues = ( user ) => {

    form.querySelector('[name="firstName"]').value = user.firstName;
    form.querySelector('[name="lastName"]').value = user.lastName;
    form.querySelector('[name="balance"]').value = user.balance;
    form.querySelector('[name="isActive"]').checked = user.isActive;
    loadedUser = user;
}

/**
 * 
 * @param {HTMLDivElement} element 
 * @param {(userLike)=> Promise<void>} Callback
 */
export const renderModal = ( element, Callback ) => {

    if ( modal ) return;

    modal = document.createElement('div');
    modal.innerHTML = modalHtml;
    modal.className = 'modal-container hide-modal';
    form = modal.querySelector('form')

    modal.addEventListener('click', (event) => {
        if (event.target.className === 'modal-container' ){
            hideModal();
        }
    });

    form.addEventListener('submit', async(event) => {
        event.preventDefault();
        const formData = new FormData( form );
        const isActive = document.querySelector('#is-active').checked;
        const userLike = { ...loadedUser };

        for (const [key, value] of formData) {
            if (key === 'balance') {
                userLike[key] = +value;
                continue;
            }

            if (key === 'isActive') {
                userLike[key] = [value === 'on'] ? true:false ;    
                continue;
            }
            
            if (!isActive) {
                userLike['isActive'] = false;
                continue;
            }
            
            //userLike[key] = value;
        }

        await Callback( userLike );
        hideModal();
    })

    element.append( modal );

}
