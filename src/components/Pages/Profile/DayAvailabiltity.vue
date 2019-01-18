<template>
  <div class="hold">
    <div class="row">
      <div class="col-md-12 lssa">
        <div class="sublist">
          <ul>
            <li :key="index" v-for="(day,index) in daysOfAvailability" v-if="day.enabled">
              {{ ucfirst(index) }} 
              <span>{{ `${timeText(day.from)} - ${timeText(day.to)}` }}</span>
              <i @click="() => daysOfAvailability[index].enabled = false">x</i>
            </li>
          </ul>
        </div>
        <br>
        <h5>Choose your days of avalability</h5>
        <p>You should select the days and times you're available</p>
      </div>
      <div class="col-md-12 p-0">
        <div class="panel-holder m-0">
          <div class="panels">
            <div class="panel-heading">
              <div class="icon"></div>
              <div class="tens">
                <h5>Days</h5>
                <p>Choose the days of the week you would be available.</p>
              </div>
            </div>
            <div class="panel-body">
              <div class="item" :key="index" v-for="(day,index) in daysOfAvailability">
                {{ucfirst(index)}}
                <span><input type="checkbox" v-model="daysOfAvailability[index].enabled"></span>
              </div>
            </div>
          </div>
          <div class="panels">
            <div class="panel-heading">
              <div class="icon"></div>
              <div class="tens">
                <h5>Time</h5>
                <p>Choose the most convenient time for you.</p>
              </div>
            </div>
            <div class="panel-body">
              <div class="item" :key="index" v-for="(day,index) in daysOfAvailability">
                <div class="as" v-show="daysOfAvailability[index].enabled">
                  <select :disabled="!daysOfAvailability[index].enabled" type="number" class="select" v-model="daysOfAvailability[index].from">
                    <option v-for="time in beforeTime(daysOfAvailability[index].to)" :key="time.value" :value="time.value">{{time.title}}</option>
                  </select>
                  To
                  <select type="number" :disabled="!daysOfAvailability[index].enabled" class="select" v-model="daysOfAvailability[index].to">
                    <option v-for="time in afterTime(daysOfAvailability[index].from)" :key="time.value" :value="time.value">{{time.title}}</option>
                  </select>
                </div>
                <p class="transparent" v-show="!daysOfAvailability[index].enabled">Can't teach this subject</p>
              </div>
            </div>
          </div>
        </div> <br>
        <div class="row">
          <div class="col">
            <button class="btn btn-success btn-lg submit-button" @click.prevent="submit" :disabled="submitting">Save & Continue
              <i class="fa fa-spin fa-circle-o-notch" v-show="submitting"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Index from "./Index";
import Spinner from "@/components/Preloaders/Spinner";
import { mapMutations } from "vuex";
export default {
  components: { Spinner },
  props: ['isdash'],
  data: () => ({
    fetching: false,
    fetched: false,
    submitting: false,
    api: BASE_API + "/v1/tutor/profile/availability",
    daysOfAvailability: {
      sunday: { id: 1, from: null, to: null, enabled: false },
      monday: { id: 2, from: null, to: null, enabled: false },
      tuesday: { id: 3, from: null, to: null, enabled: false },
      wednesday: { id: 4, from: null, to: null, enabled: false },
      thursday: { id: 5, from: null, to: null, enabled: false },
      friday: { id: 6, from: null, to: null, enabled: false },
      saturday: { id: 7, from: null, to: null, enabled: false }
    },
    times: [
      { title: "12 AM", value: 0 },
      { title: "1 AM", value: 100 },
      { title: "2 AM", value: 200 },
      { title: "3 AM", value: 300 },
      { title: "4 AM", value: 400 },
      { title: "5 AM", value: 500 },
      { title: "6 AM", value: 600 },
      { title: "7 AM", value: 700 },
      { title: "8 AM", value: 800 },
      { title: "9 AM", value: 900 },
      { title: "10 AM", value: 1000 },
      { title: "11 AM", value: 1100 },
      { title: "12 PM", value: 1200 },
      { title: "1 PM", value: 1300 },
      { title: "2 PM", value: 1400 },
      { title: "3 PM", value: 1500 },
      { title: "4 PM", value: 1600 },
      { title: "5 PM", value: 1700 },
      { title: "6 PM", value: 1800 },
      { title: "7 PM", value: 1900 },
      { title: "8 PM", value: 2000 },
      { title: "9 PM", value: 2100 },
      { title: "10 PM", value: 2200 },
      { title: "11 PM", value: 2300 },
    ],
  }),

  methods: {
    ...mapMutations("profile", {
      updateProgress: "UPDATE_AVAILABILITY"
    }),
    async initializeDays() {
      const da = this.daysOfAvailability;
      this.fetching = true;
      const { data: { data: av } } = await this.$http.get(this.api);
      this.fetching = false;
      this.fetched = true;
      Object.keys(da).forEach(day => {
        const ds = av.find(td => td.name.toLowerCase() == day);
        if (ds) {
          da[day].from = ds.from;
          da[day].to = ds.to;
          da[day].enabled = true;
        }
      });
    },
    afterTime(time) {
      if (time) {
        return this.times.filter(t => t.value > time);
      }
      return this.times;
    },
    beforeTime(time) {
      if (time) {
        return this.times.filter(t => t.value < time);
      }
      return this.times;
    },
    timeText(val) {
      const time = this.times.find(t => t.value === val);
      return time && time.title;
    },
    ucfirst: function(s) {
      return s[0].toUpperCase() + s.slice(1);
    },
    buildData: function() {
      var data = {},
        _this = this;
      Object.keys(this.daysOfAvailability).forEach(function(i) {
        if (
          _this.daysOfAvailability[i].enabled &&
          _this.daysOfAvailability[i].from &&
          _this.daysOfAvailability[i].to
        ) {
          data[_this.daysOfAvailability[i].id] = {
            start: _this.daysOfAvailability[i].from,
            end: _this.daysOfAvailability[i].to
          };
        }
      });
      return data;
    },
    submit() {
      this.submitting = true;

      this.$http
        .post(this.api, this.buildData())
        .then(res => {
          let data = res.data.data;
          this.updateProgress();
          if (this.isdash) {
            return swal({
                title: "Success",
                text: `Successfully updated`,
                icon: "success",
                buttons: ["Cancel", "Done ✓"]
              })
          }
          swal(
            "Success",
            "Your availability has been updated. " + data.text,
            "success"
          ).then(() => this.$router.push({name: 'subject-classes'}));
        })
        .catch((e) => {
          swal(
            "Sorry",
            "Something Went Wrong. Please try again later" + e,
            "error"
          );
        })
        .then(() => {
          this.submitting = false;
        });
    }
  },
  mounted: function() {
    this.initializeDays();
  }
};
</script>

