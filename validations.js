import { body }from 'express-validator';

export const loginValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password','Пароль должен содержать минимум 5 символов').isLength({min:5 }),
    
];

export const registerValidation = [
    body('email', 'Неверный формат почты').isEmail(),
    body('password','Пароль должен содержать минимум 5 символов').isLength({min:5 }),
    body('fullName','Укажите имя').isLength({min:3}),
    body('avatarUrl','Неверная ссылка на аватарку').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Введите заголовок').isLength({ min: 3 }).isString(),
    body('text','Введите текст').isLength({ min: 3 }).isString(),
    body('tags','Неверный формат тегов').optional().isString(),
    body('imageUrl','Неверная ссылка на изображение').optional().isString(),
];
