import Vue, { VNode } from "vue";

export default Vue.extend({
  name: "dynamic-marquee-element",
  props: {
    progress: Number,
    direction: {
      type: String,
      default: "column",
      validator(val) {
        return ["column", "row"].includes(val);
      },
    },
    reverse: {
      type: Boolean,
      default: false,
    },
    wrapperDirection: {
      type: String,
      default: "ltr",
      validator(val) {
        return ["ltr", "rtl", ""].includes(val);
      },
    },
  },

  computed: {
    axis(): string {
      switch (this.direction) {
        case "row":
          return "X";
        case "column":
        default:
          return "Y";
      }
    },

    widthOrHeight() {
      if (this.direction === "row") {
        return "height";
      }
      return "width";
    },

    initialPosition(): object {
      if (this.direction === "row") {
        if (
          (this.wrapperDirection === "ltr" && !this.reverse) ||
          (this.wrapperDirection === "rtl" && this.reverse)
        ) {
          return { right: "0%" };
        } else {
          return { left: "0%" };
        }
      } else {
        if (this.reverse) {
          return { top: "100%" };
        } else {
          return { bottom: "100%" };
        }
      }
    },
    transform(): object {
      return {
        transform: `translate${this.axis}(${this.progress}px)`,
      };
    },
  },
  render(h): VNode {
    return h(
      "div",
      {
        ref: "marqueeElement",
        style: {
          position: "absolute",
          [this.widthOrHeight]: "100%",
          ...this.initialPosition,
          ...this.transform,
        },
      },
      this.$slots.default
    );
  },
});
