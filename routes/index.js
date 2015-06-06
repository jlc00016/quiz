var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' });
});

router.get('/author', function(reg, res) {
  res.render('author',
      { authors: [{ name: 'Jesús Lara (jlc00016)',
                    urlPhoto: '/images/miFoto.jpg',
                    urlVideo: 'http://techslides.com/demos/sample-videos/small.mp4'
                  }]
      }
  );
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer',   quizController.answer);


module.exports = router;
