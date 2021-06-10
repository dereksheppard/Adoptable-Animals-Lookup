


  Vue.use(VueLazyload);

  new Vue({
    el: "#app",
    devtools: true,
    data() {
      return {
        info: [],
        loading: true,
        errored: false,
        search: "",
        searchId: "",
        selectedType: "",
        selectedId: "",
        selectedTemp: "",
        selectedAge: [],
        selectedLocation: "",
        selectedSex: ""
      };
    },

    updated() {
      this.hashLookup();
    },
    mounted() {
      axios
        .get(
          "https://data.kingcounty.gov/resource/yaai-7frk.json?&record_type=ADOPTABLE&$order=date%20ASC"
        )

        .then(response => {
          this.info = response.data;

          //console.log(response);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })

        .finally(() => (this.loading = false));

      
    },

    computed: {
      itemsCount() {
        return this.computed_items.length;
      },
      lessThan() {
        return this.info.length;
      },

      computed_items: function() {
        let filterSearch = this.search,
          filterId = this.searchId,
          filterType = this.selectedType,
          filterLocation = this.selectedLocation,
          filterTemp = this.selectedTemp,
          filterAge = this.selectedAge,
          filterSex = this.selectedSex
          

        return this.info.filter(function(item) {
          //SEARCH FUNCTION

          let filtered = true;

          if (filtered) {

             if (filterSearch.length > 1) {

              if (item.animal_name != undefined) {
                filtered = 
                  item.animal_name
                  .toLowerCase()
                  .includes(filterSearch.toLowerCase())
              } if (item.animal_name === undefined) {
                return false
              }
           }
          }
          if (filtered) {
            if (filterId.length > 1) {

              if (item.animal_id != undefined) {
                filtered = 
                  item.animal_id
                  .toUpperCase()
                  .includes(filterId.toUpperCase())
              } if (item.animal_id === undefined) {
                return false
              }

            }
          }          
          if (filtered) {
            if (filterTemp && filterTemp.length > 0) {
              if (item.temperament != undefined) {
                filtered = item.temperament == filterTemp;
              }
              if (item.temperament === undefined) {
                return false;
              }
              filtered = item.temperament == filterTemp;
            }
          }

          if (filtered) {
            if (filterType && filterType.length > 0) {
              if (item.animal_type != undefined) {
                if (filterType == "") {
                  filtered = item.animal_type == filterType;
                } else {
                  if (
                    item.animal_type
                      .toString()
                      .toLowerCase()
                      .includes("cat")
                  ) {
                    var cat = "cat";
                    filtered = cat == filterType;
                  }
                  if (
                    item.animal_type
                      .toString()
                      .toLowerCase()
                      .includes("dog")
                  ) {
                    var dog = "dog";
                    filtered = dog == filterType;
                  }
                  if (
                    item.animal_type
                      .toString()
                      .toLowerCase()
                      .includes("bird")
                  ) {
                    var bird = "bird";
                    filtered = bird == filterType;
                  }
                  if (
                    item.animal_type
                      .toString()
                      .toLowerCase()
                      .includes("livestock")
                  ) {
                    var livestock = "livestock";
                    filtered = livestock == filterType;
                  } 
                  if (
                    !item.animal_type.toString().toLowerCase().includes(cat) &&
                    !item.animal_type.toString().toLowerCase().includes(dog) &&
                    !item.animal_type.toString().toLowerCase().includes(bird) &&
                    !item.animal_type.toString().toLowerCase().includes(livestock)
                  ) {
                    var other = "other";
                    filtered = other == filterType;
                  }                  
                }
              }
              if (item.animal_gender === undefined) {
                return false;
              }
            }
          }

          if (filtered) {
             if (filterLocation && filterLocation.length > 0) {
              if (item.current_location != undefined) {
                if (filterLocation == "") {
                  filtered = item.current_location == filterLocation;
                } else {
                  if (
                    item.current_location
                      .toString()
                      .toLowerCase()
                      .includes("foster home")
                  ) {
                    var foster = "foster";
                    filtered = foster == filterLocation;
                  }
                  if (
                    item.current_location
                      .toString()
                      .toLowerCase()
                      .includes("reber")
                  ) {
                    var reber = "reber";
                    filtered = reber == filterLocation;
                  }
                  if (
                    item.current_location
                      .toString()
                      .toLowerCase()
                      .includes("king county pet adoption center")
                  ) {
                    var raskc = "raskc";
                    filtered = raskc == filterLocation;
                  }
                  if (
                    item.current_location
                      .toString()
                      .toLowerCase()
                      .includes("tukwila")
                  ) {
                    var tukwila = "tukwila";
                    filtered = tukwila == filterLocation;
                  } 
                  if (
                    item.current_location
                      .toString()
                      .toLowerCase()
                      .includes("covington")
                  ) {
                    var covington = "covington";
                    filtered = covington == filterLocation;
                  } 
                                    if (
                    item.current_location
                      .toString()
                      .toLowerCase()
                      .includes("kirkland petco")
                  ) {
                    var kirkland = "kirkland";
                    filtered = kirkland == filterLocation;
                  } 
                }
              }
              if (item.current_location === undefined) {
                return false;
              }

          }
          }

          if (filtered) {
            if (filterAge && filterAge.length > 0) {
              if (item.age != undefined) {
                if (filterAge == "") {
                  filtered = !item.age == filterAge;
                } else {
                  if (
                    item.age.includes("YEAR") &&
                    !item.age.includes("NO AGE") &&
                    (item.age.charAt(0).includes("1") ||
                      item.age.charAt(0).includes("2") ||
                      item.age.charAt(0).includes("3")) &&
                    Number.isNaN(parseInt(item.age.charAt(1)))
                  ) {
                    var age1 = "1to3";
                    filtered = filterAge.includes(age1);
                  }
                  if (
                    item.age.includes("YEAR") &&
                    !item.age.includes("NO AGE") &&
                    (item.age.charAt(0).includes("4") ||
                      item.age.charAt(0).includes("5") ||
                      item.age.charAt(0).includes("6")) &&
                    Number.isNaN(parseInt(item.age.charAt(1)))
                  ) {
                    var age2 = "4to6";
                    filtered = filterAge.includes(age1 || age2);
                  }
                  if (
                    item.age.includes("YEAR") &&
                    !item.age.includes("NO AGE") &&
                    (item.age.charAt(0).includes("7") ||
                      item.age.charAt(0).includes("8") ||
                      item.age.charAt(0).includes("9")) &&
                    Number.isNaN(parseInt(item.age.charAt(1)))
                  ) {
                    var age3 = "7to9";
                    filtered = filterAge.includes(age1 || age2 || age3);
                  }
                  if (
                    item.age.includes("YEAR") &&
                    !item.age.includes("NO AGE") &&
                    Number.isNaN(parseInt(item.age.charAt(1))) === false
                  ) {
                    var age4 = "seniors";
                    filtered = filterAge.includes(age1 || age2 || age3 || age4);
                  }
                  if (
                    item.age.includes("WEEK") ||
                    (item.age.includes("MONTH") &&
                      !item.age.includes("NO AGE") &&
                      !item.age.includes("YEAR"))
                  ) {
                    var age5 = "less1";
                    filtered = filterAge.includes(
                      age1 || age2 || age3 || age4 || age5
                    );
                  }
                  if (item.age.includes("NO AGE")) {
                    var age6 = "NO AGE";
                    filtered = filterAge.includes(
                      age1 || age2 || age3 || age4 || age5 || age6
                    );
                  }
                }
              }
              if (item.age === undefined) {
                return false;
              }
            }
          }

          if (filtered) {
            if (filterSex && filterSex.length > 0) {
              if (item.animal_gender != undefined) {
                if (filterSex == "") {
                  filtered = item.animal_gender == filterSex;
                } else {
                  if (
                    item.animal_gender
                      .toString()
                      .toLowerCase()
                      .includes("female")
                  ) {
                    var female = "female";
                    filtered = female == filterSex;
                  }
                  if (
                    item.animal_gender
                      .toString()
                      .toLowerCase()
                      .includes("neutered") ||
                    item.animal_gender
                      .toString()
                      .toLowerCase()
                      .startsWith("m")
                  ) {
                    var male = "male";
                    filtered = male == filterSex;
                  }
                }
              }
              if (item.animal_gender === undefined) {
                return false;
              }
              //filtered = item.animal_gender == filterSex;
            }
          }

          return filtered;
        });
      },

      info_type: function() {
        return [
          
          ...new Set(
            this.info.map(i => i.animal_type).slice().sort()
             )

        ];
      },

      info_location: function() {
        return [
          ...new Set(
            this.info
              .map(i => i.current_location)
              .slice()
              .sort()
          )
        ];
      },
    },

    methods: {

      resetForm: function(e) {
        e.preventDefault();
        this.search = "";
        this.searchId = "";
        this.selectedType = "";
        this.selectedAge = [];
        this.selectedTemp = "";
        this.selectedLocation = "";
        this.selectedSex = "";
        this.ageClear();
      },
      ageClear: function() {
        var ageSelect = document.getElementById("ageSelect").options;
        for (var i = 0; i < ageSelect.length; i++) {
          ageSelect[i].selected = false;
        }
      }
    },

    filters: {
      titlecase: function(value) {
        if (!value) return "";
        value = value.toString().toLowerCase();

        return value.charAt(0).toUpperCase() + value.substring(1);
      },
      lowercase: function(value) {
        if (!value) return "";
        value = value.toString().toLowerCase();

        return value;
      },
      dateformat: function(value) {
        var date = new Date(value);
        var formatdate = new Intl.DateTimeFormat("en-US").format(date);
        return formatdate;
      },
      removeSpayed: function(value) {
        var removed = value.charAt(0).toUpperCase() + value.substring(1);

        if (
          value
            .toString()
            .toLowerCase()
            .includes("spayed")
        ) {
          return removed.replace("Spayed", "");
        }
        if (
          value
            .toString()
            .toLowerCase()
            .includes("neutered")
        ) {
          return removed.replace("Neutered", "");
        } else {
          return value;
        }
      }
    }
  });

// TEMPORARY CODE TO CLOSE PET MODAL AND SCROLL TO
// HEADING EXPLAINING COVID-19 ADOPTION PROCESS
document.addEventListener(
  "click",
  function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches("#shelter-scroll")) return;

    // Don't follow the link
    event.preventDefault();

    $(".modal.in").modal("hide");
    $("html, body").animate(
      {
        scrollTop: $("#shelter-process").offset().top
      },
      1000
    );
$('#shelter-link').blur();
  },
  false
);


document.addEventListener(
  "click",
  function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches("#foster-scroll")) return;

    // Don't follow the link
    event.preventDefault();
    
    $(".modal.in").modal("hide");
    $("html, body").animate(
      {
        scrollTop: $("#foster-process").offset().top
      },
      1000
    );
$('#foster-link').focus();
  },
  false
);

document.addEventListener(
  "click",
  function (event) {
    // If the clicked element doesn't have the right selector, bail
    if (!event.target.matches("#partnerstore-scroll")) return;

    // Don't follow the link
    event.preventDefault();
    
    $(".modal.in").modal("hide");
    $("html, body").animate(
      {
        scrollTop: $("#partnerstore-process").offset().top
      },
      1000
    );
$('#partnerstore-process').focus();
  },
  false
);