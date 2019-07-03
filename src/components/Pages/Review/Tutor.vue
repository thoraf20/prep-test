<template>
  <div class="contain">
    <div class="card-ish card-25">
      <div class="top">
        <h5>Write a Review on {{ this.tutor.name }}</h5>
      </div>
      <div class="body">
        <div class="row">
          <div class="col-12 flex-row-center p-3">
            <img :src="this.tutor.profile_picture || '/static/img/no_image.png'" class="rounded-img">
          </div>
        </div>
        <div class="row">
          <div class="col-12 flex-row-center">
            <star-rating
              :glow="3"
              :increment="0.05"
              :fixed-points="2"
              text-class="asnd"
              v-model="rating"></star-rating>
          </div>
        </div>
        <div class="row">
          <div class="col-12 pt-3 form-group">
            <label for="reviewTitle">Review Title <span style="color: red; font-weight: 600">*</span></label>
            <input type="text" placeholder="Review Title" id="reviewTitle" class="form-control" v-model="title">
          </div>
        </div>
        <div class="row">
          <div class="col-12 form-group">
            <label for="reviewComment">Review Comment <span style="color: red; font-weight: 600">*</span></label>
            <textarea rows="3" class="form-control" id="reviewComment" v-model="comment"></textarea>
          </div>
        </div>
        <div class="row">
          <div class="col-12 flex-row-center p-2">
            <button class="submit-button btn btn-secondary" @click="submitReview" :disabled="submitting">Submit <i class="fa fa-spin fa-circle-o-notch" v-show="submitting"></i></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import StarRating from 'vue-star-rating';

export default {
  props: {
    t: {
      type: String,
      required: true,
    },
  },
  components: {
    StarRating,
  },
  data() {
    return {
      tutor: {},
      title: '',
      comment: '',
      rating: null,
      submitting: false,
      API: `${BASE_API}/v1`,
    };
  },
  methods: {
    fetchTutor() {
      this.$http
        .get(`${this.API}/client/tutors/${this.t}`)
        .then(({ data: { data } }) => {
          this.tutor = { ...data };
        })
        .catch(err => console.error(err));
    },
    fetchReview() {
      this.$http
        .get(`${this.API}/client/review/${this.t}`)
        .then(({ data: { data } }) => {
          if (data.review !== null) {
            this.title = data.review.title;
            this.rating = data.review.rating;
            this.comment = data.review.comment;
          }
        })
        .catch(err => console.log(err));
    },
    setRating(rating) {
      this.rating = rating;
    },
    submitReview() {
      if (this.rating === null) {
        return swal('Invalid Form Submission', 'Please give the tutor a rating by clicking on one of the stars.', 'error');
      }

      if (this.title === '') {
        return swal('Invalid Form Submission', 'Please write a title for your review.', 'error');
      }

      if (this.comment === '') {
        return swal('Invalid Form Submission', 'Please write a comment for your review', 'error');
      }

      return new Promise((resolve, reject) => {
        this.submitting = true;
        const { rating, title, comment } = this;
        this.$http
          .post(`${this.API}/client/review/${this.t}`, { rating, title, comment })
          .then(() => {
            this.submitting = false;
            this.$router.push({ name: 'home-dashboard' });
          })
          .catch((err) => {
            this.submitting = false;
            swal('Oops!', 'Something went wrong. Please try again later', 'error');
            console.log(err);
          });
      });
    },
  },
  mounted() {
    this.fetchTutor();
    this.fetchReview();
  },
};
</script>

<style lang="scss" scoped>
  .contain {
    width: 100%;
    display: flex;
    min-height: 100vh;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .flex-row-center {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .rounded-img {
    height: 150px;
    width: 150px;
    border-radius: 150px;
  }
  .card-ish {
    border: 1px solid rgba(224, 227, 218, .5);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.05);
    padding: 0;
    // margin: 0 23px;
    .top {
      padding: 15px 20px;
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid rgba(224, 227, 218, .5);
      h5 {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: #576271;
        font-size: 20px;
        justify-content: flex-start;
        font-weight: 500;
        margin-bottom: 0;
        svg {margin-right: 15px;}
      }
      button {
        height: 43px;
        width: 176px;
        border-radius: 4px;
        font-size: 14px;
        box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
      }
      .sasasa {
        position: absolute;
        height: 1px;
        width: calc(100% - 40px);
        box-shadow: 0 3px  6px rgba(0, 0, 0, 0.16);
        background-color: rgba(224, 227, 218, 1);
        bottom: 0;
      }
    }
    .body {
      position: relative;
      padding: 15px 20px;
      .b {position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);}
      .list {
        width: 90%;
        margin-top: 25px;
        margin-left: auto;
        margin-right: auto;
        .list--item {
          width: 100%;
          padding: 12px 0;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          color: #576271;
          border-bottom: 1px solid #E0E3DA;
          span {font-weight: 300; text-transform: capitalize;}
        }
        button.submit-button {
          height: 43px;
          width: 176px;
          border-radius: 4px;
          font-size: 14px;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }
      }
      .cdcol {
        height: 100%;
        padding: 30px;
        .title {
          font-weight: 600;
          color: #4D4F5C;
          font-size: 16px;
        }
        &:not(:last-child) {
          border-right: 1px solid #E0E3DA;
        }
        .items {
          ul {
            padding: 0;
            margin: 0;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
            margin-top: 15px;
            li {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;
              align-items: center;
              margin: 15px 0;
              text-transform: capitalize;
              svg { margin-right: 5px}
            }
          }
        }
      }
    }
    &.card-25 {
      width: 25%;
    }
    &.card-50 {
      width: 49%;
    }
    &.card-100 {
      width: 100%;
    }
    &.class-history, &.learner-detail {
      margin-right: 1%;
      .top {
        button {background-color: #109BF8; color: #ffffff;}
      }
    }
    &.ticket-history, &.client-detail {
      margin-left: 1%;
      .top {
        button {background-color: #F83B54; color: #ffffff;}
      }
    }
  }
  button.submit-button {
    height: 43px;
    width: 176px;
    border-radius: 4px;
    font-size: 14px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
  }

  @media only screen and (max-width: 600px) {
    .contain {
      align-items: flex-start;
      padding-top: 25px;
    }
    .card-ish {
      &.card-50 {width: 100%; margin-bottom: 15px; margin-left: 0 !important; margin-right: 0 !important;}
      &.card-25 {width: 100%; margin-bottom: 15px; margin-left: 15px !important; margin-right: 15px !important;}
    }
    .table {
      width: 100%;
      margin-left: 0;
      overflow-x: auto;
      thead {
        tr {
          td {font-size: 12px;}
        }
      }
      tbody {
        tr {
          td {
            font-size: 10px;
            a {font-size: 10px;}
          }
        }
      }
    }
  }
</style>
