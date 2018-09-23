import React from 'react';
import showContacts from './components/showContacts';
import FilterForm from './components/FilterForm';
import AddContactForm from './components/AddContactForm';
import Contacts from './services/contacts';
import Notification from './components/Notification';
import CreateId from './components/IdCreator';
import './index.css'; 

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newSearch: '',
      newName: '',
      newNumber: '',
      notifications: []
    }
  }

  componentDidMount() {
    Contacts
      .getAll()
      .then(response => {
        this.setState({
          persons: response.data})
      })
  }

  addNotification = (message, id) => {
    const notification = Notification({message, id})
    this.setState({
      notifications: this.state.notifications.concat(notification)
    })
     setTimeout(() => {
      const notifications = this.state.notifications.filter(e => e.id !== notification.id)
      const silencedNotification = {...notification, show:false}

      this.setState({
        notifications: notifications.concat(silencedNotification)
      })
    }, 10000) 
  }
  

  searchContact = (event) => {
    event.preventDefault()
    this.setState({
      newSearch: event.target.value
    })
  }

  addContact = (event) => {
    event.preventDefault()

    const BooleanIsNewContact = !this.state.persons
    .map(e => e.name.toLowerCase()).includes(this.state.newName.toLowerCase())

    const ContactExists = this.state.persons
    .find(person => person.name.toLowerCase() === this.state.newName.toLowerCase())

    if(BooleanIsNewContact){
      this.CreateNewContact()
    } else if (ContactExists){
      this.UpdateContact(ContactExists)
    } else {
      this.emptyFields()
    }
  }



  CreateNewContact = () => {
  const person = {
    name: this.state.newName,
    number: this.state.newNumber,
    id: CreateId(this.state.persons.map(e => e.id))
  }
  return(
  Contacts
  .create(person)
  .then(response => {
    this.setState({
      persons: this.state.persons.concat(response.data),
      newName: '',
      newNumber: ''
    })
    this.addNotification(
    <div>New contact name: "{person.name}" number: "{person.number}" was created.</div>, person.id)
  })
  .catch(error => {
    this.componentDidMount()
    this.emptyFields()
  })
  )
  }

  UpdateContact = (existingContact) => {
    const updatedContact = {...existingContact, number: this.state.newNumber}
    return (
      Contacts
      .update(updatedContact.id, updatedContact)
      .then(response => {
        this.setState({
          newName: '',
          newNumber: ''
      })
      this.componentDidMount()
      this.addNotification(
        <div>{updatedContact.name}'s number was changed to "{updatedContact.number}".</div>, updatedContact.id)
    })
    .catch(error => {
      this.addNotification(
        'Contact " not found.', CreateId(this.state.notifications.map(e => e.id)))
      this.CreateNewContact()
      this.componentDidMount()
    })
    )
  }

  deleteContact = (sourceId) => () => {
  const storedForNotification = this.state.persons.find(e => e.id === sourceId)
    return(
    Contacts
    .destroy(sourceId)
    .then(response => {
      this.componentDidMount()
      this.addNotification(
        <div>Contact with name: "{storedForNotification.name}" was deleted.</div>, storedForNotification.id)
    })
    .catch(error => {
      this.componentDidMount()
    })
  )}

  emptyFields = () => 
  this.setState({
    newName: '',
    newNumber: ''
  })

  handleSearch = (event) => {
    this.setState({newSearch: event.target.value})
  }

  handleNameSubmit = (event) => {
    this.setState({newName: event.target.value})
  }

  handleNumberSubmit = (event) => {
    this.setState({newNumber: event.target.value})
  }

  showNotifications = () => 
    this.state.notifications.filter(e => e.show).map(e => e.content)

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2> 
        <this.showNotifications/>
        {FilterForm(this.state.newSearch, this.handleSearch)}
        {AddContactForm(this.addContact, this.state.newName, this.handleNameSubmit, this.state.newNumber, this.handleNumberSubmit)}
        <h2>Numerot</h2>
        {showContacts(this.state.newSearch, this.state.persons, this.deleteContact)}
      </div>
    )
  }
}

export default App

