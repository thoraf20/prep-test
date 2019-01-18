<template>
  <div class="cont">
    <div class="row m-0">
      <div class="col-md-12 left-nav p-0">
        <ul>
          <router-link tag="li" :to="{ name: 'availability-info' }"><span>A</span>Availability Info</router-link>
          <router-link tag="li" :to="{ name: 'subject-classes' }"><span>B</span>Subjects & Classes</router-link>
          <router-link  tag="li":to="{ name: 'test-index' }"><span>C</span>Test</router-link>
          <router-link tag="li" :to="{ name: 'subject-profiles' }"><span>D</span>Tutor Profile</router-link>
        </ul>
      </div>
      <div class="col-md-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileBasic from '@/components/Pages/Profile/EditBasic';
import ProfileLocation from '@/components/Pages/Profile/EditLocation';
import ProfileAbout from '@/components/Pages/Profile/EditAbout';

export default {
  name: 'academic-info',
  components: {
    ProfileBasic,
    ProfileLocation,
    ProfileAbout,
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.cont {
  padding: 15px 0;
}
h3.title {
  font-size: 20px;
  font-weight: 800;
  margin: 10px 0;
}
p.subtitle {
  margin: 5px 0;
  color: #2A2A2A;
  font-size: 16px;
}
.submit-button {
  width: 130px;
  height: 38px;
  line-height: 38px;
  padding: 0 10px;
  text-align: center;
  border-radius: 4px;
  font-size: 14px;
  vertical-align: middle;
  float: right;
  box-shadow: 0 2px 2px 0 rgba(40, 167, 69, 0.14), 0 3px 1px -2px rgba(40, 167, 69, 0.12), 0 1px 5px 0 rgba(40, 167, 69, 0.2);
  &.btn-default {
    box-shadow: 0 2px 2px 0 rgba(112, 112, 112, 0.14), 0 3px 1px -2px rgba(112, 112, 112, 0.12), 0 1px 5px 0 rgba(112, 112, 112, 0.2);
  }
  &:focus {
    outline: 0 !important;
    box-shadow: none !important;
    &:active {box-shadow: none !important;}
  }
}
.mx { margin: 0 10px; }
.foot {
  margin-top: 30px;
}
.left-nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 15px;
  width: 100%;
  border-bottom: 1px solid rgba(0, 0, 0, .25);
  ul {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 1220px;
    position: relative;
    padding: 0;
    &::before {
      content: ' ';
      position: absolute;
      height: 1px;
      width: calc(100% - 40px);
      display: block;
      top: 50%;
      left: 40px;
      background-color: rgba(0, 0, 0, .25);
      z-index: 0;
    }
    li {
      background-color: #fff;
      padding: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;
      z-index: 2;
      span {
        width: 50px;
        height: 50px;
        background-color: #F0F2F8;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 100%;
        padding: 10px 0;
        margin: 10px;
        cursor: pointer;
      }
      &:hover{color: #639440;}
      &.active {list-style-image: url(../../../assets/tick.svg); color: #639440; span {background-color: #639440; color: #fff}}
    }
  }
}
</style>