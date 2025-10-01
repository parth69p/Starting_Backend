class  ApiError extends Error{
    constructor(
        statushCode,
        message= "Somthing went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statushCode= statushCode,
        this.data = null,
        this.message = message,
        this.success = false,
        this.errors = errors


        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }
}

export {ApiError}