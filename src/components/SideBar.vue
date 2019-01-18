<template>
  <div>
    <div class="side-links">
      <div class="side-link active">
        <router-link :to="{name:'profile-edit'}">Edit Profile</router-link>
        <span class="pull-right" style="position: absolute; right:0">
			<!--@if (isset(Auth::user()->meta->progress->profile)  && Auth::user()->meta->progress->profile == true)
				<i class="fa fa-check"></i>
       @endif-->
     </span>
   </div>
   <div class="side-link ">
    <router-link :to="{name : 'profile-credential'}">Credentials</router-link>
    <span class="pull-right" style="position: absolute; right:0">
			<!--@if (isset(Auth::user()->meta->progress->credentials)  && Auth::user()->meta->progress->credentials == true)
				<i class="fa fa-check"></i>
       @endif-->
     </span>
   </div>
   <div class="side-link active" >
    <router-link :to="{name: 'profile-media' }">Photos and Video</router-link>
    <span class="pull-right" style="position: absolute; right:0"><!--
			@if (isset(Auth::user()->meta->progress->picture)  && Auth::user()->meta->progress->picture == true)
				<i class="fa fa-check"></i>
       @endif-->
    </span>
   </div>
   <div class="side-link ">
    <router-link :to="{name : 'profile-subject-ability'}">Subjects and Classes</router-link>
    <span class="pull-right" style="position: absolute; right:0">
			<!--@if (isset(Auth::user()->meta->progress->subjects)  && Auth::user()->meta->progress->subjects == true)
				<i class="fa fa-check"></i>
       @endif-->
    </span>
   </div>
   <div class="side-link active">
    <router-link :to="{name: 'profile-day-availability'}"> Days of Availability</router-link>
    <span class="pull-right" style="position: absolute; right:0">
			<!--@if (isset(Auth::user()->meta->progress->availability)  && Auth::user()->meta->progress->availability == true)
				<i class="fa fa-check"></i>
       @endif-->
     </span>
   </div>
   <div class="side-link active">
    <router-link :to="{name: 'profile-status'}">Status</router-link>
  </div>
</div>
</div>
</template>

<script>
  export default {
    name: "side-bar"
  }
</script>

<style lang="scss">
  $radio-fill-color: #36D1DC !default;
  $radio-empty-color: #cfcfcf !default;
  $input-disabled-solid-color: #949494 !default;
  $radio-border: 1px solid $radio-fill-color !default;
  $input-disabled-color: rgba(0,0,0, .42) !default;
  $input-background: #fff !default;
  $secondary-color: #36D1DC;
  /* Checkboxes
   ========================================================================== */

  /* Remove default checkbox */
  [type="radio"]:not(:checked),
  [type="radio"]:checked {
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }

  // Checkbox Styles
  [type="radio"] {
    // Text Label Style
    + span:not(.lever) {
      position: relative;
      padding-left: 35px;
      cursor: pointer;
      display: inline-block;
      height: 25px;
      line-height: 25px;
      font-size: 1rem;
      user-select: none;
    }

    /* checkbox aspect */
    + span:not(.lever):before,
    &:not(.filled-in) + span:not(.lever):after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 25px;
      height: 25px;
      z-index: 0;
      border: 1px solid $radio-empty-color;
      border-radius: 2.3px;
      margin-top: 3px;
      transition: .2s;
    }

    &:not(.filled-in) + span:not(.lever):after {
      border: 0;
      transform: scale(0);
    }

    &:not(:checked):disabled + span:not(.lever):before {
      border: none;
      background-color: $input-disabled-color;
    }

    // Focused styles
    &.tabbed:focus + span:not(.lever):after {
      transform: scale(1);
      border: 0;
      border-radius: 50%;
      box-shadow: 0 0 0 10px rgba(0,0,0,.1);
      background-color: rgba(0,0,0,.1);
    }
  }

  [type="radio"]:checked {
    + span:not(.lever):before {
      top: -4px;
      left: -5px;
      width: 12px;
      height: 22px;
      border-top: 2px solid transparent;
      border-left: 2px solid transparent;
      border-right: $radio-border;
      border-bottom: $radio-border;
      transform: rotate(40deg);
      backface-visibility: hidden;
      transform-origin: 100% 100%;
    }

    &:disabled + span:before {
      border-right: 2px solid $input-disabled-color;
      border-bottom: 2px solid $input-disabled-color;
    }
  }

  /* Indeterminate checkbox */
  [type="radio"]:indeterminate {
    + span:not(.lever):before {
      top: -11px;
      left: -12px;
      width: 10px;
      height: 22px;
      border-top: none;
      border-left: none;
      border-right: $radio-border;
      border-bottom: none;
      transform: rotate(90deg);
      backface-visibility: hidden;
      transform-origin: 100% 100%;
    }

    // Disabled indeterminate
    &:disabled + span:not(.lever):before {
      border-right: 2px solid $input-disabled-color;
      background-color: transparent;
    }
  }

  // Filled in Style
  [type="radio"].filled-in {
    // General
    + span:not(.lever):after {
      border-radius: 50%;
    }

    + span:not(.lever):before,
    + span:not(.lever):after {
      content: '';
      left: 0;
      position: absolute;
      /* .1s delay is for check animation */
      transition: border .25s, background-color .25s, width .20s .1s, height .20s .1s, top .20s .1s, left .20s .1s;
      z-index: 1;
    }

    // Unchecked style
    &:not(:checked) + span:not(.lever):before {
      width: 0;
      height: 0;
      border: 3px solid transparent;
      left: 6px;
      top: 10px;
      transform: rotateZ(37deg);
      transform-origin: 100% 100%;
    }

    &:not(:checked) + span:not(.lever):after {
      height: 25px;
      width: 25px;
      background-color: transparent;
      border: 2px solid $radio-empty-color;
      top: 0px;
      z-index: 0;
    }

    // Checked style
    &:checked {
      + span:not(.lever):before {
        top: 2px;
        left: 3px;
        width: 8px;
        height: 13px;
        border-top: 2px solid transparent;
        border-left: 2px solid transparent;
        border-right: 2px solid $input-background;
        border-bottom: 2px solid $input-background;
        transform: rotateZ(37deg);
        transform-origin: 100% 100%;
      }

      + span:not(.lever):after {
        top: 0;
        width: 25px;
        height: 25px;
        border: 2px solid $secondary-color;
        background-color: $secondary-color;
        z-index: 0;
      }
    }

    // Focused styles
    &.tabbed:focus + span:not(.lever):after {
      border-radius: 2px;
      border-color: $radio-empty-color;
      background-color: rgba(0,0,0,.1);
    }

    &.tabbed:checked:focus + span:not(.lever):after {
      border-radius: 2px;
      background-color: $secondary-color;
      border-color: $secondary-color;
    }

    // Disabled style
    &:disabled:not(:checked) + span:not(.lever):before {
      background-color: transparent;
      border: 2px solid transparent;
    }

    &:disabled:not(:checked) + span:not(.lever):after {
      border-color: transparent;
      background-color: $input-disabled-solid-color;
    }

    &:disabled:checked + span:not(.lever):before {
      background-color: transparent;
    }

    &:disabled:checked + span:not(.lever):after {
      background-color: $input-disabled-solid-color;
      border-color: $input-disabled-solid-color;
    }
  }
</style>