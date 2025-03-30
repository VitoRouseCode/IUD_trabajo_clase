const { Router } = require('express');
const Media = require('../models/Media'); // Cambiamos a Media
const { validationResult, check } = require('express-validator');

const router = Router();

// GET: Listar todos los medios
router.get('/', async (req, res) => {
  try {
    const medias = await Media.find().populate('genre').populate('director').populate('producer').populate('type'); 
    res.json(medias);                  
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error al obtener los medios' });
  }
});

// GET: Listar un medio por ID
router.get('/:id', async (req, res) => {
    try {
        const media = await Media.findById(req.params.id).populate('genre').populate('director').populate('producer').populate('type'); 
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }
        res.send(media);                  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hubo un error al obtener el medio' });
    }
});

// POST: Crear un nuevo medio
router.post('/', [
    check('serial', 'the serial can not be empty').not().isEmpty(),
    check('title', 'the title can not be empty').not().isEmpty(),
    check('synopsis', 'the synopsis can not be empty').not().isEmpty(),
    check('url', 'the url can not be empty').not().isEmpty(),
    check('releaseYear', 'the release year can not be empty').not().isEmpty(),
    check('releaseYear', 'the release year must be a number').isNumeric(),
    check('genre', 'the genre ID can not be empty').not().isEmpty(),
    check('director', 'the director ID can not be empty').not().isEmpty(),
    check('producer', 'the producer ID can not be empty').not().isEmpty(),
    check('type', 'the type ID can not be empty').not().isEmpty()
], async (req, res) => {
    console.log(req.body);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        let media = new Media(); 
        media.serial = req.body.serial;
        media.title = req.body.title;
        media.synopsis = req.body.synopsis;
        media.url = req.body.url;
        media.image = req.body.image; // Opcional
        media.releaseYear = req.body.releaseYear;
        media.genre = req.body.genre; // ID de Genre
        media.director = req.body.director; // ID de Director
        media.producer = req.body.producer; // ID de Producer
        media.type = req.body.type; // ID de Type

        await media.save();                
        res.json({ message: 'Medio creado correctamente', status: 'success', media: media });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hubo un error al crear el medio' });
    }
});

// PUT: Actualizar un medio
router.put('/:id', async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: `Media ${media.title} not found` });
        }
        media.serial = req.body.serial;
        media.title = req.body.title;
        media.synopsis = req.body.synopsis;
        media.url = req.body.url;
        media.image = req.body.image; // Opcional
        media.releaseYear = req.body.releaseYear;
        media.genre = req.body.genre; // ID de Genre
        media.director = req.body.director; // ID de Director
        media.producer = req.body.producer; // ID de Producer
        media.type = req.body.type; // ID de Type
        await media.save();
        res.json({ message: 'Media updated successfully', status: 'success', media: media });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error updating the media', error: error });
    }
});

// DELETE: Eliminar un medio
router.delete('/:id', async (req, res) => {
    try {
        const media = await Media.findById(req.params.id);
        if (!media) {
            return res.status(404).json({ message: 'Media not found' });
        }
        await media.deleteOne();
        res.json({ message: `Media ${media.title} deleted successfully` }); // Usamos title en lugar de name
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'There was an error deleting the media', error: error.errors });
    }
});

module.exports = router;