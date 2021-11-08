const GameApp = {
    data() {
      return {
        games: [],
        
        // selectedBook: null, //maybe
        gameForm: {},
        selectedGame: null
      }
    },
    computed: {},
    methods: {
      prettyData(d) {
        return dayjs(d)
        .format('D MMM YYYY')
      },
      prettyTime(d) {
        // dayjs.extend(LocalizedFormat)
        // return dayjs().format('LT')
        return dayjs(d)
        .format('h mm a')
        // var localizedFormat = require('dayjs/plugin/localizedFormat')
        // dayjs.extend(localizedFormat)

        // dayjs().format('L LT')  
      },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        fetchGameData() {
            fetch('/api/games/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.games = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
        postGame(evt) {
            if (this.selectedGame === null) {
                this.postNewGame(evt);
            } else {
                this.postEditGame(evt);
            }
          },
        postNewGame(evt) {
            //this.bookForm.id = this.selectedBook.id; //not sure about this
            console.log("Posted!", this.gameForm); //test to make sure form works  //use cmd+shift+r to make sure
            alert("Post");

            fetch('api/games/create.php', {
                method:'POST',
                body: JSON.stringify(this.gameForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.games = json; //idk
                
                // reset the form
                this.gameForm = {};
              });

            
            },
            postEditGame(evt) {
                // this.offerForm.studentId = this.selectedStudent.id;
                this.gameForm.id = this.selectedGame.id;       
                
                console.log("Updating! hello", this.gameForm);
        
                fetch('api/games/update.php', {
                    method:'POST',
                    body: JSON.stringify(this.gameForm),
                    headers: {
                      "Content-Type": "application/json; charset=utf-8"
                    }
                  })
                  .then( response => response.json() )
                  .then( json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.games = json;
                    
                    this.resetGameForm();
                  });
              },
              postDeleteGame(o) {
                if (!confirm("Are you sure you want to delete the game from "+o.field+"?")) {
                    return;
                }
                
                fetch('api/games/delete.php', {
                    method:'POST',
                    body: JSON.stringify(o),
                    headers: {
                      "Content-Type": "application/json; charset=utf-8"
                    }
                  })
                  .then( response => response.json() )
                  .then( json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.games = json;
                    
                    this.resetGameForm();
                  });
              },
              selectGame(o) {
                this.selectedGame = o;
                this.gameForm = Object.assign({}, this.selectedGame);
              },
              resetGameForm() {
                this.selectedGame = null;
                this.gameForm = {};
              }
        
    },
    created() {
            this.fetchGameData();
        }
  
  }
  
  Vue.createApp(GameApp).mount('#gameApp');