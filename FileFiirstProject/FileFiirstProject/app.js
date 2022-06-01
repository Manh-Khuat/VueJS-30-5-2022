new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
  },
  methods: {
    startNewGame: function () {
      (this.gameIsRunning = true),
        (this.monsterHealth = 100),
        (this.playerHealth = 100);
    },
    attack: function () {
      if (this.checkPlayerOptions()) {
        return;
      }
      // monster
      this.monsterHealth -= this.inputDamage(10, 20);
      // Player
     this.monsterAttacks()
    },
    specialAttack: function () {
        if (this.checkPlayerOptions()) {
            return;
          }
          // monster
          this.monsterHealth -= this.inputDamage(20, 30);
          // Player
          this.monsterAttacks()
    },
    heal: function () {
        if (this.playerHealth > 70) {
            return false
        } else if (this.playerHealth <=  60) {
            this.playerHealth += 10
        } else {
            this.playerHealth = 70
        }
        // this.monsterAttacks()
    },
    giveUp: function () {
        this.gameIsRunning = false
        alert('you lost')
    },
    monsterAttacks: function() {
        this.playerHealth -= this.inputDamage(5, 10);
        this.checkPlayerOptions()
    },
    inputDamage: function (minDamage, maxDamage) {
      return Math.max(Math.floor(Math.random() * maxDamage) + 1, minDamage);
    },
    checkPlayerOptions: function () {
      if (this.monsterHealth <= 0) {
        if (confirm("You won! New game?")) {
          console.log("yes");
          this.startNewGame();
        } else {
          console.log("no");
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost! New game?")) {
          this.startNewGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return;
    },
  },
});
