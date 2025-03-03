const { Router } = require('express');
const Producer = require('../models/Producer'); // Cambiamos a Producer
const { validationResult, check } = require('express-validator');

const router = Router();

// GET: Listar todas las productoras
router.get('/', async (req, res) => {
  try {
    const producers = await Producer.find(); 
    res.json(producers);                  
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error al obtener las productoras' });
  }
});

// GET: Listar una productora por ID
router.get('/:id', async (req, res) => {
    try {
        const producer = await Producer.findById(req.params.id); 
        if (!producer) {
            return res.status(404).json({ message: 'Producer not found' });
        }
        res.send(producer);                  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hubo un error al obtener la productora' });
    }
});

// POST: Crear una nueva productora
router.post('/', [
    check('name', 'the name can not be empty').not().isEmpty(), // Validación para name
    check('status', 'invalid status').isIn(['Activo', 'Inactivo']), // Validación para status
    check('description', 'description must be 100 characters max').isLength({ max: 100 }), // Igual que Genre
    check('slogan', 'slogan must be 100 characters max').isLength({ max: 100 }) // Validación para slogan
], async (req, res) => {
    
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        let producer = new Producer(); 
        producer.name = req.body.name; // Mantenemos name como en Genre
        producer.status = req.body.status;
        producer.slogan = req.body.slogan; // Nuevo campo
        producer.description = req.body.description; // Nuevo campo

        await producer.save();                
        res.json({ message: 'Productora creada correctamente', status: 'success', producer: producer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hubo un error al crear la productora' });
    }
});

// PUT: Actualizar una productora
router.put('/:id', async (req, res) => {
    try {
        const producer = await Producer.findById(req.params.id);
        if (!producer) {
            return res.status(404).json({ message: `Producer ${producer.name} not found` });
        }
        producer.name = req.body.name;
        producer.status = req.body.status;
        producer.slogan = req.body.slogan; // Nuevo campo
        producer.description = req.body.description; // Nuevo campo
        await producer.save();
        res.json({ message: 'Producer updated successfully', status: 'success', producer: producer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error updating the producer', error: error });
    }
});

// DELETE: Eliminar una productora
router.delete('/:id', async (req, res) => {
    try {
        const producer = await Producer.findById(req.params.id);
        if (!producer) {
            return res.status(404).json({ message: 'Producer not found' });
        }
        await producer.deleteOne();
        res.json({ message: `Producer ${producer.name} deleted successfully` }); // Usamos name como en Genre
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error deleting the producer', error: error.errors });
    }
});

module.exports = router;