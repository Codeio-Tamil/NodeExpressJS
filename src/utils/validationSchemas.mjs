export const createUserValidationSchema = {
    user_name:{
        notEmpty: {
            errorMessage: "User Name must not be empty"
        },
        isLength: {
            options: { min:3, max:12},
            errorMessage: "user name length must be b/w 3 and 12 chars"
        },
        isString: {
            errorMessage: "User Name must be a string"
        }
    },
    password: {
        notEmpty: {
            errorMessage: "Password must not be empty"
        }
    }
}