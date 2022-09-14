export const registerValidation = ({username, fullname, email, password, cf_password}) => {
    const err = {}

    if(!username) {
        err.username = "Please add your user name."
    } else if(username.toLowerCase().replace(/ /g, '').length > 25) {
        err.username = "User name is up to 10 characters long."
    }

    if(!fullname) {
        err.fullname = "Please add your full name."
    } else if(fullname.length > 25) {
        err.fullname = "Full name is up to 25 characters long."
    }

    if(!email) {
        err.email = "Please add your email."
    } else if(!validateEmail(email)) {
        err.email = "Email format is incorrect."
    }  
    
    if(!password) {
        err.password = "Please add your password."
    } else if(password.length < 6) {
        err.password = "Password must at least 6 characters."
    }
    
    if(password !== cf_password) {
        err.cf_password = "Confirm password did not match"
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}

export const postValidation = ({title, description, jobType, skillRequired, salary, deadlines, maxApplicants, maxPositions}) => {
    const err = {}

    if(!title) {
        err.title = "Please add your post title."
    }
    if(!description) {
        err.description = "Please add your post description"
    }
    if(!jobType) {
        err.jobType = "Please choose type of job"
    }
    if(!skillRequired) {
        err.skillRequired = "Please add skill require"
    }
    if(!salary) {
        err.salary = "Please add salary"
    }
    if(!deadlines) {
        err.deadlines = "Please add deadlines "
    } else if (deadlines <= Date.now()) {
        err.deadlines = "Please change your deadline date due to that time is passed "
    }
    if(!maxApplicants) {
        err.maxApplicants = "Please add max applicants for your post "
    }
    if(!maxPositions) {
        err.maxPositions = "Please add max positions for your post "
    }

    return {
        errMsg: err,
        errLength: Object.keys(err).length
    }
}




function validateEmail(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}