const { Router } = require('express'); 
const Genre = require('../models/Genre');
const { validationResult, check } = require('express-validator');

const router = Router();

// GET: Listar todos los géneros
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find(); 
    res.json(genres);                  
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Hubo un error al obtener los géneros'});
  }
  
});

// GET: Listar un género por ID
router.get('/:id', async (req, res) => {
    try {
        const genre = await Genre.findById(req.params.id); 
        if(!genre){
            return res.status(404).json({message: `Genre not found`});
        }
        res.send(genre);                  
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hubo un error al obtener el género' });
    }
    
  });

// POST: Crear un nuevo género
router.post('/',[
    check('name', 'the name can not be empty').not().isEmpty(),
    check('status', 'invalid status').isIn(['Activo', 'Inactivo']),
    check('description','description must be 100 characters max').isLength({ max: 100 })
    ], async (req, res) => {
      
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        let genre = new Genre(); 
        genre.name = req.body.name;
        genre.status = req.body.status;
        genre.description = req.body.description;

        await genre.save();                
        res.json({ message: 'Género creado correctamente',status: 'success', genre: genre });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Hubo un error al crear el género' });
    }
    });

// PUT: Actualizar un género
router.put('/:id', async (req,res)=>{
    try{
        const genre = await Genre.findById(req.params.id);
        if(!genre){
            return res.status(404).json({message: `Genre ${genre.name} not found`});
        }
        genre.name = req.body.name;
        genre.status = req.body.status;
        genre.description = req.body.description;
        await genre.save();
        res.json({message: 'Genre updated successfully', status: 'success', genre: genre});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'There was an error updating the genre', error: error});
    }
    
})

// DELETE: Eliminar un género
router.delete('/:id',async (req, res)=>{
    try{
        const genre = await Genre.findById(req.params.id);
        if(!genre){
            return res.status(404).json({message: 'Genre not found'});
        }
        await genre.deleteOne(); //remove()
        res.json({message: `Genre ${genre.name} deleted successfully`});
    }catch(error){
        console.log(error);
        res.status(500).json({message: 'There was an error deleting the genre', error: error.errors});
    }
})


  

module.exports = router;