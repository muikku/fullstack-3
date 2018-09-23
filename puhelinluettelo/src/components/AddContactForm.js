import React from 'react';

const AddContactForm = (_onSubmit, _newName, _handleNameSubmit, _newNumber, _handleNumberSubmit) => 
<div>
<form onSubmit={_onSubmit}>
<h2>Lisää uusi</h2>
<div>
  nimi:  
  <input 
  value={_newName}
  onChange={_handleNameSubmit}
  />
</div>
<div>
  numero:
  <input
  value={_newNumber}
  onChange={_handleNumberSubmit}
  />
</div>
<div>
  <button type="submit">lisää</button>
</div>
</form>
</div>


export default AddContactForm;