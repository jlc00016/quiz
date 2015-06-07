var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// Página de entrada (home page)
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

// Pagina o seccion autor
router.get('/author', function (reg, res) {
    res.render('author',
        {
            authors: [{
                name: 'Jesús Lara (jlc00016)',
                urlPhoto: '/images/miFoto.jpg',
                urlVideo: 'http://techslides.com/demos/sample-videos/small.mp4'
            }]
        }
    );
});

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);


module.exports = router;