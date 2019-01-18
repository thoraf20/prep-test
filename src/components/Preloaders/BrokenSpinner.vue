<style>
.lds-dual-ring {
  display: inline-block;
  width: 64px;
  height: 64px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 46px;
  height: 46px;
  margin: 1px;
  border-radius: 50%;
  border: 5px solid var(--color);
  border-color: var(--color) transparent var(--color) transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div class="lds-dual-ring" :style="{'--color': color}"></div>
</template>

<script>
export default {
  props: {
    color: {
      default: "grey"
    }
  }
};
</script>

