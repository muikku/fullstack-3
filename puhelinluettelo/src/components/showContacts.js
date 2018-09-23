import React from 'react';
import GeneralButton from './GeneralButton'

const showContacts = (newSearch, contacts, handleDelete) => {

    const notSearching = (newSearch) === ''

    const PrintContact = (contact) => 
    <div key={contact.id}>{contact.name} {contact.number} {GeneralButton('poista', handleDelete(contact.id))}</div>

    const returnThis =  
    notSearching ? contacts.map(e => PrintContact(e)) 
    : contacts.filter(e => e.name.toLowerCase().includes(newSearch.toLowerCase())).map(e => PrintContact(e))

    return (

        returnThis

    )
}

export default showContacts;