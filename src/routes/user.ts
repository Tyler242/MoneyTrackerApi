import express from 'express';

import { postLogin } from '../controllers/user';

export const router = express.Router();

router.post('/', postLogin);