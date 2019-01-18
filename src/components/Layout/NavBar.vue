<template>
  <div class="nb container-fluid">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark nav-fill" >
      <div class="container-material h-full">
        <div class="w-100 nav-holder">
          <a href="" class="hide-on-medium-and-up" @click.prevent="$store.commit('TOGGLE_VISIBILITY')">
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 54 54" style="enable-background:new 0 0 54 54;" xml:space="preserve" width="22px" height="22px" class=""><g><circle cx="7" cy="47" r="7" data-original="#556080" class="active-path" data-old_color="#ffffff" fill="#ffffff"/><circle cx="27" cy="47" r="7" data-original="#556080" class="active-path" data-old_color="#ffffff" fill="#ffffff"/><circle cx="47" cy="47" r="7" data-original="#556080" class="active-path" data-old_color="#ffffff" fill="#ffffff"/><circle cx="7" cy="27" r="7" data-original="#556080" class="active-path" data-old_color="#ffffff" fill="#ffffff"/><circle cx="27" cy="27" r="7" data-original="#556080" class="active-path" data-old_color="#ffffff" fill="#ffffff"/><circle cx="47" cy="27" r="7" data-original="#556080" class="active-path" data-old_color="#ffffff" fill="#ffffff"/><circle cx="7" cy="7" r="7" data-original="#556080" class="active-path" data-old_color="#ffffff" fill="#ffffff"/><circle cx="27" cy="7" r="7" data-original="#556080" class="active-path" data-old_color="#ffffff" fill="#ffffff"/><circle cx="47" cy="7" r="7" data-original="#556080" class="active-path" data-old_color="#ffffff" fill="#ffffff"/></g> </svg>
          </a>
          <a class="navbar-brand" href="/" onclick="window.location.reload();return false">
            <img class="logo" width="120" src="//prepclass.com.ng/img/logo-white.png">
          </a>
          <div class="user--details">
            <p class="hide-on-small-only">Client ID: {{ this.$auth.user().former_id }} // <b style='padding-left:2px'>My Wallet: </b>₦{{this.$auth.user().wallet.amount }}</p>
            <b-dropdown variant="link" size="lg" no-caret>
              <template slot="button-content">
                <img :src="this.$auth.user().profile_pic || '/static/img/no_image.png'" alt="" style="width:40px; height:40px">
              </template>
              <b-dropdown-item href="#">Settings</b-dropdown-item>
              <b-dropdown-item href="#" @click.prevent="logout">Logout</b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  data() {
    return {
      showCloseMenu: false,
    };
  },
  methods: {
    logout() {
      this.$auth.logout({
        makeRequest: false,
        success: () => {
          this.$router.push({name: 'login'});
        },
        error() {
          console.log('error logging out ');
        },
      });
    },
    toggleMenu() {
      this.showCloseMenu = true;
    },
    toggleClose() {
      this.showCloseMenu = false;
    },
  },
  filters:  {
    parseAmount(value) {
      
    }
  }
};
</script>

<style lang="scss" scoped>
.nb {padding: 0;}
.h-full {height: 100%;}
.hide-on-medium-and-up {display: none;}
.nav-holder {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .user--details {
    padding: 10px;
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    font-size: 13px;
    height: 100%;
    width: auto;
    min-width: 210px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    p {margin: 0;}
  }
}
@media only screen and (max-width: 600px) {
  nav.nav-fill {width: 100%; padding: 15px !important;}
  .hide-on-small-only { display: none; }
  .hide-on-medium-and-up {display: block;}
  .nav-holder {
    .user--details {
      min-width: 35px;
      padding: 0;
      img {width: 35px; height: 35px;}
    }
  }
}
</style>