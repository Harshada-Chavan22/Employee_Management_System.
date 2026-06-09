import express from 'express'
import { Employees } from '../models/Employees.js'


const router = express.Router();


router.post('/', async(req, res) => {
    try {
        console.log("BODY RECEIVED:", req.body);

        const employee = new Employees(req.body);

        await employee.save();

        console.log("SAVED:", employee);

        res.status(201).json(employee);
    } catch (error) {
        console.log("ERROR:", error);
        res.status(500).send(error.message);
    }
});


export { router as createEmployee };