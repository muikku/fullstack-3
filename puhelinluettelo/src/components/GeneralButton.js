import React from 'react';

const GeneralButton = (ButtonLabel, onClickMethod) => 

    <button onClick={onClickMethod}>
    {ButtonLabel}
    </button>


export default GeneralButton