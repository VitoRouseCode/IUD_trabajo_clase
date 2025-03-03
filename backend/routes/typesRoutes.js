const { Router } = require('express');
const Type = require('../models/Type'); // Cambiamos a Type
const { validationResult, check } = require('express-validator');

const router = Router();

// GET: Listar todos los tipos
router.get('/', async (req, res) => {
  try {
    const types = await Type.find(); 
    res.json(types);                  
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error al obtener los tipos' });
  }
});

// GET: Listar un tipo por ID
router.get('/:id', async (req, res) => {
    try {
        const type = await Type.findById(req.params.id); 
        if (!type) {
            return res.status(404).json({ message: 'Type not found' });
        }
        res.send(type);                  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hubo un error al obtener el tipo' });
    }
});

// POST: Crear un nuevo tipo
router.post('/', [
    check('name', 'the name can not be empty').not().isEmpty(), // Validación para name
    check('description', 'description must be 100 characters max').isLength({ max: 100 }) // Validación para description
], async (req, res) => {
    console.log(req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        let type = new Type(); 
        type.name = req.body.name;
        type.description = req.body.description; // Opcional

        await type.save();                
        res.json({ message: 'Tipo creado correctamente', status: 'success', type: type });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hubo un error al crear el tipo' });
    }
});

// PUT: Actualizar un tipo
router.put('/:id', async (req, res) => {
    try {
        const type = await Type.findById(req.params.id);
        if (!type) {
            return res.status(404).json({ message: `Type ${type.name} not found` });
        }
        type.name = req.body.name;
        type.description = req.body.description; // Opcional
        await type.save();
        res.json({ message: 'Type updated successfully', status: 'success', type: type });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error updating the type', error: error });
    }
});

// DELETE: Eliminar un tipo
router.delete('/:id', async (req, res) => {
    try {
        const type = await Type.findById(req.params.id);
        if (!type) {
            return res.status(404).json({ message: 'Type not found' });
        }
        await type.deleteOne();
        res.json({ message: `Type ${type.name} deleted successfully` }); // Usamos name como en Genre
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error deleting the type', error: error.errors });
    }
});

module.exports = router;