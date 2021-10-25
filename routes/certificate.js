const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const http = require('http');
const generateCertificate = require('../generateCertificate');

router.get('/generate', async (req, res) => {
    const { orgName, courseName, studentName, professor, director } = req.body;

    if (!orgName || !courseName || !studentName || !professor || !director) {
        res.status(400).send({ msg: 'either orgName or courseName or studentName or professor or director missing' });
    }


    await generateCertificate(orgName, courseName, studentName, professor, director)
        .then(() => {
            let options = {
                method: 'GET',
                host: 'localhost',
                port: process.env.PORT || 8080,
                path: '/file'
            };

            let request = http.request(options, function (response) {
                var data = '';

                response.on('data', function (chunk) {
                    data += chunk;
                });

                response.on('end', function () {
                    console.log('requested content length: ', response.headers['content-length']);
                    console.log('parsed content length: ', data.length);
                    res.setHeader('Content-Length', data.length);
                    res.setHeader('Content-Type', 'application/pdf');
                    //res.setHeader('Content-Disposition', 'inline; filename=output.pdf');
                    res.end(data);
                });
            });

            request.end();
        }).catch(err => {
            res.status(500).send(err);
        });
});

router.get('/file', function (req, res) {
    res.download(__dirname + '../output.pdf', 'output.pdf');
});

module.exports = router;