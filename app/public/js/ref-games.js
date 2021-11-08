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
        selectedReff: null,
        teams: [],
        teamForm: {},
        selectedTeam: null,
        offers: [],
        saveRef: [],
        ofs: [],
        per: [],
        selectedPer: null,
        perForm: {},
      }
    },
    computed: {},
    methods: {
      fetchReportData() {
        fetch('/api/report1/')
        .then( response => response.json() )
        .then( (responseJson) => {
            console.log(responseJson);
            this.offers = responseJson;
        })
        .catch( (error) => {
            console.error(error);
        });
    },

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
            // this.gameAForm.gameId = this.games.gtime;
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
              resetGameAForm() {
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
                      if (!confirm("Are you sure you want to delete the Reff: "+o.rname+"?")) {
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
                    // selectReff(o) {
                    //   this.selectedReff = o;
                    //   this.reffForm = Object.assign({}, this.selectedReff);
                    // },
                    resetReffForm() {
                      this.selectedReff = null;
                      this.reffForm = {};
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
        // postReff(evt) {
        //     if (this.selectedReff === null) {
        //         this.postNewReff(evt);
        //     } else {
        //         this.postEditReff(evt);
        //     }
        //   },
        // postNewReff(evt) {
        //     //this.bookForm.id = this.selectedBook.id; //not sure about this
        //     console.log("Posted!", this.reffForm); //test to make sure form works  //use cmd+shift+r to make sure
        //     alert("Post");

        //     fetch('api/reffs/create.php', {
        //         method:'POST',
        //         body: JSON.stringify(this.reffForm),
        //         headers: {
        //           "Content-Type": "application/json; charset=utf-8"
        //         }
        //       })
        //       .then( response => response.json() )
        //       .then( json => {
        //         console.log("Returned from post:", json);
        //         // TODO: test a result was returned!
        //         this.reffs = json; //idk
                
        //         // reset the form
        //         this.reffForm = {};
        //       });

            
        //     },
        //     postEditReff(evt) {
        //         // this.offerForm.studentId = this.selectedStudent.id;
        //         this.reffForm.id = this.selectedReff.id;       
                
        //         console.log("Updating!", this.reffForm);
        
        //         fetch('api/reffs/update.php', {
        //             method:'POST',
        //             body: JSON.stringify(this.reffForm),
        //             headers: {
        //               "Content-Type": "application/json; charset=utf-8"
        //             }
        //           })
        //           .then( response => response.json() )
        //           .then( json => {
        //             console.log("Returned from post:", json);
        //             // TODO: test a result was returned!
        //             this.reffs = json;
                    
        //             this.resetReffForm();
        //           });
        //       },
        //       postDeleteReff(o) {
        //         if (!confirm("Are you sure you want to delete the offer from "+o.rname+"?")) {
        //             return;
        //         }
                
        //         fetch('api/reffs/delete.php', {
        //             method:'POST',
        //             body: JSON.stringify(o),
        //             headers: {
        //               "Content-Type": "application/json; charset=utf-8"
        //             }
        //           })
        //           .then( response => response.json() )
        //           .then( json => {
        //             console.log("Returned from post:", json);
        //             // TODO: test a result was returned!
        //             this.reffs = json;
                    
        //             this.resetReffForm();
        //           });
        //       },
        //       selectReff(o) {
        //         this.selectedReff = o;
        //         this.reffForm = Object.assign({}, this.selectedReff);
        //       },
        //       resetReffForm() {
        //         this.selectedReff = null;
        //         this.reffForm = {};
        //       },
              fetchTeamData() {
                fetch('/api/teams/index.php')
                .then( response => response.json() )
                .then( (responseJson) => {
                    console.log(responseJson);
                    this.teams = responseJson;
                })
                .catch( (err) => {
                    console.error(err);
                })
            },
            postTeam(evt) {
                if (this.selectedTeam === null) {
                    this.postNewTeam(evt);
                } else {
                    this.postEditTeam(evt);
                }
              },
            postNewTeam(evt) {
                //this.bookForm.id = this.selectedBook.id; //not sure about this
                console.log("Posted!", this.teamForm); //test to make sure form works  //use cmd+shift+r to make sure
                alert("Post");
    
                fetch('api/teams/create.php', {
                    method:'POST',
                    body: JSON.stringify(this.teamForm),
                    headers: {
                      "Content-Type": "application/json; charset=utf-8"
                    }
                  })
                  .then( response => response.json() )
                  .then( json => {
                    console.log("Returned from post:", json);
                    // TODO: test a result was returned!
                    this.teams = json; //idk
                    
                    // reset the form
                    this.teamForm = {};
                  });
    
                
                },
                postEditTeam(evt) {
                    // this.offerForm.studentId = this.selectedStudent.id;
                    this.teamForm.id = this.selectedTeam.id;       
                    
                    console.log("Updating!", this.teamForm);
            
                    fetch('api/teams/update.php', {
                        method:'POST',
                        body: JSON.stringify(this.teamForm),
                        headers: {
                          "Content-Type": "application/json; charset=utf-8"
                        }
                      })
                      .then( response => response.json() )
                      .then( json => {
                        console.log("Returned from post:", json);
                        // TODO: test a result was returned!
                        this.teams = json;
                        
                        this.resetTeamForm();
                      });
                  },
                  postDeleteTeam(o) {
                    if (!confirm("Are you sure you want to delete the Team: "+o.Name+"?")) {
                        return;
                    }
                    
                    fetch('api/teams/delete.php', {
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
                        this.teams = json;
                        
                        this.resetTeamForm();
                      });
                  },
                  selectTeam(o) {
                    this.selectedTeam = o;
                    this.teamForm = Object.assign({}, this.selectedTeam);
                  },
                  resetTeamForm() {
                    this.selectedTeam = null;
                    this.teamForm = {};
                  },
                  selectReff(o) {
                    // this.SaveRef.id = o;
                    // this.reffForm = Object.assign({}, this.selectedReff);
                    if (o == this.selectedReff) {
                      return;
                  }
                  this.selectedReff = o;
                  this.ofs = [];
                  console.log("Fetching reff for ", this.selectedReff);
                  this.fetchPerData(this.selectedReff);
                  },
                  selectReff1(o) {
                    this.selectedReff = o;
                    this.reffForm = Object.assign({}, this.selectedReff);
                  },
                  fetchPerData(s) {
                    console.log("Fetching reff data for ", s);
                    fetch('/api/per/?ref=' + s.id)
                    .then( response => response.json() )
                    .then( (responseJson) => {
                        console.log(responseJson);
                        this.ofs = responseJson;
                    })
                    .catch( (err) => {
                        console.error(err);
                    })
                    .catch( (error) => {
                        console.error(error);
                    });
                },
                selectPerToEdit(o) {
                  this.selectedPer = o;
                  this.perForm = Object.assign({}, this.selectedPer);
              },
              postDeletePer(o) {
                if (!confirm("Are you sure you want to delete the person from "+o.fname+"?")) {
                  return;
                }
                console.log("Delete!", o);
        
                fetch('api/per/delete.php', {
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
                    this.ofs = json;
        
                    // reset the form
                    this.resetPerForm();
                  });
              },
              resetPerForm() {
                this.selectedPer = null;
                this.perForm = {};
            },
            postPer(evt) {
              if (this.selectedPer === null) {
                  this.postNewPer(evt);
              } else {
                  this.postEditPer(evt);
              }
            },
            postNewPer(evt) {
              this.perForm.refId = this.selectedReff.id;
      
              console.log("Creating!", this.perForm);
      
              fetch('api/per/create.php', {
                  method:'POST',
                  body: JSON.stringify(this.perForm),
                  headers: {
                    "Content-Type": "application/json; charset=utf-8"
                  }
                })
                .then( response => response.json() )
                .then( json => {
                  console.log("Returned from post:", json);
                  // TODO: test a result was returned!
                  this.ofs = json;
      
                  // reset the form
                  this.resetPerForm();
                })
                .catch( err => {
                  alert("Something went horribly wrong!");
                });
            },
            postEditPer(evt) {
              this.perForm.refId = this.selectedReff.id;
              this.perForm.id = this.selectedPer.id;
      
              console.log("Updating!", this.perForm);
      
              fetch('api/per/update.php', {
                  method:'POST',
                  body: JSON.stringify(this.perForm),
                  headers: {
                    "Content-Type": "application/json; charset=utf-8"
                  }
                })
                .then( response => response.json() )
                .then( json => {
                  console.log("Returned from post:", json);
                  // TODO: test a result was returned!
                  this.ofs = json;
      
                  // reset the form
                  this.resetPerForm();
                });
            }
            
        
    },
    created() {
      this.fetchReffData();
      this.fetchGameData();
      this.fetchGameAData();
      this.fetchTeamData();
      this.fetchReportData();
          
        }
  
  }
  
  Vue.createApp(reffGameApp).mount('#reffGameApp');