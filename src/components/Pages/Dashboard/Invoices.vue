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
          <input type="search" placeholder="Search Invoices" class="form-control" v-model="query">
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
        <p>All Invoices
          <span>{{ filtered.length }}</span>
        </p>
        <div class="sasasa"></div>
      </div>
      <div class="table-responsive" v-if="doneLoading">
        <table class="table">
          <thead>
            <tr>
              <td>ID</td>
              <td>UIA 
                <span v-b-tooltip.hover 
                title="Unique Invoice Amount is the amount billed for a class session without including the past credit/debit details of the client. For example, if a client owed 20,000NGN in the past and his billed  another 32,000NGN for a new session. His UIA still remains 32,000NGN for that class">
                  <i id="cia" class="fal fa fa-info-circle"></i>
                </span>
              </td>
              <td>CIA
                <span v-b-tooltip.hover title="Cumulative Invoice Amount is the amount billed for a class session plus the past credit/debit details of the client. For example, if a client owed 20,000NGN in the past and his billed  another 32,000NGN for a new session. His CIA becomes 52,000NGN for that class">
                  <i id="cia" class="fal fa fa-info-circle"></i>
                </span>
              </td>
              <td>Status</td>
              <td>Last Updated</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(invoice,index) of filtered" :key="invoice.id">
              <td>{{ index + 1 }}</td>
              <td>&#8358;{{ invoice.unique_amount }}</td>
              <td>&#8358;{{ invoice.amount }}</td>
              <td class="status">
                <span :class="invoice.status ? invoice.status.name.toLowerCase() : 'default'"></span>
                {{ invoice.status && invoice.status.name }}
              </td>
              <td>{{ invoice.updated_at && invoice.updated_at }}</td>
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
  name: "invoices-dashboard",
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
    invoices() {
      return this.$store.getters.tutor_invoices;
    },
    // tickets() {
    //   return this.$store.getters.tutor_tickets;
    // },
    filtered() {
      return this.invoices.filter(t => {
        // date filter
        const dt = moment(t.created_at);
        // datefrom
        if (this.from !== null && !moment(dt).isAfter(moment(this.from))) {
          return false;
        }
        // dateto
        if (this.to !== null && !moment(dt).isBefore(moment(this.to))) {
          return false;
        }

        return t;
      });
    }
  },
  methods: {
    moments(val) {
      return moment(val).format("MMM D, YYYY");
    },
    itemType(val) {
      switch (val && val.name) {
        case "open":
          return "success";

        case "in_progress":
          return "success";

        case "replied":
          return "success";

        case "closed":
          return "fail";

        default:
          return "default";
      }
    },
    number_format(number, decimals, dec_point, thousands_point) {
      if (number == null || !isFinite(number))
        throw new TypeError("number is not valid");

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
    // this.$store.dispatch('getInvoices')
    //   .then(() => this.doneLoading = true);

    this.$store
      .dispatch("getInvoices")
      .then(response => (this.doneLoading = true))
      .catch(error => swal("Something went wrong", error, "error"));
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
    margin-top: 20px;
    width: 95%;
    margin-left: auto;
    margin-right: auto;
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
        cursor: pointer;
        &:hover {
          background-color: #fafafa;
        }
        td {
          color: #576271;
          text-transform: capitalize;
          font-size: 13px;
          padding: 20px 10px;
          border-top: 1px solid rgba(112, 112, 112, 0.12);
          a {
            color: #576271;
            text-transform: capitalize;
            font-size: 13px;
            &:hover {
              color: #639440;
              text-decoration: none;
            }
          }
          &.status {
            span {
              content: " ";
              display: inline-block;
              margin-right: 5px;
              height: 10px;
              width: 10px;
              border-radius: 100%;
              background-color: #4d4f5c;
              &.active,
              &.open {
                background-color: #38adb6;
              }
              &.ended {
                background-color: #f83b54;
              }
              &.paused {
                background-color: #ffbb03;
              }
            }
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