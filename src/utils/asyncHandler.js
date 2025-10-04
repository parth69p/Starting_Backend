const asyncHandler= (requestHandler)=>{
   return (req,res,next)=>{ // return is necessary for making it higher order function.
        Promise.resolve(requestHandler(req,res,next))
        .catch((err) => next(err))
    }
}

export { asyncHandler };

// const ayncHandler = ()=>{}
// const ayncHandler = (func)=>{()=>{}}
// const ayncHandler = (func)=>{ async ()=>{}}

// const ayncHandler = (fn) => async (req, res, next) => 
// {
//   try {
//     await fn(req, res, next);
//   } catch (error) {
//     res.status(error.code || 500).json({
//       successs: false,
//       message: error.message,
//     });
//   }
// };
