import { verify,sign } from 'jsonwebtoken'

//Should we use the whole object to create the token of just the id 
export const signAccessToken = (payload:object) => {
    return sign(payload,process.env.JWT_ACCESS_KEY!,{
       expiresIn:"20m" 
    })
}

export const verifyAccessToken = (token:string) => {
    return verify(token,process.env.JWT_ACCESS_KEY!);
}

export const signRefreshToken = (payload:object) => {
    return sign(payload,process.env.JWT_REFRESH_KEY!,{
        expiresIn:"2d"
    });
}

export const verifyRefreshToken = (token:string) => {
    return verify(token,process.env.JWT_REFRESH_KEY!);
}