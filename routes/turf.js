var express = require('express');
var router = express.Router();

var turf = require('@turf/turf');

// @link http://turfjs.org/docs/
router.get('/shortestPath', function (req, res, next) {
  return res.json(turf.shortestPath([-5, -6], [9, -6], {
    obstacles: turf.polygon([[[0, -7], [5, -7], [5, -3], [0, -3], [0, -7]]])
  }));
});
router.post('/shortestPath', function (req, res, next) {
  return res.json(turf.shortestPath(JSON.parse(req.body.start), JSON.parse(req.body.end), {
    obstacles: turf.polygon([[[0, -7], [5, -7], [5, -3], [0, -3], [0, -7]]])
  }));
});

router.get('/kinks', function (req, res, next) {
  var poly = turf.polygon([[
    [-12.034835, 8.901183],
    [-12.060413, 8.899826],
    [-12.03638, 8.873199],
    [-12.059383, 8.871418],
    [-12.034835, 8.901183]
  ]]);
  var kinks = turf.kinks(poly);
  return res.json(kinks);
});

router.get('/lineArc', function (req, res, next) {
  var center = turf.point([-75, 40]);
  var radius = 5;
  var bearing1 = 25;
  var bearing2 = 47;
  var arc = turf.lineArc(center, radius, bearing1, bearing2);
  return res.json(arc);
});

router.get('/lineChunk', function (req, res, next) {
  var line = turf.lineString([[-95, 40], [-93, 45], [-85, 50]]);
  var chunk = turf.lineChunk(line, 15, { units: 'miles' });
  return res.json(chunk);
});

router.get('/lineIntersect', function (req, res, next) {
  var line1 = turf.lineString([[126, -11], [129, -21]]);
  var line2 = turf.lineString([[123, -18], [131, -14]]);
  var intersects = turf.lineIntersect(line1, line2);
  return res.json(intersects);
});

router.get('/lineOverlap', function (req, res, next) {
  var line1 = turf.lineString([[115, -35], [125, -30], [135, -30], [145, -35]]);
  var line2 = turf.lineString([[115, -25], [125, -30], [135, -30], [145, -25]]);
  var overlapping = turf.lineOverlap(line1, line2);
  return res.json(overlapping);
});


module.exports = router;