
const CreateId = (array) => {
    if(array.length === 0) {return 0}
    return(Math.max(...array)) + 1}

export default CreateId;