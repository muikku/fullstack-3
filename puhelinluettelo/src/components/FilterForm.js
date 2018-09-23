import React from 'react';

const FilterForm = (app_value, app_onChange) => 
<div>
    <form>
        <p>
            rajaa näytettäviä:
            <input 
                value={app_value}
                onChange={app_onChange}
            />
        </p>
    </form>
</div>

export default FilterForm;