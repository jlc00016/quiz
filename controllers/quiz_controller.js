var models = require('../models/models.js');

// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function (req, res, next, quizId) {
    models.Quiz.find(quizId).then(
        function (quiz) {
            if (quiz) {
                req.quiz = quiz;
                next();
            } else {
                next(new Error('No existe quizId=' + quizId));
            }
        }).catch(function (error) { next(error); });
};

// GET /quizes
exports.index = function (req, res) {
    if(req.query.search != null) {
        // Expresion regular que sustituye los espacios en blanco por %
        var search = req.query.search.replace(/\s+/g,"%");
        models.Quiz.findAll({ where: ["pregunta LIKE ?", '%' + search + '%' ], order: "pregunta"}).then(function (quizes) {
            res.render('quizes/index.ejs', { quizes: quizes });
        })
    } else {
        models.Quiz.findAll().then(function (quizes) {
            res.render('quizes/index.ejs', { quizes: quizes });
        })
    }
};

// GET /quizes/:id
exports.show = function (req, res) {
    res.render('quizes/show', { quiz: req.quiz });
};

// GET /quizes/:id/answer
exports.answer = function (req, res) {
    var resultado = (req.query.respuesta === req.quiz.respuesta) ? 'Correcto' : 'Incorrecto';

    res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};