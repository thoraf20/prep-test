<template>
  <div class="steps-nav">
    <div class="steps-nav--item active">
      <p>1</p>
      <span>Personal Information</span>
    </div>
    <div class="steps-nav--item">
      <p>2</p>
      <span>Educational Background</span>
    </div>
    <div class="steps-nav--item">
      <p>3</p>
      <span>Verification</span>
    </div>
    <div class="steps-nav--item">
      <p>4</p>
      <span>Academic Information</span>
    </div>
    <div class="steps-nav--item">
      <p>5</p>
      <span>How it Works</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'steps-nav',
};
</script>

<style lang="scss" scoped>
.steps-nav {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 25px 0;
  .steps-nav--item {
    width: 220px;
    height: 90px;
    background-color: #F0F2F8;
    padding: 17px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-right: 30px;
    p { width: 30%; font-size: 78px; color: #4D4F5C; line-height: 78px; margin: 0; font-weight: 200; }
    span { display: inline-block; width: 70%; padding: 10px; font-size: 16px; color: #4D4F5C;}
    &.active { background-color: #639440; p {color: #ffffff;} span {color: #ffffff;}}
  }
}
</style>