module.exports = function gameCalculator(sub, letter){
  var scores = [];
  var keys = [];

  for (var p in sub[0].subs) { //Load Keys
    if (sub[0].subs.hasOwnProperty(p)) {
      keys.push(p);
    }
  }
  keys.forEach(function (key, key_index) { //iterando por cada key
    sub.forEach(function (play, p_index) { //sacando score de cada player
      var duplicate = false;
      var valid = false;

      for (var i = 0; i < sub.length; i++) {  //Iteración por todos mis hermanos jugadores
        if (p_index !== i && play.subs[key]) { // Submission?
          if (play.subs[key][0].toLowerCase() == letter[0].toLowerCase()){ //Same letter?
            valid = true;
            if (play.subs[key].toLowerCase() === sub[i].subs[key].toLowerCase()) { // Duplicates?
              duplicate = true;
            }
          }
        }
      }

      if(!play.subs[key] || !valid){
        setScore(p_index, 0);
      }
      else if (duplicate && valid) {
        setScore(p_index, 5);
      }
      else if(valid) {
        setScore(p_index, 10);
      }
    });
  });

  function setScore(player, score) {
    if (!scores[player]) {
      sub[player].score = score;
      scores[player] = score;
    }
    else {
      sub[player].score += score;
    }
  }
  return sub;
};
