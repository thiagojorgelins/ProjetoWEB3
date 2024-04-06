const { body } = require('express-validator')
function handlerError(method){
    switch(method){
        case 'user': {
            return [ 
                body('email')
                .exists().isEmail().withMessage('Email inválido')
                ,body('senha').exists()
                .isLength({ min: 8}).withMessage('Senha deve ter no mínimo 8 caracteres')
                .matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/).withMessage
                ('Senha deve conter ao menos uma letra maiúscula, uma minúscula, um caractere especial e um número')             
               ]
        }
    }
}

module.exports = handlerError