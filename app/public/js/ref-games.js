const reffGameApp = {
    data() {
      return {
        gameAssign: [],
        gameAForm: {},
        selectedGameA: null,
        reff: [],
        games: [],
        gameForm: {},
        selectedGame: null,
        reffs: [],
        reffForm: {},
        offerForm: {},
        selectedReff: null
      }
    },
    computed: {},
    methods: {
      prettyData(d) {
        return dayjs(d)
        .format('D MMM YYYY')
      },
      prettyDollar(n) {
        const d = new Intl.NumberFormat("en-US").format(n);
        return "$ " + d;
      },
      fetchGameData() {
        fetch('/api/games/index.php')
          .then( response => response.json() )
          .then( (responseJson) => {
            console.log(responseJson);
            this.games = responseJson;
          })
            .catch( (err) => {
              console.error(err);
            })
        
      },
        fetchGameAData() {
          fetch('/api/gameAssign/index.php')
          .then( response => response.json() )
          .then( (responseJson) => {
            console.log(responseJson);
            this.gameAssign = responseJson;
          })
          .catch( (err) => {
            console.error(err);
          })
      
      },
        postGameA(evt) {
            if (this.selectedGameA === null) {
                this.postNewGameA(evt);
            } else {
                this.postEditGameA(evt);
            }
          },
        postNewGameA(evt) {
            //this.bookForm.id = this.selectedBook.id; //not sure about this
            console.log("Posted!", this.gameAForm); //test to make sure form works  //use cmd+shift+r to make sure
            alert("Post");

            fetch('api/gameAssign/create.php', {
                method:'POST',
                body: JSON.stringify(this.gameAForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.gameAssign = json; //idk
                
                // reset the form
                this.gameAForm = {};
              });

            
            },
            postEditGameA(evt) {
                // this.offerForm.studentId = this.selectedStudent.id;
                this.gameAForm.id = this.selectedGameA.id;       
                
                console.log("Updating! hello", this.gameAForm);
        
                fetch('api/gameAssign/update.php', {
                    method:'POST',
                    body: JSON.stringify(this.gameAForm),
                    headers: {
                      "Content-Type": "application/json; charset=utf-8"
                    }
                  })
                  .then( response => response.json() )
                  .then( json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.gameAssign = json;
                    
                    this.resetGameAForm();
                  });
              },
              postDeleteGameA(o) {
                if (!confirm("Are you sure you want to delete the game from "+o.gfield+"?")) {
                    return;
                }
                
                fetch('api/gameAssign/delete.php', {
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
                    this.gameAssign = json;
                    
                    this.resetGameAForm();
                  });
              },
              selectGameA(o) {
                this.selectedGameA = o;
                this.gameAForm = Object.assign({}, this.selectedGameA);
              },
              resetGameForm() {
                this.selectedGameA = null;
                this.gameAForm = {};
              },
              fetchReffData() {
                fetch('/api/reffs/')
                .then( response => response.json() )
                .then( (responseJson) => {
                    console.log(responseJson);
                    this.reffs = responseJson;
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
                },
                postReff(evt) {
                  if (this.selectedReff === null) {
                      this.postNewReff(evt);
                  } else {
                      this.postEditReff(evt);
                  }
                },
              postNewReff(evt) {
                  //this.bookForm.id = this.selectedBook.id; //not sure about this
                  console.log("Posted!", this.reffForm); //test to make sure form works  //use cmd+shift+r to make sure
                  alert("Post");
      
                  fetch('api/reffs/create.php', {
                      method:'POST',
                      body: JSON.stringify(this.reffForm),
                      headers: {
                        "Content-Type": "application/json; charset=utf-8"
                      }
                    })
                    .then( response => response.json() )
                    .then( json => {
                      console.log("Returned from post:", json);
                      // TODO: test a result was returned!
                      this.reffs = json; //idk
                      
                      // reset the form
                      this.reffForm = {};
                    });
      
                  
                  },
                  postEditReff(evt) {
                      // this.offerForm.studentId = this.selectedStudent.id;
                      this.reffForm.id = this.selectedReff.id;       
                      
                      console.log("Updating!", this.reffForm);
              
                      fetch('api/reffs/update.php', {
                          method:'POST',
                          body: JSON.stringify(this.reffForm),
                          headers: {
                            "Content-Type": "application/json; charset=utf-8"
                          }
                        })
                        .then( response => response.json() )
                        .then( json => {
                          console.log("Returned from post:", json);
                          // TODO: test a result was returned!
                          this.reffs = json;
                          
                          this.resetReffForm();
                        });
                    },
                    postDeleteReff(o) {
                      if (!confirm("Are you sure you want to delete the offer from "+o.rname+"?")) {
                          return;
                      }
                      
                      fetch('api/reffs/delete.php', {
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
                          this.reffs = json;
                          
                          this.resetReffForm();
                        });
                    },
                    selectReff(o) {
                      this.selectedReff = o;
                      this.reffForm = Object.assign({}, this.selectedReff);
                    },
                    resetReffForm() {
                      this.selectedReff = null;
                      this.reffForm = {};
                    }
            
        
    },
    created() {
      this.fetchReffData();
      this.fetchGameData();
      this.fetchGameAData();
          
        }
  
  }
  
  Vue.createApp(reffGameApp).mount('#reffGameApp');