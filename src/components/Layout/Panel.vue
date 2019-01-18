<template id="panel">
  <div class="panel">
    <div :class="{'panel-heading':true , collapsible: collapsible}" @click="toggle">
      <div class="panel-title">{{name}} <span class="right" v-show="icon"><i class="fa fa-caret-down"></i></span></div>
    </div>
    <div class="panel-body" v-show="isVisible">
      <slot></slot>
    </div>
  </div>
</template>

<style type="text/css">
.right {float: right;}
.compress-enter,
.compress-leave-to {
  transform: scaleY(0);
}
.compress-enter-active,
.compress-leave-active {
  transition: transform 0.2s ease-out;
  transform-origin: top;
}

.compress-enter-to,
.compress-leave {
  transform: scaleY(1);
}

.collapsible {
  cursor: pointer;
}
.panel-body {
  padding: 15px;
}
</style>

<script type="text/javascript">
export default {
  props: {
    name: {
      type: String,
    },
    visible: {
      type: Boolean,
      default: false,
    },
    collapsible: {
      type: Boolean,
      default: true,
    },
    icon: {
      type: Boolean,
      default: false,
    },
  },
  data: function() {
    return {
      isVisible: true
    };
  },
  methods: {
    toggle: function() {
      if (this.collapsible) this.isVisible = !this.isVisible;
    }
  },
  mounted: function() {
    this.isVisible = this.visible ? true : false;
  }
};
</script>
