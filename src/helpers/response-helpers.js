

const responseSender = (data, status) => (res) => {
    res.status(status).send({
        status,
        data
    })
}

module.exports = {
    responseSender
}