import {Router} from "express";
import {getUsers, getUser, createUser, editUser, disableUser} from '../controller/users';

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUser);
router.post('/', createUser);
router.put('/:id', editUser);
router.delete('/:id', disableUser);


export default router;