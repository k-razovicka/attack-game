<template>
  <div class="container">
    <section class="players d-flex">
      <div class="player">
        <h4 class="player-name">YOU</h4>
        <div class="health-bar">
          <p class="health">{{playerHealth}}</p>
          <div class="health-remaining" :style="{width: playerHealth + '%'}"></div>
          <div class="health-empty"></div>
        </div>
      </div>

      <div class="player">
        <h4 class="player-name">MONSTER</h4>
        <div class="health-bar">
          <p class="health">{{monsterHealth}}</p>
          <div class="health-remaining" :style="{width: monsterHealth + '%'}"></div>
          <div class="health-empty"></div>
        </div>
      </div>
    </section>

    <section class="action">
      <div>
        <b-button
          v-if="!gameIsRunning"
          @click="gameIsRunning = !gameIsRunning"
          variant="success"
          class="button"
        >START NEW GAME</b-button>
        <b-card v-if="gameIsRunning">
          <b-button @click="playerAttack" variant="danger" class="button">ATTACK</b-button>
          <b-button @click="specialAttackPlayer" class="button button-special">SPECIAL ATTACK</b-button>
          <b-button @click="heal" variant="success" class="button">HEAL</b-button>
          <b-button @click="giveUp" class="button button-give-up">GIVE UP</b-button>
        </b-card>
      </div>
    </section>

    <section class="game-log">
      <div>
        <b-card>
          <ul class="game-results">
            <li
              style="text-align: center; width: 100%; padding: 2px; margin: 2px;"
              v-for="turn in turns"
              :key="turn.player"
              :class="turn.player"
            >{{ turn.player }} {{ turn.msg }} {{ turn.dmg }}HP</li>
          </ul>
        </b-card>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Game",

  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      turns: [],
      gameIsRunning: false
    };
  },
  methods: {
    playerAttack() {
      var damage = Math.floor(Math.random() * 10) + 1;
      this.monsterHealth -= damage;
      this.turns.push({
        player: "PLAYER",
        msg: "HITS MONSTER FOR",
        dmg: damage
      });
      this.monsterAttack();
    },
    monsterAttack() {
      var damage = Math.floor(Math.random() * 10) + 1;
      this.playerHealth -= damage;
      this.turns.push({
        player: "MONSTER",
        msg: "HITS PLAYER FOR",
        dmg: damage
      });
      this.checkStatus();
    },
    heal() {
      var damage = 10;
      this.playerHealth += damage;
      this.turns.push({
        player: "PLAYER",
        msg: "HEALS FOR",
        dmg: damage
      });
      this.monsterAttack();
    },
    specialAttackPlayer() {
      var damage = Math.floor(Math.random() * 20) + 1;
      this.monsterHealth -= damage;
      this.turns.push({
        player: "PLAYER",
        msg: "SPECIAL HITS MONSTER FOR",
        dmg: damage
      });
      this.monsterAttack();
    },
    checkStatus() {
      if (this.playerHealth < 0) {
        this.gameIsRunning = false;
        alert("MONSTER WON!");
        this.restartGame();
      } else if (this.monsterHealth < 0) {
        this.gameIsRunning = false;
        alert("PLAYER WON!");
        this.restartGame();
      } // else {
      //   this.gameIsRunning = false;
      //   alert("DRAWN!")
      //   this.restartGame();
      // }
    },
    restartGame() {
      this.turns = [];
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    giveUp() {
      this.gameIsRunning = false;
      alert("YOU GAVE UP!");
      this.restartGame();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
 <style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}

.button {
  margin: 10px;
  color: black;
}
.player {
  margin: 0 auto;
  width: 50%;
  padding: 10px;
}
.button-special {
  background-color: darkorange;
  border-color: darkorange;
}

.button-special:hover {
  background-color: orangered;
}

.button-give-up {
  background-color: white;
}

.health-bar {
  background-color: lightgray;
  position: relative;
  z-index: -1;
}

.health-remaining {
  background-color: green;
  height: 24px;
  position: absolute;
  top: 0px;
  z-index: -1;
}

.game-log,
.action {
  margin-top: 20px;
}

li.PLAYER {
  background-color: darkorange;
}
li.MONSTER {
  background-color: olive;
}
</style>
