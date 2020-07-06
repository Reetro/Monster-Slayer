new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function() {
            let enemyDamage = this.damageEnemy(2, 10);

            this.turns.unshift({
                isPlayer: false,
                text: 'Player hits Monster for ' + enemyDamage
            });

            let playerDamage = this.damagePlayer(5, 12);

            this.turns.unshift({
                isPlayer: true,
                text: 'Monster hits Player for ' + playerDamage
            });

        },
        specialAttack: function() {
            let enemyDamage = this.damageEnemy(10, 20);

            this.turns.unshift({
                isPlayer: false,
                text: 'Player hits Monster hard for ' + enemyDamage
            });

            let playerDamage = this.damagePlayer(8, 14);

            this.turns.unshift({
                isPlayer: true,
                text: 'Monster hits Player hard for ' + playerDamage
            });
        },
        heal: function() {
            if (this.playerHealth <= 90)
            {
                this.playerHealth += 10;

                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player heals for 10'
                });
            }
            else
            {
                this.playerHealth = 100;
            }

            let enemyDamage = this.damagePlayer(3, 10);

            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player hard for ' + playerDamage
            });
        },
        giveUp: function() {
            this.gameIsRunning = false;
        },
        calculateRandom: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if (confirm('You won play again?'))
                {
                    this.startGame();
                }
                else
                {
                    this.gameIsRunning = false;
                }
                return true;
            }
            else if (this.playerHealth <= 0)
            {
                if (confirm('You lost play again?'))
                {
                    this.startGame();
                }
                else
                {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
        damageEnemy: function(min, max) {
            let damage = this.monsterHealth -= this.calculateRandom(min, max);

            if (this.checkWin())
            {
                return;
            }
            else
            {
                return damage;
            }
        },
        damagePlayer: function(min, max) {
            let damage = this.playerHealth -= this.calculateRandom(min, max);

            if (this.checkWin())
            {
                return;
            }
            else
            {
                return damage;
            }
        }
    }
});