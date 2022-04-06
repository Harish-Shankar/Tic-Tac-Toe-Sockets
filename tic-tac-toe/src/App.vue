<template>
  <div class="container">
    <h1>Tic-Tac-Toe</h1>
    <div class="interactive-area">
      <div id="block_0" class="block" @click="draw(0, false)">
        {{ content[0] }}
      </div>
      <div id="block_1" class="block" @click="draw(1, false)">
        {{ content[1] }}
      </div>
      <div id="block_2" class="block" @click="draw(2, false)">
        {{ content[2] }}
      </div>
      <div id="block_3" class="block" @click="draw(3, false)">
        {{ content[3] }}
      </div>
      <div id="block_4" class="block" @click="draw(4, false)">
        {{ content[4] }}
      </div>
      <div id="block_5" class="block" @click="draw(5, false)">
        {{ content[5] }}
      </div>
      <div id="block_6" class="block" @click="draw(6, false)">
        {{ content[6] }}
      </div>
      <div id="block_7" class="block" @click="draw(7, false)">
        {{ content[7] }}
      </div>
      <div id="block_8" class="block" @click="draw(8, false)">
        {{ content[8] }}
      </div>
    </div>

    <h2 id="winner" v-if="isOver">The winner is {{ winner }}</h2>
    <h2 v-if="isTie">The game is a tie</h2>
    <button @click="resetBoard()" v-if="isOver || isTie">RESET</button>
  </div>
</template>

<script>
import io from "socket.io-client";
const socket = io("http://localhost:8080");

export default {
  name: "App",
  components: {},
  data() {
    return {
      content: ["", "", "", "", "", "", "", "", ""],
      turn: true,
      isOver: false,
      isTie: false,
      winner: null,
    };
  },
  methods: {
    draw(index, drawFromOther) {
      if (this.turn) {
        this.content[index] = "X";
      } else {
        this.content[index] = "O";
      }
      if (!drawFromOther) socket.emit("play", index);
      document.querySelector(`#block_${index}`).classList.add("block");
      document.querySelector(`#block_${index}`).classList.add("occupied");
      this.turn = !this.turn;
      this.winnerCheck();
      this.tieCheck();
    },

    winnerCheck() {
      const POSSIBLE = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];

      for (let i = 0; i < POSSIBLE.length; i++) {
        let firstIndex = POSSIBLE[i][0];
        let secondIndex = POSSIBLE[i][1];
        let thirdIndex = POSSIBLE[i][2];

        if (
          this.content[firstIndex] === this.content[secondIndex] &&
          this.content[firstIndex] === this.content[thirdIndex] &&
          this.content[firstIndex] != ""
        ) {
          this.isOver = true;
          this.winner = this.content[firstIndex];
        }
      }
    },

    tieCheck() {
      for (let i = 0; i <= this.content.length; i++) {
        if (this.content[i] == "") return;
      }
      this.isTie = true;
    },

    resetBoard() {
      for (let i = 0; i <= 8; i++) {
        this.content[i] = "";
        this.isOver = false;
        this.winner = null;
      }
    },
  },

  created() {
    socket.on("play", (index) => {
      console.log("Received", index);
      this.draw(index, true);
    });
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
}
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #181818;
}
h1 {
  font-size: 5rem;
  margin-bottom: 0.5em;
  color: #ebebeba3;
}
h2 {
  margin-top: 1em;
  font-size: 2rem;
  margin-bottom: 0.5em;
  text-align: center;
  color: #ebebeba3;
}
.interactive-area {
  display: grid;
  width: 300px;
  height: 300px;
  grid-template-columns: auto auto auto;
}
.block {
  display: flex;
  width: 100px;
  height: 100px;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
  border: 3px solid #ebebeba3;
  transition: background 0.2s ease-in-out;
  color: #ebebeba3;
}
.block:hover {
  cursor: pointer;
  background: #8dff83;
  color: #181818;
}
.occupied:hover {
  background: #ff8383;
}
.win {
  background: #8dff83;
}
.win:hover {
  background: #8dff83;
}
#block_0,
#block_1,
#block_2 {
  border-top: none;
}
#block_0,
#block_3,
#block_6 {
  border-left: none;
}
#block_6,
#block_7,
#block_8 {
  border-bottom: none;
}
#block_2,
#block_5,
#block_8 {
  border-right: none;
}
button {
  outline: none;
  border: 4px solid #83d2ff;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  background: none;
  transition: all 0.2s ease-in-out;
  color: #ebebeba3;
}
button:hover {
  cursor: pointer;
  background: #83d2ff;
  color: white;
}
.playerWin {
  color: green;
}
.computerWin {
  color: red;
}
.draw {
  color: orangered;
}

@media only screen and (max-width: 600px) {
  h1 {
    font-size: 3rem;
    margin-bottom: 0.5em;
    color: #ebebeba3;
  }
  h2 {
    margin-top: 1em;
    font-size: 1.3rem;
    color: #ebebeba3;
  }
}
</style>
