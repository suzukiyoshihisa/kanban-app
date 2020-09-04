<template>
  <button
    :class="classes"
    :disabled="disabled"
    type="button"
    @click="handleClick"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "KbnButton",

  props: {
    type: {
      type: String,
      default: "button"
    },
    disabled: {}
  }
}
</script>

<style>
</style>template
