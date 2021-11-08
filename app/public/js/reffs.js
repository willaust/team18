const ReffApp = {
    data() {
      return {
        reffs: [],
        // selectedBook: null, //maybe
        reffForm: {},
        offerForm: {},
        selectedReff: null
      }
    },
    computed: {},
    methods: {
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
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
        }
  
  }
  
  Vue.createApp(ReffApp).mount('#reffApp');