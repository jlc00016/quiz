var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller')
var sessionController = require('../controllers/session_controller');

// Página de entrada (home page)
router.get('/', function (req, res) {
    res.render('index', {title: 'Quiz', errors: []});
});

// Pagina o seccion autor
router.get('/author', function (reg, res) {
    res.render('author',
        {
            authors: [{
                name: 'Jesús Lara (jlc00016)',
                urlPhoto: '/images/miFoto.jpg',
                urlVideo: 'http://techslides.com/demos/sample-videos/small.mp4'
            }],
            errors: []
        }
    );
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load);  // autoload :quizId

// Definición de rutas de sesion
router.get('/login',  sessionController.new);     // formulario login
router.post('/login', sessionController.create);  // crear sesión
router.get('/logout', sessionController.destroy); // destruir sesión (no deberia hacerse por get sino por delete)

// Definición de rutas de /quizes
router.get('/quizes',                      quizController.index);
router.get('/quizes/:quizId(\\d+)',        quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                  quizController.new);
router.post('/quizes/create',              quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   quizController.edit);
router.put('/quizes/:quizId(\\d+)',        quizController.update);
router.delete('/quizes/:quizId(\\d+)',     quizController.destroy);

// Definición de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create);

module.exports = router;