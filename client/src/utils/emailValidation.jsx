export const emailValidation = ({email}) => {
    const err = {}
    if(!email) {
        err.email = "Please add your email."
    } else if(!validateEmail(email)) {
        err.email = "Email format is incorrect."
    }
    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}

export default emailValidation


function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}