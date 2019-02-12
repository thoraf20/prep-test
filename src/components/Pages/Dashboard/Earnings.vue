<template>
  <div class="container-material hold">
    <div class="top">
      <div class="tp">
        <div class="flt">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="Capa_1"
            x="0px"
            y="0px"
            width="14px"
            height="14px"
            viewBox="0 0 971.986 971.986"
            style="enable-background:new 0 0 971.986 971.986;"
            xml:space="preserve"
            class
          >
            <g>
              <g>
                <path
                  d="M370.216,459.3c10.2,11.1,15.8,25.6,15.8,40.6v442c0,26.601,32.1,40.101,51.1,21.4l123.3-141.3   c16.5-19.8,25.6-29.601,25.6-49.2V500c0-15,5.7-29.5,15.8-40.601L955.615,75.5c26.5-28.8,6.101-75.5-33.1-75.5h-873   c-39.2,0-59.7,46.6-33.1,75.5L370.216,459.3z"
                  data-original="#000000"
                  class="active-path"
                  data-old_color="##4D4F5"
                  fill="rgba(77, 79, 92, 0.5)"
                ></path>
              </g>
            </g>
          </svg>
          Filter
        </div>
        <div class="srch">
          <input type="search" placeholder="Search Payouts" class="form-control" v-model="query">
        </div>
      </div>
      <div class="input-group input-daterange">
        <div class="col-sm-6">
          <datepicker
            v-model="from"
            placeholder="From"
            id="exampleInputEmail3"
            input-class="date-picker"
            :clear-button="true"
          ></datepicker>
        </div>
        <div class="col-sm-6">
          <datepicker
            v-model="to"
            placeholder="To"
            id="exampleInputEmail4"
            input-class="date"
            :clear-button="true"
          ></datepicker>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="tp">
        <p>Transaction History
          <span>{{ filtered.length }}</span>
        </p>
        <div class="sasasa"></div>
      </div>
      <div class="table-responsive" v-if="doneLoading">
        <table class="table">
          <thead>
            <tr>
              <td>Reference</td>
              <td>Amount</td>
              <td>Tutor</td>
              <td>Class</td>
              <td>Confirmed At</td>
              <td>Initiated At</td>
              <td>Approved At</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="earn of filtered" :key="earn.id">
              <td>{{ earn.reference }}</td>
              <td>&#8358; {{ number_format(earn.client_amount) }}</td>
              <td v-if="earn.session_class && earn.session_class.id">
                <router-link
                  :to="{ name: 'tutor-class', params: { id: earn.session_class.id }}"
                >{{ earn.session_class && earn.session_class.tutor && earn.session_class.tutor.name }}</router-link>
              </td>
              <td v-if="earn.session_class && earn.session_class.id">
                <router-link
                  :to="{ name: 'tutor-class', params: { id: earn.session_class.id }}"
                >{{ earn.session_class && earn.session_class.id }}</router-link>
              </td>
              <td>{{ earn.confirmed_at || '__________' }}</td>
              <td>{{ earn.initiated_at || '__________' }}</td>
              <td>{{ earn.approved_at || '__________' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="row justify-content-center">
        <div class="col text-center">
          <spinner/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Datepicker from "vuejs-datepicker";
import Spinner from "@/components/Preloaders/Spinner";

export default {
  name: "earnings-dashboard",
  components: { Datepicker, Spinner },
  beforeRouteEnter(to, from, next) {
    next(vm => vm.$store.commit("OFF_VISIBILITY"));
  },
  data() {
    return {
      doneLoading: false,
      from: null,
      to: null,
      query: ""
    };
  },
  computed: {
    earnings() {
      return this.$store.getters.tutor_earnings;
    },
    filtered() {
      return this.earnings.filter(e => {
        // date filter
        const dt = moment(e.created_at);
        // datefrom
        if (this.from !== null && !moment(dt).isAfter(moment(this.from))) {
          return false;
        }
        // dateto
        if (this.to !== null && !moment(dt).isBefore(moment(this.to))) {
          return false;
        }

        return (
          e.session_class &&
          e.session_class.client &&
          e.session_class.client.name
            .toLowerCase()
            .match(this.query.toLowerCase())
        );
      });
    }
  },
  methods: {
    number_format(number, decimals, dec_point, thousands_point) {
      if (number == null || !isFinite(number)) {
        throw new TypeError("number is not valid");
      }

      if (!decimals) {
        var len = number.toString().split(".").length;
        decimals = len > 1 ? len : 0;
      }

      if (!dec_point) dec_point = ".";

      if (!thousands_point) thousands_point = ",";

      number = parseFloat(number).toFixed(decimals);
      number = number.replace(".", dec_point);
      var splitNum = number.split(dec_point);
      splitNum[0] = splitNum[0].replace(
        /\B(?=(\d{3})+(?!\d))/g,
        thousands_point
      );
      number = splitNum.join(dec_point);
      return number;
    }
  },
  mounted() {
    this.$store.dispatch("getEarnings").then(() => (this.doneLoading = true));
  }
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.hold {
  padding: 25px 0;
  height: 100%;
}

.container-material {
  display: block;
}

.top {
  width: 100%;
  height: 64px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 25px 0;
  .tp {
    height: 64px;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: flex-start;
    width: 30%;
    .flt {
      font-size: 14px;
      font-weight: 600;
      color: rgba(77, 79, 92, 0.5);
      width: 30%;
      height: 100%;
      display: flex;
      flex-direction: row;
      cursor: pointer;
      justify-content: center;
      align-items: center;
      border-right: 1px solid rgba(112, 112, 112, 0.3);
      svg {
        margin-right: 5px;
      }
    }
    .srch {
      width: 70%;
      height: 100%;
      padding: 15px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      input {
        font-size: 14px;
        width: 185px;
        height: 40px;
        box-shadow: 0 2px 2px 0 rgba(200, 200, 200, 0.14),
          0 3px 1px -2px rgba(200, 200, 200, 0.12),
          0 1px 5px 0 rgba(200, 200, 200, 0.2);
        border: 1px solid rgba(112, 112, 112, 0.02);
        padding: 15px;
        transition: all 0.29s ease;
        border-radius: 4px;
        &:focus {
          width: 215px;
          box-shadow: 0 8px 17px 2px rgba(200, 200, 200, 0.14),
            0 3px 14px 2px rgba(200, 200, 200, 0.12),
            0 5px 5px -3px rgba(200, 200, 200, 0.2);
        }
      }
    }
    &:hover {
      .flt {
        color: #639440;
      }
    }
  }
  .input-daterange {
    width: 30%;
  }
  #exampleInputEmail3,
  #exampleInputEmail4 {
    width: 100%;
    height: 35px;
    line-height: 35px;
    border-radius: 18px;
    border: 1px solid rgba(112, 112, 112, 0.04);
    cursor: pointer;
    outline: none;
    font-size: 11px;
    box-shadow: 0 2px 2px 0 rgba(200, 200, 200, 0.14),
      0 3px 1px -2px rgba(200, 200, 200, 0.12),
      0 1px 5px 0 rgba(200, 200, 200, 0.2);
    text-align: center;
    transition: all 0.3s ease;
    &:active,
    &:hover {
      box-shadow: 0 8px 17px 2px rgba(200, 200, 200, 0.14),
        0 3px 14px 2px rgba(200, 200, 200, 0.12),
        0 5px 5px -3px rgba(200, 200, 200, 0.2);
    }
  }
  .vdp-datepicker__clear-button {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.bottom {
  margin-top: 25px;

  .tp {
    width: 100%;
    padding: 15px;
    position: relative;
    font-size: 22px;
    color: #576271;
    font-weight: 600;
    .sasasa {
      position: absolute;
      height: 1px;
      width: 100%;
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
      background-color: #e0e3da;
      bottom: 0;
      margin-bottom: 15px;
    }
    p {
      font-size: 22px;
      color: #576271;
      font-weight: 600;
      display: flex;
      flex-direction: row;
      align-items: center;
      span {
        font-size: 12px;
        background-color: #639400;
        color: #ffffff;
        padding: 3px 16px;
        border-radius: 16px;
        margin-left: 10px;
      }
    }
  }
  .table {
    margin-top: 30px;
    padding: 15px;
    thead {
      tr {
        td {
          border-top: none;
          color: #576271;
          text-transform: capitalize;
          font-size: 16px;
          font-weight: 300;
        }
      }
    }
    tbody {
      tr {
        td {
          color: #576271;
          text-transform: capitalize;
          font-size: 14px;
          padding: 20px 12px;
          a {
            color: #576271;
          }
        }
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .bottom {
    .tp {
      .sasasa {
        width: calc(100% - 30px);
      }
    }
    .table {
      width: 100%;
      margin-left: 0;
      overflow-x: auto;
      thead {
        tr {
          td {
            font-size: 12px;
          }
        }
      }
      tbody {
        tr {
          td {
            font-size: 10px;
            a {
              font-size: 10px;
            }
          }
        }
      }
    }
  }
}
</style>