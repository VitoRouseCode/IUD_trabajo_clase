const { Router } = require('express');
const Director = require('../models/Director'); 
const { validationResult, check } = require('express-validator');

const router = Router();

// GET: Listar todos los directores
router.get('/', async (req, res) => {
  try {
    const directors = await Director.find(); 
    res.json(directors);                  
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error al obtener los directores' });
  }
});

// GET: Listar un director por ID
router.get('/:id', async (req, res) => {
    try {
        const director = await Director.findById(req.params.id); 
        if (!director) {
            return res.status(404).json({ message: 'Director not found' });
        }
        res.send(director);                  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hubo un error al obtener el director' });
    }
});

// POST: Crear un nuevo director
router.post('/', [
    check('names', 'the names can not be empty').not().isEmpty(), // Validación para names
    check('status', 'invalid status').isIn(['Activo', 'Inactivo']) // Validación para status
], async (req, res) => {
   
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        let director = new Director(); 
        director.names = req.body.names; // Cambiamos name por names
        director.status = req.body.status;

        await director.save();                
        res.status(201).json({ message: 'Director creado correctamente', status: 'success', director: director });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hubo un error al crear el director' });
    }
});

// PUT: Actualizar un director
router.put('/:id', async (req, res) => {
    try {
        const director = await Director.findById(req.params.id);
        if (!director) {
            return res.status(404).json({ message: `Director ${director.names} not found` });
        }
        director.names = req.body.names; // Cambiamos name por names
        director.status = req.body.status;
        await director.save();
        res.json({ message: 'Director updated successfully', status: 'success', director: director });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error updating the director', error: error });
    }
});

// DELETE: Eliminar un director
router.delete('/:id', async (req, res) => {
    try {
        const director = await Director.findById(req.params.id);
        if (!director) {
            return res.status(404).json({ message: 'Director not found' });
        }
        await director.deleteOne();
        res.json({ message: `Director ${director.names} deleted successfully` }); // Cambiamos genre.name por director.names
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error deleting the director', error: error.errors });
    }
});

module.exports = router;