<style lang="scss" scoped>
.hold {
  margin: 25px 0;
}
.card {
  margin-top: 10px;
  border-radius: 2px;
  box-shadow: 0 2px 2px 0 rgba(150,150,150,0.14), 0 3px 1px -2px rgba(150,150,150,0.12), 0 1px 5px 0 rgba(150,150,150,0.2);

  .tabs {
    display: flex;
    padding: 0 40px;
    height: 48px;
    width: 100%;
    margin: 0;
    
    .tab {
      display: inline-block;
      text-align: center;
      line-height: 48px;
      padding: 0;
      margin: 0;
      border-bottom: 1px solid #b2b2b2;
      color: #b2b2b2;
      position: relative;
      overflow: hidden;
      cursor: pointer;

      &.router-link-exact-active {
        &::after {
          background: #639440;
          width: 100%;
          position: absolute;
          bottom:0;
          left: 0%;
        }
        color: #333333;
      }


      // &.active { border-bottom: 2px solid #639440; }
    }
  }
}
.submit-button {
  width: 130px;
  height: 35px;
  line-height: 35px;
  padding: 0 10px;
  text-align: center;
  border-radius: 4px;
  font-size: 12px;
  vertical-align: middle;
  box-shadow: 0 2px 2px 0 rgba(40, 167, 69, 0.14), 0 3px 1px -2px rgba(40, 167, 69, 0.12), 0 1px 5px 0 rgba(40, 167, 69, 0.2);
  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
    &:active {box-shadow: none !important;}
  }
}
.panel-holder {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 30px;
    box-shadow: 0 2px 2px 0 rgba(180, 180, 180, 0.14), 0 3px 1px -2px rgba(180, 180, 180, 0.12), 0 1px 5px 0 rgba(180, 180, 180, 0.2);

  .panels {
    border: none;
    border-radius: 3px;
    // box-shadow: 0 2px 2px 0 rgba(180, 180, 180, 0.14), 0 3px 1px -2px rgba(180, 180, 180, 0.12), 0 1px 5px 0 rgba(180, 180, 180, 0.2);
    box-sizing: border-box;
    width: 50%;
    margin-right: 30px;
    .panel-heading {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      padding: 15px 0;

      .icon {
        width: 60px;
        margin-right: 10px
      }
      .tens {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;
        h5 {font-size: 13px; margin: 5px 0; font-weight: bold;}
        p {margin: 0; font-size: 11px; color: #71737d;}
      }
    }
    .panel-body {
      padding: 10px 15px;
      border-top: 0;
      color: #b2b3b8;
      .item {
        content: ' ';
        margin: 0 20px;
        padding: 20px 0;
        font-size: 11px;
        display: flex;
        min-height: 60px;
        height: 60px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        &:not(:last-child) {
          border-bottom: 1px solid #e8e9ec;
        }
        .as {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
        }
        .select {
          height: 25px;
          width: 100px;
          outline: none;
          padding: 2px 4px;
          border-radius: 4px;
          cursor: pointer;
          border: 1px solid rgba(216, 219, 226, 0.25);
          margin: 0 10px;
          box-shadow: 0 2px 2px 0 rgba(200, 200, 200, 0.14), 0 3px 1px -2px rgba(200, 200, 200, 0.12), 0 1px 5px 0 rgba(200, 200, 200, 0.2);
          color: #535561;
          transition: all .3s ease;
          font-size: 13px;
          &:active, &:hover { 
            box-shadow: 0 8px 17px 2px rgba(200, 200, 200,0.14), 0 3px 14px 2px rgba(200, 200, 200,0.12), 0 5px 5px -3px rgba(200, 200, 200,0.2);
          }
        }
      }
    }
  }
}
.lssa {
  padding: 25px 0;
  h5 {
    font-size: 22px;
    font-weight: bold;
    margin: 0;
  }
  .sublist {
    // margin: 30px 0;
    // border-top: 1px solid rgba(0, 0, 0, .25);
    // border-bottom: 1px solid rgba(0, 0, 0, .25);
    // padding: 15px 0;
    margin-bottom: 30px;
    ul {
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      li {
        padding: 10px 15px;
        border-radius: 4px;
        margin-right: 15px;
        background-color: rgba(110, 132, 94, .4);
        font-size: 13px;
        i {
          content: 'x';
          display: block;
          color: rgb(110, 132, 94);
          float: right;
          cursor: pointer;
        }
        span {
          margin: 0 15px;
        }
      }
    }
  }
}
.transparent { color: transparent; background-color: transparent; }
</style>