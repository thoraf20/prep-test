<template>
  <div class="container-material hold">
    <div v-if="doneLoading">
      <header>
        <span :class="itemType(t.status)">{{ t.status && t.status.name }}</span>
        {{ t.title }}
      </header>
      <div class="main">
        <div class="top">
          <p>{{ t.session_class && t.session_class.client && t.session_class && t.session_class.client.name }}<span>Class Started on {{ moments(t.session_class && t.session_class.intended_start_date && t.session_class && t.session_class.intended_start_date.date) }}</span></p>
          <span>Number of Cycles<b>({{ t.session_class && t.session_class.cycle }})</b></span>
        </div>
        <div class="bottom row">
          <div class="comments">
            <div class="comment">
              <div class="from-admin">
                <div class="box">Hi, how can I help you?</div>
                <div class="time">10:24 <span>Ella</span></div>
              </div>
            </div>
            <div class="comment" v-for="comment of t.comments">
              <div :class="commentType(comment.creator && comment.creator.type)">
                <div class="box">{{comment.content }}</div>
                <div class="time">{{ comment.updated_at && comment.updated_at.human }} <span v-if="comment.creator && comment.creator.type === 'user'">{{ comment.creator && comment.creator.name }}</span></div>
              </div>
            </div>
          </div>
          <div class="compose">
            <textarea v-model="text" class="conv-area" @focus="checker"></textarea>
            <button class="btn btn-success btn-lg submit-button" @click.prevent="send" :disabled="submitting">Send <i class="fa fa-spin fa-circle-o-notch" v-show="submitting"></i></button>
          </div>
        </div>
      </div>
    </div>
    <div class="row card" v-else>
      <div class="col card-body text-center">
        <spinner></spinner>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import swal from 'sweetalert';
import Spinner from '@/components/Preloaders/Spinner';

export default {
  name: 'class-ticket',
  props: ['id'],
  components: { Spinner },
  data() {
    return {
      text: 'Type your message here...',
      doneLoading: false,
      submitting: false,
    };
  },
  computed: {
    t() {
      return this.$store.getters.ticket;
    },
  },
  methods: {
    moments(val) {
      return moment(val).format('MMM D, YYYY');
    },
    itemType(val) {
      switch (val && val.name) {
        case 'open':
          return 'success';

        case 'in_progress':
          return 'success';

        case 'replied':
          return 'success';

        case 'closed':
          return 'fail';

        default:
          return 'default';
      }
    },
    commentType(val) {
      switch(val) {
        case 'user':
          return 'from-admin';

        default:
          return 'to-admin';
      }
    },
    checker() {
      if (this.text === 'Type your message here...')
        this.text = '';
    },
    send() {
      if (this.text !== '') {
        this.submitting = true;

        this.$store.dispatch('addComment', { ticket: this.id, comment: this.text })
        .then((response) => {
          this.text = 'Type your message here...';
          this.submitting = false;
        })
        .catch((error) => {
          if (typeof error !== 'undefined')
            swal(error.status, error.message, 'error'); 
          this.submitting = false;
        });
      }
    },
  },
  created() {
    if (!this.$store.getters.ticket_same_id(this.id)) {
      this.$store.dispatch('getTicket', this.id)
        .then(response => this.doneLoading = true)
        .catch(error => swal('Something went wrong', error, 'error'));
    }
  },
  mounted() {
    this.$store.dispatch('getTicket', this.id)
      .then(() => this.doneLoading = true)
      .catch(error => console.error(error));
  },
  updated() {
    const comments = this.$el.querySelector('.comments');
    comments.scrollTop = comments.scrollHeight;
  },
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
.conv-area {
  color:black !important;
}

.container-material {
  display: block;
}
header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.15rem;
  color: #5c5e6a;
  text-transform: capitalize;

  span {
    color: #ffffff;
    width: 75px;
    height: 22px;
    border-radius: 13px;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 15px;
    text-transform: capitalize;
    font-weight: 500;

    &.success {background-color: #639440;}
    &.fail {background-color: #ff6565;}
    &.default {background-color: #a5a6ac;}
  }
}
.submit-button {
  width: 110px;
  height: 40px;
  line-height: 40px;
  padding: 0 10px;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  vertical-align: middle;
  box-shadow: 0 2px 2px 0 rgba(40, 167, 69, 0.14), 0 3px 1px -2px rgba(40, 167, 69, 0.12), 0 1px 5px 0 rgba(40, 167, 69, 0.2);
  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
    &:active {box-shadow: none !important;}
  }
}
.main {
  width: 100%;

  .top {
    width: 100%;
    padding: 5px 0;
    padding-bottom: 15px;
    border-bottom: 1px solid #f5f5f5;

    p {
      margin: 10px 0;
      margin-bottom: 5px;
      font-size: 14px;
      color: #4d4f5c;
      font-weight: bold;
      span {
        float: right;
        font-size: 13px;
        font-weight: normal;
      }
    }
    span {
      font-size: 13px;
      color: #4d4f5c;
    }
  }
  .bottom {
    width: 100%;
    padding: 15px 0;
    margin: 10px 0;

    .comments {
      width: 100%;
      height: 200px;
      max-height: 400px;
      overflow-y: auto;

      .comment {
        width: 100%;
        height: auto;
        overflow: hidden;
        display: block;

        .from-admin {
          width: auto;
          max-width: 35%;
          float: left;

          .box {
            padding: 10px 15px;
            background-color: #edf0f5;
            color: #60626e;
            border-radius: 20px;
            border-bottom-left-radius: 0;
            font-size: 14px;
          }
          .time {
            color: #60626e;
            font-size: 12px;
            padding: 5px;
            span {float: right; font-weight: bold;}
          }
        }
        .to-admin {
          width: auto;
          max-width: 35%;
          float: right;

          .box {
            padding: 10px 15px;
            background-color: #dde8d5;
            color: #60626e;
            border-radius: 20px;
            border-bottom-right-radius: 0;
            font-size: 14px;
          }
          .time {
            color: #60626e;
            font-size: 12px;
            padding: 5px;
            text-align: right;
            span {float: right; font-weight: bold;}
          }
        }
      }
    }
    .compose {
      border-top: 1px solid #f5f5f5;
      padding: 25px;
      width: 100%;
      textarea {
        width: 100%;
        max-height: 250px;
        border: none;
        padding: 25px;
        font-size: 13px;
        background-color: #f5f6fa;
        color: #9cba89;
        border-radius: 4px;
        &:focus {outline: none;}
      }
      button {
        float: right;
        margin-top: 10px;
      }
    }
  }
}
@media only screen and (max-width: 600px) {
  .main {
    .bottom {
      .comments {
        .comment {
          .from-admin {max-width: 65%;}
          .to-admin {max-width: 65%;}
        }
      }
    }
  }
  .container-material {
      padding: 30px;
  }
}
</style>
