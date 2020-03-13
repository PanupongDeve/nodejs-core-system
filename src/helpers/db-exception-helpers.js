const dbExceptionErrorHelpers = (errors) => {
    const messagesError = errors.map(error => {
        return error.message
    })
    
    return messagesError;
}


module.exports = {
    dbExceptionErrorHelpers
};