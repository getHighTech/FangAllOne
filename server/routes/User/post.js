import Joi from 'joi';
import User from '../../models/User';
import JWT from 'jsonwebtoken';
import config from '../../config';

export default [
    {
        method: 'POST',
        path: '/user',
        handler: async (request, h) => {
           
        },
        options: {
            description: '创建一个用户',
            notes: 'condition参数包含创建的字段, username, password, 这个方法特殊的地方在于，会返回一个token',
            tags: ['api'], // ADD THIS TAG
            validate: {
                query: {
                    condition: Joi.required()
                },  
            }
            
        },
    },
    {
        method: 'POST',
        path: '/auth',
        handler: async (request, h) => {
                 const { username, password} = request.payload;
                 try {
                    const user =  await User.auth(
                        username, password
                    );
                    if(!user){
                        return h.response(false).code(203)
                    }
                    const token = JWT.sign({
                        id: user.id,
                        password: password,
                    }, config.privateKey, {
                        expiresIn: 604800 // 1 week
                      });
                    return h.response({
                        id: user.id,
                        username,
                        token
                    }).code(200);
                 } catch (error) {
                    console.log(error);
                
                    return error.errors;
                 }
                
        },
        options: {
            auth: false,
            description: '登录、认证用户',
            notes: 'condition参数包含创建的字段, username, password, 这个方法特殊的地方在于，会返回一个token',
            tags: ['api'], // ADD THIS TAG
            validate: {
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required()
                },  
            }
            
        },
    },
    {
        method: 'POST',
        path: '/register',
        
        handler: async (request, h) => {
            console.log(request.payload);
            const { username, password} = request.payload;
            console.log(username, password);
            
            try {
                const user =  await User.register(
                    username,
                    password
                );
                const token = JWT.sign({
                    id: user.id,
                    password: password,
                }, config.privateKey, {
                    expiresIn: 604800 // 1 week
                  });
                return h.response({
                    id: user.id,
                    username,
                    token
                }).code(200);
                
            } catch (error) {
                console.log(error);
                
                return error.errors;
            }
           
        },
        options: {
            auth: false,
            description: '注册用户',
            notes: '注册一个用户，会返回一个token',
            tags: ['api'], // ADD THIS TAG
            validate: {
                payload: {
                    username: Joi.string().required(),
                    password: Joi.string().required()
                },  
            }
            
        },
    },
    {
        method: 'POST',
        path: '/users',
        handler: (request, h) => {
            return 'Hello, world!';
        }
    },
]